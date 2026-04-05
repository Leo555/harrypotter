import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useDocumentHead from '../hooks/useDocumentHead'
import { loadBook, bookTitles, bookTitlesEn, bookCovers, bookColors } from '../data/bookLoader'
import books from '../data/books'

export default function BookReader() {
  const { bookId, chapterId } = useParams()
  const navigate = useNavigate()
  const bookNum = parseInt(bookId) || 1
  const chapterNum = parseInt(chapterId) || 1

  const [bookData, setBookData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fontSize, setFontSize] = useState(16)
  const [showToc, setShowToc] = useState(false)
  const [lang, setLang] = useState(() => localStorage.getItem('hp-reader-lang') || 'en')
  const contentRef = useRef(null)
  const tocRef = useRef(null)

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'cn' : 'en'
      localStorage.setItem('hp-reader-lang', next)
      return next
    })
  }

  useDocumentHead({
    title: `📖 ${bookTitles[bookNum] || '原著阅读器'} — ${lang === 'cn' ? '中文版' : '英文原版'}`,
    description: `在线阅读哈利波特原著《${bookTitles[bookNum] || ''}》${lang === 'cn' ? '中文版' : '英文原版'}，沉浸式阅读体验。`,
    keywords: `哈利波特在线阅读,${bookTitles[bookNum] || ''},原著,${lang === 'cn' ? '中文版' : '英文原版'}`,
  })

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    loadBook(bookNum, lang)
      .then(data => {
        if (!cancelled) {
          setBookData(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [bookNum, lang])

  // 滚动到顶部
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
    window.scrollTo(0, 0)
  }, [chapterNum, bookNum])

  // 点击 TOC 外关闭
  useEffect(() => {
    const handleClick = (e) => {
      if (showToc && tocRef.current && !tocRef.current.contains(e.target)) {
        setShowToc(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showToc])

  const goToChapter = useCallback((num) => {
    navigate(`/reader/${bookNum}/${num}`)
    setShowToc(false)
  }, [bookNum, navigate])

  const chapter = bookData?.chapters?.[chapterNum - 1]
  const totalChapters = bookData?.chapters?.length || 0

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && chapterNum > 1) {
        goToChapter(chapterNum - 1)
      } else if (e.key === 'ArrowRight' && chapterNum < totalChapters) {
        goToChapter(chapterNum + 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [chapterNum, totalChapters, goToChapter])

  // 加载中
  if (loading) {
    return (
      <div className="container fade-in">
        <div style={{
          textAlign: 'center',
          padding: '80px 24px',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
            {bookCovers[bookNum] || '📖'}
          </div>
          <h2 style={{ color: 'var(--color-gold)', fontFamily: "'Cinzel', serif", marginBottom: '12px' }}>
            正在打开 {bookTitles[bookNum] || '书籍'}...
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            {lang === 'cn' ? '翻开羊皮纸，中文译本正在浮现' : '翻开羊皮纸，魔法文字正在浮现'}
          </p>
        </div>
      </div>
    )
  }

  // 错误
  if (error || !bookData) {
    return (
      <div className="container fade-in">
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>😔</div>
          <h2 style={{ color: 'var(--color-text)' }}>无法加载书籍</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>{error || '未知错误'}</p>
          <Link to="/reader" className="btn btn-primary" style={{ marginTop: '20px', textDecoration: 'none' }}>
            返回书架
          </Link>
        </div>
      </div>
    )
  }

  // 书架选择页面（无章节时）
  if (!chapterId) {
    return (
      <div className="container fade-in">
        <h1 className="page-title">{bookCovers[bookNum]} {bookData.titleCn || bookData.title}</h1>
        <p className="page-subtitle">
          选择章节开始阅读（{lang === 'cn' ? '中文译本' : '英文原版'}）
          <button
            onClick={toggleLang}
            style={{
              marginLeft: '12px',
              padding: '4px 14px',
              borderRadius: '14px',
              border: '1px solid rgba(212, 168, 67, 0.3)',
              background: 'rgba(212, 168, 67, 0.1)',
              color: 'var(--color-gold)',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
              transition: 'all 0.3s',
            }}
          >
            {lang === 'cn' ? '🇬🇧 切换英文' : '🇨🇳 切换中文'}
          </button>
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '12px',
          marginTop: '32px',
        }}>
          {bookData.chapters.map((ch) => (
            <button
              key={ch.number}
              onClick={() => goToChapter(ch.number)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '16px 18px',
                background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.5), rgba(20, 20, 50, 0.7))',
                borderRadius: '10px',
                border: '1px solid rgba(212, 168, 67, 0.12)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'border-color 0.3s, transform 0.2s',
                color: 'var(--color-text)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(212, 168, 67, 0.4)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(212, 168, 67, 0.12)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: `${bookData.color}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--color-gold)',
                flexShrink: 0,
              }}>
                {ch.number}
              </span>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>{ch.titleCn}</div>
                {lang === 'en' && ch.title !== ch.titleCn && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {ch.title}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/reader" className="btn btn-outline" style={{ textDecoration: 'none' }}>
            ← 返回书架
          </Link>
          <Link
            to={`/books/${books.find(b => b.number === bookNum)?.id || ''}`}
            className="btn btn-outline"
            style={{ textDecoration: 'none' }}
          >
            📚 查看本书百科
          </Link>
        </div>
      </div>
    )
  }

  // 阅读界面
  if (!chapter) {
    return (
      <div className="container fade-in">
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>章节不存在</p>
          <button className="btn btn-primary" onClick={() => goToChapter(1)}>回到第一章</button>
        </div>
      </div>
    )
  }

  // 将文本按段落分割
  const paragraphs = chapter.content
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0)

  return (
    <div className="fade-in" style={{ maxWidth: '100%' }}>
      {/* 顶部工具栏 */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10, 10, 25, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(212, 168, 67, 0.1)',
        padding: '10px 20px',
      }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          {/* 左：书名和目录按钮 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
            <Link to="/reader" style={{
              color: 'var(--color-gold)',
              textDecoration: 'none',
              fontSize: '1.2rem',
              flexShrink: 0,
            }}>
              {bookCovers[bookNum]}
            </Link>
            <div style={{ position: 'relative' }} ref={tocRef}>
              <button
                onClick={() => setShowToc(!showToc)}
                style={{
                  background: 'rgba(212, 168, 67, 0.1)',
                  border: '1px solid rgba(212, 168, 67, 0.2)',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '220px',
                }}
              >
                📑 {chapter.titleCn}
              </button>

              {/* 章节目录下拉 */}
              {showToc && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '6px',
                  width: '300px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                  background: 'rgba(15, 15, 35, 0.98)',
                  borderRadius: '12px',
                  border: '1px solid rgba(212, 168, 67, 0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  padding: '8px',
                  zIndex: 200,
                }}>
                  <div style={{
                    padding: '8px 12px',
                    fontSize: '0.78rem',
                    color: 'var(--color-gold)',
                    fontWeight: 600,
                    borderBottom: '1px solid rgba(212, 168, 67, 0.1)',
                    marginBottom: '4px',
                  }}>
                    {bookData.title} · 目录
                  </div>
                  {bookData.chapters.map(ch => (
                    <button
                      key={ch.number}
                      onClick={() => goToChapter(ch.number)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 12px',
                        background: ch.number === chapterNum ? 'rgba(212, 168, 67, 0.15)' : 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: ch.number === chapterNum ? 'var(--color-gold)' : 'var(--color-text)',
                        fontSize: '0.82rem',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => { if (ch.number !== chapterNum) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                      onMouseLeave={e => { if (ch.number !== chapterNum) e.currentTarget.style.background = 'transparent' }}
                    >
                      <span style={{ color: 'var(--color-gold)', marginRight: '8px', fontSize: '0.75rem' }}>
                        {ch.number}
                      </span>
                      {ch.titleCn}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 中：章节进度 */}
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-secondary)',
            flexShrink: 0,
          }}>
            {chapterNum} / {totalChapters}
          </div>

          {/* 语言切换 */}
          <button
            onClick={toggleLang}
            style={{
              padding: '5px 12px',
              borderRadius: '14px',
              border: '1px solid rgba(212, 168, 67, 0.25)',
              background: 'rgba(212, 168, 67, 0.08)',
              color: 'var(--color-gold)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 600,
              flexShrink: 0,
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
            }}
            title={lang === 'cn' ? '切换到英文原版' : '切换到中文译本'}
          >
            {lang === 'cn' ? '🇨🇳 中文' : '🇬🇧 EN'}
          </button>

          {/* 右：字号控制 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <button
              onClick={() => setFontSize(f => Math.max(12, f - 1))}
              style={{
                width: '28px', height: '28px',
                border: '1px solid rgba(212, 168, 67, 0.2)',
                borderRadius: '6px',
                background: 'rgba(212, 168, 67, 0.08)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              title="缩小字体"
            >A-</button>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', minWidth: '30px', textAlign: 'center' }}>
              {fontSize}
            </span>
            <button
              onClick={() => setFontSize(f => Math.min(24, f + 1))}
              style={{
                width: '28px', height: '28px',
                border: '1px solid rgba(212, 168, 67, 0.2)',
                borderRadius: '6px',
                background: 'rgba(212, 168, 67, 0.08)',
                color: 'var(--color-text)',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              title="增大字体"
            >A+</button>
          </div>
        </div>
      </div>

      {/* 正文内容 */}
      <div ref={contentRef} style={{
        maxWidth: '750px',
        margin: '0 auto',
        padding: '40px 24px 60px',
      }}>
        {/* 章节标题 */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            fontSize: '0.78rem',
            color: 'var(--color-gold)',
            letterSpacing: '3px',
            marginBottom: '8px',
            textTransform: lang === 'en' ? 'uppercase' : 'none',
          }}>
            {lang === 'cn' ? `第 ${chapterNum} 章` : `Chapter ${chapterNum}`}
          </div>
          <h1 style={{
            fontFamily: lang === 'cn' ? "'Noto Serif SC', 'SimSun', serif" : "'Cinzel', serif",
            fontSize: '1.6rem',
            color: 'var(--color-text)',
            marginBottom: '6px',
          }}>
            {chapter.titleCn}
          </h1>
          {lang === 'en' && chapter.title !== `Chapter ${chapterNum}` && chapter.title !== chapter.titleCn && (
            <div style={{
              fontSize: '0.9rem',
              color: 'var(--color-text-secondary)',
              fontStyle: 'italic',
            }}>
              {chapter.title}
            </div>
          )}
          <div style={{
            width: '60px',
            height: '2px',
            background: 'var(--color-gold)',
            margin: '20px auto 0',
            opacity: 0.4,
          }} />
        </div>

        {/* 段落 */}
        <div style={{
          fontSize: `${fontSize}px`,
          lineHeight: lang === 'cn' ? 2.1 : 1.95,
          color: 'rgba(220, 220, 230, 0.9)',
          fontFamily: lang === 'cn'
            ? "'Noto Serif SC', 'Source Han Serif SC', 'SimSun', 'STSong', serif"
            : "'Georgia', 'Times New Roman', serif",
        }}>
          {paragraphs.map((p, i) => (
            <p key={i} style={{
              marginBottom: '1.2em',
              textIndent: '2em',
              textAlign: 'justify',
            }}>
              {p}
            </p>
          ))}
        </div>

        {/* 底部导航 */}
        <div style={{
          marginTop: '60px',
          padding: '24px 0',
          borderTop: '1px solid rgba(212, 168, 67, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
        }}>
          {chapterNum > 1 ? (
            <button
              onClick={() => goToChapter(chapterNum - 1)}
              className="btn btn-outline"
              style={{ fontSize: '0.85rem' }}
            >
              ← {bookData.chapters[chapterNum - 2]?.titleCn || '上一章'}
            </button>
          ) : (
            <div />
          )}
          {chapterNum < totalChapters ? (
            <button
              onClick={() => goToChapter(chapterNum + 1)}
              className="btn btn-primary"
              style={{ fontSize: '0.85rem' }}
            >
              {bookData.chapters[chapterNum]?.titleCn || '下一章'} →
            </button>
          ) : (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--color-gold)', marginBottom: '8px' }}>
                ✨ 恭喜你读完了《{bookData.titleCn || bookData.title}》！
              </div>
              {bookNum < 7 ? (
                <Link
                  to={`/reader/${bookNum + 1}`}
                  className="btn btn-primary"
                  style={{ textDecoration: 'none', fontSize: '0.85rem' }}
                >
                  开始阅读《{bookTitles[bookNum + 1]}》 →
                </Link>
              ) : (
                <Link to="/reader" className="btn btn-outline" style={{ textDecoration: 'none', fontSize: '0.85rem' }}>
                  返回书架
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
