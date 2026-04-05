import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import books from '../data/books'
import { characters } from '../data/characters'
import movies from '../data/movies'
import useDocumentHead from '../hooks/useDocumentHead'
import { loadBook, bookTitles, bookCovers, bookColors } from '../data/bookLoader'

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const book = books.find(b => b.id === id)

  // 阅读器状态
  const [readerOpen, setReaderOpen] = useState(false)
  const [readerChapter, setReaderChapter] = useState(null) // null=章节选择, number=阅读中
  const [bookData, setBookData] = useState(null)
  const [readerLoading, setReaderLoading] = useState(false)
  const [readerError, setReaderError] = useState(null)
  const [fontSize, setFontSize] = useState(16)
  const [lang, setLang] = useState(() => localStorage.getItem('hp-reader-lang') || 'en')
  const [showToc, setShowToc] = useState(false)
  const readerRef = useRef(null)
  const tocRef = useRef(null)

  useDocumentHead({
    title: book ? (readerOpen && readerChapter ? `📖 阅读 ${book.title} 第${readerChapter}章` : `${book.title}`) : '未找到书籍',
    description: book ? `${book.title}（${book.titleEn}）— ${book.summary.slice(0, 120)}` : '',
    keywords: book ? `${book.title},${book.titleEn},哈利波特第${book.number}部,在线阅读` : '',
  })

  // 加载书籍文本
  useEffect(() => {
    if (!readerOpen || !book) return
    let cancelled = false
    setReaderLoading(true)
    setReaderError(null)
    loadBook(book.number, lang)
      .then(data => {
        if (!cancelled) {
          setBookData(data)
          setReaderLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setReaderError(err.message)
          setReaderLoading(false)
        }
      })
    return () => { cancelled = true }
  }, [readerOpen, book?.number, lang])

  // 滚动到阅读器
  useEffect(() => {
    if (readerOpen && readerRef.current) {
      readerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [readerOpen, readerChapter])

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

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'cn' : 'en'
      localStorage.setItem('hp-reader-lang', next)
      return next
    })
  }

  const goToChapter = useCallback((num) => {
    setReaderChapter(num)
    setShowToc(false)
  }, [])

  // 键盘导航
  useEffect(() => {
    if (!readerOpen || !readerChapter || !bookData) return
    const totalChapters = bookData.chapters.length
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && readerChapter > 1) {
        goToChapter(readerChapter - 1)
      } else if (e.key === 'ArrowRight' && readerChapter < totalChapters) {
        goToChapter(readerChapter + 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [readerOpen, readerChapter, bookData, goToChapter])

  const openReader = (chapterNum = null) => {
    setReaderOpen(true)
    setReaderChapter(chapterNum)
  }

  const closeReader = () => {
    setReaderOpen(false)
    setReaderChapter(null)
    setShowToc(false)
  }

  if (!book) {
    return (
      <div className="container fade-in" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2 style={{ color: 'var(--color-gold)' }}>📖 未找到该书籍</h2>
        <button className="back-btn" style={{ marginTop: 24 }} onClick={() => navigate('/books')}>
          ← 返回原著百科
        </button>
      </div>
    )
  }

  const prevBook = books.find(b => b.number === book.number - 1)
  const nextBook = books.find(b => b.number === book.number + 1)

  // 获取关键人物数据
  const keyChars = (book.keyCharacters || [])
    .map(cid => characters.find(c => c.id === cid))
    .filter(Boolean)

  // 阅读器中的当前章节
  const chapter = bookData?.chapters?.[readerChapter - 1]
  const totalChapters = bookData?.chapters?.length || 0

  // 渲染内嵌阅读器
  const renderReader = () => {
    if (!readerOpen) return null

    // 加载中
    if (readerLoading) {
      return (
        <div ref={readerRef} style={{
          textAlign: 'center',
          padding: '60px 24px',
          background: 'rgba(10, 10, 25, 0.6)',
          borderRadius: '16px',
          border: '1px solid rgba(212,175,55,0.15)',
          margin: '0 0 24px',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
            {bookCovers[book.number] || '📖'}
          </div>
          <h3 style={{ color: 'var(--color-gold)', fontFamily: "'Cinzel', serif", marginBottom: '10px' }}>
            正在打开 {bookTitles[book.number]}...
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
            {lang === 'cn' ? '翻开羊皮纸，中文译本正在浮现' : '翻开羊皮纸，魔法文字正在浮现'}
          </p>
        </div>
      )
    }

    // 错误
    if (readerError || !bookData) {
      return (
        <div ref={readerRef} style={{
          textAlign: 'center',
          padding: '40px 24px',
          background: 'rgba(10, 10, 25, 0.6)',
          borderRadius: '16px',
          border: '1px solid rgba(212,175,55,0.15)',
          margin: '0 0 24px',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '12px' }}>😔</div>
          <p style={{ color: 'var(--color-text-secondary)' }}>{readerError || '无法加载'}</p>
          <button className="btn btn-outline" onClick={closeReader} style={{ marginTop: '12px' }}>关闭阅读器</button>
        </div>
      )
    }

    // 章节选择模式
    if (!readerChapter) {
      return (
        <div ref={readerRef} style={{
          background: 'rgba(10, 10, 25, 0.6)',
          borderRadius: '16px',
          border: '1px solid rgba(212,175,55,0.15)',
          padding: '28px 24px',
          margin: '0 0 24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ color: 'var(--color-gold)', fontSize: '1.1rem', margin: 0 }}>
              📖 选择章节开始阅读
            </h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={toggleLang}
                style={{
                  padding: '5px 14px',
                  borderRadius: '14px',
                  border: '1px solid rgba(212, 168, 67, 0.3)',
                  background: 'rgba(212, 168, 67, 0.1)',
                  color: 'var(--color-gold)',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                }}
              >
                {lang === 'cn' ? '🇬🇧 切换英文' : '🇨🇳 切换中文'}
              </button>
              <button
                onClick={closeReader}
                style={{
                  padding: '5px 14px',
                  borderRadius: '14px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                }}
              >
                ✕ 关闭
              </button>
            </div>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '10px',
          }}>
            {bookData.chapters.map((ch) => (
              <button
                key={ch.number}
                onClick={() => goToChapter(ch.number)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.5), rgba(20, 20, 50, 0.7))',
                  borderRadius: '10px',
                  border: '1px solid rgba(212, 168, 67, 0.12)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'border-color 0.3s, transform 0.2s',
                  color: 'var(--color-text)',
                }}
                className="hover-border-gold"
              >
                <span style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: `${book.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--color-gold)',
                  flexShrink: 0,
                }}>
                  {ch.number}
                </span>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{ch.titleCn}</div>
                  {lang === 'en' && ch.title !== ch.titleCn && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                      {ch.title}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    }

    // 阅读界面
    if (!chapter) {
      return (
        <div ref={readerRef} style={{ textAlign: 'center', padding: '40px 24px' }}>
          <p style={{ color: 'var(--color-text-secondary)' }}>章节不存在</p>
          <button className="btn btn-primary" onClick={() => goToChapter(1)}>回到第一章</button>
        </div>
      )
    }

    const paragraphs = chapter.content.split(/\n+/).map(p => p.trim()).filter(p => p.length > 0)

    return (
      <div ref={readerRef} style={{
        background: 'rgba(10, 10, 25, 0.7)',
        borderRadius: '16px',
        border: '1px solid rgba(212,175,55,0.15)',
        overflow: 'hidden',
        margin: '0 0 24px',
      }}>
        {/* 阅读器工具栏 */}
        <div style={{
          position: 'sticky',
          top: '60px',
          zIndex: 100,
          background: 'rgba(10, 10, 25, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(212, 168, 67, 0.1)',
          padding: '10px 20px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            flexWrap: 'wrap',
          }}>
            {/* 左：目录按钮 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <button
                onClick={() => { setReaderChapter(null) }}
                style={{
                  background: 'rgba(212, 168, 67, 0.1)',
                  border: '1px solid rgba(212, 168, 67, 0.2)',
                  borderRadius: '8px',
                  padding: '5px 10px',
                  color: 'var(--color-gold)',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  flexShrink: 0,
                }}
              >
                📑 目录
              </button>
              <div style={{ position: 'relative' }} ref={tocRef}>
                <button
                  onClick={() => setShowToc(!showToc)}
                  style={{
                    background: 'rgba(212, 168, 67, 0.08)',
                    border: '1px solid rgba(212, 168, 67, 0.15)',
                    borderRadius: '8px',
                    padding: '5px 12px',
                    color: 'var(--color-text)',
                    cursor: 'pointer',
                    fontSize: '0.78rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '200px',
                  }}
                >
                  {chapter.titleCn}
                </button>
                {showToc && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '6px',
                    width: '280px',
                    maxHeight: '360px',
                    overflowY: 'auto',
                    background: 'rgba(15, 15, 35, 0.98)',
                    borderRadius: '12px',
                    border: '1px solid rgba(212, 168, 67, 0.2)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                    padding: '8px',
                    zIndex: 200,
                  }}>
                    {bookData.chapters.map(ch => (
                      <button
                        key={ch.number}
                        onClick={() => goToChapter(ch.number)}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '7px 10px',
                          background: ch.number === readerChapter ? 'rgba(212, 168, 67, 0.15)' : 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          color: ch.number === readerChapter ? 'var(--color-gold)' : 'var(--color-text)',
                          fontSize: '0.78rem',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => { if (ch.number !== readerChapter) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                        onMouseLeave={e => { if (ch.number !== readerChapter) e.currentTarget.style.background = 'transparent' }}
                      >
                        <span style={{ color: 'var(--color-gold)', marginRight: '8px', fontSize: '0.72rem' }}>
                          {ch.number}
                        </span>
                        {ch.titleCn}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 中：进度 */}
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', flexShrink: 0 }}>
              {readerChapter} / {totalChapters}
            </div>

            {/* 语言 */}
            <button
              onClick={toggleLang}
              style={{
                padding: '4px 10px',
                borderRadius: '14px',
                border: '1px solid rgba(212, 168, 67, 0.25)',
                background: 'rgba(212, 168, 67, 0.08)',
                color: 'var(--color-gold)',
                cursor: 'pointer',
                fontSize: '0.72rem',
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              {lang === 'cn' ? '🇨🇳 中文' : '🇬🇧 EN'}
            </button>

            {/* 字号 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
              <button
                onClick={() => setFontSize(f => Math.max(12, f - 1))}
                style={{
                  width: '26px', height: '26px',
                  border: '1px solid rgba(212, 168, 67, 0.2)',
                  borderRadius: '6px',
                  background: 'rgba(212, 168, 67, 0.08)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >A-</button>
              <span style={{ fontSize: '0.68rem', color: 'var(--color-text-secondary)', minWidth: '24px', textAlign: 'center' }}>
                {fontSize}
              </span>
              <button
                onClick={() => setFontSize(f => Math.min(24, f + 1))}
                style={{
                  width: '26px', height: '26px',
                  border: '1px solid rgba(212, 168, 67, 0.2)',
                  borderRadius: '6px',
                  background: 'rgba(212, 168, 67, 0.08)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >A+</button>
            </div>

            {/* 关闭 */}
            <button
              onClick={closeReader}
              style={{
                padding: '4px 10px',
                borderRadius: '14px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontSize: '0.72rem',
                flexShrink: 0,
              }}
            >
              ✕ 关闭
            </button>
          </div>
        </div>

        {/* 正文 */}
        <div style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '36px 24px 48px',
        }}>
          {/* 章节标题 */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--color-gold)',
              letterSpacing: '3px',
              marginBottom: '8px',
              textTransform: lang === 'en' ? 'uppercase' : 'none',
            }}>
              {lang === 'cn' ? `第 ${readerChapter} 章` : `Chapter ${readerChapter}`}
            </div>
            <h2 style={{
              fontFamily: lang === 'cn' ? "'Noto Serif SC', 'SimSun', serif" : "'Cinzel', serif",
              fontSize: '1.5rem',
              color: 'var(--color-text)',
              marginBottom: '6px',
            }}>
              {chapter.titleCn}
            </h2>
            {lang === 'en' && chapter.title !== `Chapter ${readerChapter}` && chapter.title !== chapter.titleCn && (
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                {chapter.title}
              </div>
            )}
            <div style={{
              width: '60px', height: '2px',
              background: 'var(--color-gold)',
              margin: '18px auto 0',
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
            marginTop: '48px',
            padding: '20px 0',
            borderTop: '1px solid rgba(212, 168, 67, 0.15)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            {readerChapter > 1 ? (
              <button
                onClick={() => goToChapter(readerChapter - 1)}
                className="btn btn-outline"
                style={{ fontSize: '0.82rem' }}
              >
                ← {bookData.chapters[readerChapter - 2]?.titleCn || '上一章'}
              </button>
            ) : (
              <div />
            )}
            {readerChapter < totalChapters ? (
              <button
                onClick={() => goToChapter(readerChapter + 1)}
                className="btn btn-primary"
                style={{ fontSize: '0.82rem' }}
              >
                {bookData.chapters[readerChapter]?.titleCn || '下一章'} →
              </button>
            ) : (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-gold)', marginBottom: '8px' }}>
                  ✨ 恭喜你读完了《{bookData.titleCn || bookData.title}》！
                </div>
                {book.number < 7 ? (
                  <Link
                    to={`/books/${books.find(b => b.number === book.number + 1)?.id}`}
                    className="btn btn-primary"
                    style={{ textDecoration: 'none', fontSize: '0.82rem' }}
                    onClick={() => { closeReader() }}
                  >
                    开始阅读下一部 →
                  </Link>
                ) : (
                  <button className="btn btn-outline" onClick={closeReader} style={{ fontSize: '0.82rem' }}>
                    返回百科
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container fade-in">
      <button className="back-btn" onClick={() => navigate('/books')}>← 返回原著百科</button>

      <div className="book-detail">
        {/* 头部 */}
        <div className="book-detail-header" style={{ borderColor: book.color }}>
          <div className="book-detail-cover" style={{ background: book.coverImage ? 'transparent' : `linear-gradient(135deg, ${book.color}, ${book.color}88)` }}>
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.title} className="book-detail-cover-img" />
            ) : (
              <span style={{ fontSize: '4rem' }}>{book.cover}</span>
            )}
          </div>
          <div className="book-detail-info">
            <div className="book-detail-number" style={{ color: book.color }}>第{book.number}部</div>
            <h1 className="book-detail-title">{book.title}</h1>
            <div className="book-detail-title-en">{book.titleEn}</div>
            <div className="book-detail-meta">
              <span className="meta-tag">📅 {book.year}年出版</span>
              <span className="meta-tag">📄 {book.pages}页</span>
              <span className="meta-tag">📑 {book.chapters.length}章</span>
            </div>
            {book.hogwartsYear && (
              <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'rgba(212,175,55,0.8)', fontStyle: 'italic' }}>
                🏰 {book.hogwartsYear}
              </div>
            )}
            <button
              onClick={() => openReader()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '14px',
                padding: '8px 20px',
                borderRadius: '20px',
                background: readerOpen ? book.color : `${book.color}22`,
                color: readerOpen ? '#fff' : book.color,
                border: `1px solid ${book.color}44`,
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              className="hover-border-gold"
            >
              📖 {readerOpen ? '阅读中...' : '开始阅读原著'}
            </button>
          </div>
        </div>

        {/* 内嵌阅读器 — 位于头部下方 */}
        {renderReader()}

        {/* 出版信息 */}
        <div className="detail-section">
          <h2 className="detail-section-title">📋 出版信息</h2>
          <div className="info-grid">
            <div className="info-item"><span className="info-label">出版年份</span><span className="info-value">{book.year}年</span></div>
            <div className="info-item"><span className="info-label">页数</span><span className="info-value">{book.pages}页</span></div>
            <div className="info-item"><span className="info-label">章节数</span><span className="info-value">{book.chapters.length}章</span></div>
            {book.wordCount && <div className="info-item"><span className="info-label">字数</span><span className="info-value">{book.wordCount}</span></div>}
            {book.translator && <div className="info-item"><span className="info-label">中文译者</span><span className="info-value">{book.translator}</span></div>}
            {book.hogwartsYear && <div className="info-item"><span className="info-label">对应学年</span><span className="info-value">{book.hogwartsYear}</span></div>}
          </div>
          {book.dedicatedTo && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: 'rgba(212,175,55,0.05)',
              borderRadius: '8px',
              borderLeft: `3px solid ${book.color}`,
              fontSize: '0.85rem',
              fontStyle: 'italic',
              color: 'rgba(212,175,55,0.7)',
            }}>
              📜 {book.dedicatedTo}
            </div>
          )}
        </div>

        {/* 主题与教训 */}
        {book.themes && (
          <div className="detail-section">
            <h2 className="detail-section-title">🎯 核心主题</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {book.themes.map((theme, i) => (
                <span key={i} style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  background: `${book.color}15`,
                  color: book.color,
                  fontSize: '0.85rem',
                  border: `1px solid ${book.color}40`,
                  fontWeight: '600',
                }}>
                  {theme}
                </span>
              ))}
            </div>
            {book.lesson && (
              <blockquote className="book-quote" style={{ borderColor: book.color }}>
                <p>💡 {book.lesson}</p>
              </blockquote>
            )}
          </div>
        )}

        {/* 故事梗概 */}
        <div className="detail-section">
          <h2 className="detail-section-title">📖 故事梗概</h2>
          <p className="detail-description">{book.detailedSummary || book.summary}</p>
          {book.setting && (
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: 'rgba(212,175,55,0.05)',
              borderRadius: '8px',
              fontSize: '0.85rem',
            }}>
              🗺️ <strong>故事背景：</strong>{book.setting}
            </div>
          )}
        </div>

        {/* 对应电影改编 */}
        {(() => {
          const relatedMovies = movies.filter(m => m.relatedBook === book.id)
          return relatedMovies.length > 0 ? (
            <div className="detail-section">
              <h2 className="detail-section-title">🎬 电影改编</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {relatedMovies.map(m => (
                  <Link
                    key={m.id}
                    to={`/movies/${m.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      background: 'rgba(212,175,55,0.05)',
                      border: '1px solid rgba(212,175,55,0.15)',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    className="hover-slide-right"
                  >
                    <span style={{ fontSize: '2rem' }}>🎬</span>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-parchment)' }}>
                        {m.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                        {m.year}年 · {m.director} · {m.duration} · 票房{m.boxOffice}
                      </div>
                    </div>
                    <span style={{ marginLeft: 'auto', color: 'var(--color-gold)', fontSize: '0.85rem' }}>查看详情 →</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null
        })()}

        {/* 关键人物 */}
        {keyChars.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">👥 关键人物</h2>
            <div className="grid-auto-140">
              {keyChars.map(char => (
                <Link
                  to={`/characters/${char.id}`}
                  key={char.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px 8px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(212,175,55,0.1)',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  className="hover-lift-subtle"
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    marginBottom: '8px',
                    overflow: 'hidden',
                    border: '2px solid rgba(212,168,67,0.3)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(212,175,55,0.08)',
                    fontSize: '2rem',
                  }}>
                    {char.image ? (
                      <img src={char.image} alt={char.name} className="char-avatar-circle" />
                    ) : char.avatar}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)', fontWeight: '600', textAlign: 'center' }}>
                    {char.name}
                  </span>
                  <span style={{ fontSize: '0.7rem', opacity: 0.5, textAlign: 'center' }}>
                    {char.nameEn}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 章节目录 */}
        <div className="detail-section">
          <h2 className="detail-section-title">📑 章节目录</h2>
          <div className="chapters-grid">
            {book.chapters.map((chapterName, i) => (
              <button
                key={i}
                onClick={() => openReader(i + 1)}
                className="chapter-item chapter-item-link"
                style={{ cursor: 'pointer', background: 'none', color: 'inherit', textAlign: 'left', width: '100%' }}
              >
                <span className="chapter-number">第{i + 1}章</span>
                <span className="chapter-name">{chapterName}</span>
                <span className="chapter-read-icon">📖</span>
              </button>
            ))}
          </div>
        </div>

        {/* 经典名句 */}
        <div className="detail-section">
          <h2 className="detail-section-title">💬 经典名句</h2>
          <div className="quotes-list">
            {book.quotes.map((quote, i) => (
              <blockquote key={i} className="book-quote">
                <p>"{quote.text}"</p>
                <footer>— {quote.speaker}</footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* 关键事件 */}
        <div className="detail-section">
          <h2 className="detail-section-title">⚡ 关键事件</h2>
          <div className="events-list">
            {book.keyEvents.map((event, i) => (
              <div key={i} className={`event-item event-${event.importance}`}>
                <span className="event-dot" />
                <span>{event.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 重要魔法物品 */}
        <div className="detail-section">
          <h2 className="detail-section-title">⚗️ 重要魔法物品</h2>
          <div className="items-tags">
            {book.magicItems.map((item, i) => (
              <span key={i} className="magic-item-tag">{item}</span>
            ))}
          </div>
        </div>

        {/* 幕后花絮 */}
        {book.behindTheScenes && book.behindTheScenes.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">🎬 幕后花絮</h2>
            <div className="trivia-list">
              {book.behindTheScenes.map((trivia, i) => (
                <div key={i} className="trivia-item">
                  <span className="trivia-bullet">✦</span>
                  <span>{trivia}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 上下本导航 */}
        <div className="book-nav">
          {prevBook ? (
            <Link to={`/books/${prevBook.id}`} className="book-nav-btn book-nav-prev">
              <span className="book-nav-label">← 上一部</span>
              <span className="book-nav-title">{prevBook.title}</span>
            </Link>
          ) : <div />}
          {nextBook ? (
            <Link to={`/books/${nextBook.id}`} className="book-nav-btn book-nav-next">
              <span className="book-nav-label">下一部 →</span>
              <span className="book-nav-title">{nextBook.title}</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}
