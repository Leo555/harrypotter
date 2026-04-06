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
  const [readerChapter, setReaderChapter] = useState(null)
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

  useEffect(() => {
    if (!readerOpen || !book) return
    let cancelled = false
    setReaderLoading(true)
    setReaderError(null)
    loadBook(book.number, lang)
      .then(data => {
        if (!cancelled) { setBookData(data); setReaderLoading(false) }
      })
      .catch(err => {
        if (!cancelled) { setReaderError(err.message); setReaderLoading(false) }
      })
    return () => { cancelled = true }
  }, [readerOpen, book?.number, lang])

  useEffect(() => {
    if (readerOpen && readerRef.current) {
      readerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [readerOpen, readerChapter])

  useEffect(() => {
    const handleClick = (e) => {
      if (showToc && tocRef.current && !tocRef.current.contains(e.target)) setShowToc(false)
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

  useEffect(() => {
    if (!readerOpen || !readerChapter || !bookData) return
    const totalChapters = bookData.chapters.length
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' && readerChapter > 1) goToChapter(readerChapter - 1)
      else if (e.key === 'ArrowRight' && readerChapter < totalChapters) goToChapter(readerChapter + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [readerOpen, readerChapter, bookData, goToChapter])

  const openReader = (chapterNum = null) => { setReaderOpen(true); setReaderChapter(chapterNum) }
  const closeReader = () => { setReaderOpen(false); setReaderChapter(null); setShowToc(false) }

  if (!book) {
    return (
      <div className="container fade-in not-found-wrapper" style={{ padding: '80px 24px' }}>
        <h2 style={{ color: 'var(--color-gold)' }}>📖 未找到该书籍</h2>
        <button className="back-btn" style={{ marginTop: 24 }} onClick={() => navigate('/books')}>
          ← 返回原著百科
        </button>
      </div>
    )
  }

  const prevBook = books.find(b => b.number === book.number - 1)
  const nextBook = books.find(b => b.number === book.number + 1)
  const keyChars = (book.keyCharacters || []).map(cid => characters.find(c => c.id === cid)).filter(Boolean)
  const chapter = bookData?.chapters?.[readerChapter - 1]
  const totalChapters = bookData?.chapters?.length || 0

  // 渲染内嵌阅读器
  const renderReader = () => {
    if (!readerOpen) return null

    if (readerLoading) {
      return (
        <div ref={readerRef} className="embed-reader-panel embed-reader-loading">
          <div className="embed-reader-loading-icon">{bookCovers[book.number] || '📖'}</div>
          <h3 className="embed-reader-loading-title">正在打开 {bookTitles[book.number]}...</h3>
          <p className="embed-reader-loading-desc">
            {lang === 'cn' ? '翻开羊皮纸，中文译本正在浮现' : '翻开羊皮纸，魔法文字正在浮现'}
          </p>
        </div>
      )
    }

    if (readerError || !bookData) {
      return (
        <div ref={readerRef} className="embed-reader-panel embed-reader-error">
          <div className="embed-reader-error-icon">😔</div>
          <p className="embed-reader-error-msg">{readerError || '无法加载'}</p>
          <button className="btn btn-outline" onClick={closeReader} style={{ marginTop: '12px' }}>关闭阅读器</button>
        </div>
      )
    }

    if (!readerChapter) {
      return (
        <div ref={readerRef} className="embed-reader-panel embed-reader-chapters">
          <div className="embed-reader-chapters-header">
            <h3 className="embed-reader-chapters-title">📖 选择章节开始阅读</h3>
            <div className="embed-reader-header-actions">
              <button onClick={toggleLang} className="embed-reader-btn-lang">
                {lang === 'cn' ? '🇬🇧 切换英文' : '🇨🇳 切换中文'}
              </button>
              <button onClick={closeReader} className="embed-reader-btn-close">✕ 关闭</button>
            </div>
          </div>
          <div className="embed-reader-chapter-grid">
            {bookData.chapters.map((ch) => (
              <button
                key={ch.number}
                onClick={() => goToChapter(ch.number)}
                className="embed-reader-chapter-btn hover-border-gold"
              >
                <span className="embed-reader-chapter-num" style={{ background: `${book.color}44` }}>
                  {ch.number}
                </span>
                <div>
                  <div className="embed-reader-chapter-title">{ch.titleCn}</div>
                  {lang === 'en' && ch.title !== ch.titleCn && (
                    <div className="embed-reader-chapter-title-en">{ch.title}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (!chapter) {
      return (
        <div ref={readerRef} className="embed-reader-missing">
          <p className="embed-reader-error-msg">章节不存在</p>
          <button className="btn btn-primary" onClick={() => goToChapter(1)}>回到第一章</button>
        </div>
      )
    }

    const paragraphs = chapter.content.split(/\n+/).map(p => p.trim()).filter(p => p.length > 0)

    return (
      <div ref={readerRef} className="embed-reader-panel embed-reader-reading">
        {/* 工具栏 */}
        <div className="embed-reader-toolbar">
          <div className="embed-reader-toolbar-inner">
            <div className="embed-reader-toolbar-left">
              <button onClick={() => setReaderChapter(null)} className="embed-reader-btn-toc">📑 目录</button>
              <div style={{ position: 'relative' }} ref={tocRef}>
                <button onClick={() => setShowToc(!showToc)} className="embed-reader-toc-trigger">
                  {chapter.titleCn}
                </button>
                {showToc && (
                  <div className="embed-reader-toc-dropdown">
                    {bookData.chapters.map(ch => (
                      <button
                        key={ch.number}
                        onClick={() => goToChapter(ch.number)}
                        className={`embed-reader-toc-item ${ch.number === readerChapter ? 'embed-reader-toc-item-active' : 'embed-reader-toc-item-inactive'}`}
                      >
                        <span className="embed-reader-toc-num">{ch.number}</span>
                        {ch.titleCn}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="embed-reader-progress">{readerChapter} / {totalChapters}</div>

            <button onClick={toggleLang} className="embed-reader-toolbar-lang">
              {lang === 'cn' ? '🇨🇳 中文' : '🇬🇧 EN'}
            </button>

            <div className="embed-reader-font-controls">
              <button onClick={() => setFontSize(f => Math.max(12, f - 1))} className="embed-reader-font-btn">A-</button>
              <span className="embed-reader-font-size">{fontSize}</span>
              <button onClick={() => setFontSize(f => Math.min(24, f + 1))} className="embed-reader-font-btn">A+</button>
            </div>

            <button onClick={closeReader} className="embed-reader-toolbar-close">✕ 关闭</button>
          </div>
        </div>

        {/* 正文 */}
        <div className="embed-reader-body">
          <div className="embed-reader-chapter-heading">
            <div className="embed-reader-chapter-label" style={{ textTransform: lang === 'en' ? 'uppercase' : 'none' }}>
              {lang === 'cn' ? `第 ${readerChapter} 章` : `Chapter ${readerChapter}`}
            </div>
            <h2 className={`embed-reader-chapter-h2 ${lang === 'cn' ? 'embed-reader-chapter-h2-cn' : 'embed-reader-chapter-h2-en'}`}>
              {chapter.titleCn}
            </h2>
            {lang === 'en' && chapter.title !== `Chapter ${readerChapter}` && chapter.title !== chapter.titleCn && (
              <div className="embed-reader-chapter-subtitle">{chapter.title}</div>
            )}
            <div className="embed-reader-chapter-divider" />
          </div>

          <div
            className={`embed-reader-prose ${lang === 'cn' ? 'embed-reader-prose-cn' : 'embed-reader-prose-en'}`}
            style={{ fontSize: `${fontSize}px` }}
          >
            {paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
          </div>

          <div className="embed-reader-nav">
            {readerChapter > 1 ? (
              <button onClick={() => goToChapter(readerChapter - 1)} className="btn btn-outline" style={{ fontSize: '0.82rem' }}>
                ← {bookData.chapters[readerChapter - 2]?.titleCn || '上一章'}
              </button>
            ) : <div />}
            {readerChapter < totalChapters ? (
              <button onClick={() => goToChapter(readerChapter + 1)} className="btn btn-primary" style={{ fontSize: '0.82rem' }}>
                {bookData.chapters[readerChapter]?.titleCn || '下一章'} →
              </button>
            ) : (
              <div className="embed-reader-finish">
                <div className="embed-reader-finish-msg">✨ 恭喜你读完了《{bookData.titleCn || bookData.title}》！</div>
                {book.number < 7 ? (
                  <Link
                    to={`/books/${books.find(b => b.number === book.number + 1)?.id}`}
                    className="btn btn-primary"
                    style={{ textDecoration: 'none', fontSize: '0.82rem' }}
                    onClick={closeReader}
                  >
                    开始阅读下一部 →
                  </Link>
                ) : (
                  <button className="btn btn-outline" onClick={closeReader} style={{ fontSize: '0.82rem' }}>返回百科</button>
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
              <div className="book-detail-hogwarts-year">🏰 {book.hogwartsYear}</div>
            )}
            <button
              onClick={() => openReader()}
              className="book-detail-read-btn hover-border-gold"
              style={{
                background: readerOpen ? book.color : `${book.color}22`,
                color: readerOpen ? '#fff' : book.color,
                border: `1px solid ${book.color}44`,
              }}
            >
              📖 {readerOpen ? '阅读中...' : '开始阅读原著'}
            </button>
          </div>
        </div>

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
            <div className="book-dedicated-to" style={{ borderLeft: `3px solid ${book.color}` }}>
              📜 {book.dedicatedTo}
            </div>
          )}
        </div>

        {/* 主题与教训 */}
        {book.themes && (
          <div className="detail-section">
            <h2 className="detail-section-title">🎯 核心主题</h2>
            <div className="book-themes-wrap">
              {book.themes.map((theme, i) => (
                <span key={i} className="book-theme-tag" style={{
                  background: `${book.color}15`,
                  color: book.color,
                  border: `1px solid ${book.color}40`,
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
            <div className="book-setting-box">
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
              <div className="book-movie-links-list">
                {relatedMovies.map(m => (
                  <Link key={m.id} to={`/movies/${m.id}`} className="book-movie-link hover-slide-right">
                    <span className="book-movie-link-icon">🎬</span>
                    <div>
                      <div className="book-movie-link-title">{m.title}</div>
                      <div className="book-movie-link-meta">{m.year}年 · {m.director} · {m.duration} · 票房{m.boxOffice}</div>
                    </div>
                    <span className="book-movie-link-arrow">查看详情 →</span>
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
                <Link to={`/characters/${char.id}`} key={char.id} className="book-char-card hover-lift-subtle">
                  <div className="book-char-avatar-wrap">
                    {char.image ? (
                      <img src={char.image} alt={char.name} className="char-avatar-circle" />
                    ) : char.avatar}
                  </div>
                  <span className="book-char-name">{char.name}</span>
                  <span className="book-char-name-en">{char.nameEn}</span>
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
                className="chapter-item chapter-item-link book-chapter-btn"
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
