import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useDocumentHead from '../hooks/useDocumentHead'
import { loadBook, bookTitles, bookTitlesEn, bookCovers, bookColors, chapterNames } from '../data/bookLoader'
import books from '../data/books'

export default function BookReader() {
  const { bookId, chapterId } = useParams()
  const navigate = useNavigate()
  const bookNum = parseInt(bookId) || 1
  const chapterNum = parseInt(chapterId) || 0 // 0 means chapter selection view

  const [bookData, setBookData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('hp-reader-fontsize')
    return saved ? parseInt(saved) : 17
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lang, setLang] = useState(() => localStorage.getItem('hp-reader-lang') || 'en')
  const [readingProgress, setReadingProgress] = useState(0)
  const contentRef = useRef(null)
  const sidebarRef = useRef(null)

  const bookColor = bookColors[bookNum] || '#d4a843'

  const toggleLang = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'cn' : 'en'
      localStorage.setItem('hp-reader-lang', next)
      return next
    })
  }

  const changeFontSize = (delta) => {
    setFontSize(f => {
      const next = Math.min(26, Math.max(13, f + delta))
      localStorage.setItem('hp-reader-fontsize', next)
      return next
    })
  }

  useDocumentHead({
    title: chapterNum
      ? `📖 ${bookTitles[bookNum] || '原著阅读'} · ${lang === 'cn' ? '中文版' : '英文原版'}`
      : `📖 ${bookTitles[bookNum] || '原著阅读'} — 章节目录`,
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
    window.scrollTo(0, 0)
  }, [chapterNum, bookNum])

  // 阅读进度追踪
  useEffect(() => {
    if (!chapterNum) return
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight > 0) {
        setReadingProgress(Math.min(100, (window.scrollY / scrollHeight) * 100))
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [chapterNum])

  // 点击侧边栏外关闭
  useEffect(() => {
    const handleClick = (e) => {
      if (sidebarOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [sidebarOpen])

  // ESC 关闭侧边栏
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const goToChapter = useCallback((num) => {
    navigate(`/reader/${bookNum}/${num}`)
    setSidebarOpen(false)
  }, [bookNum, navigate])

  const chapter = bookData?.chapters?.[chapterNum - 1]
  const totalChapters = bookData?.chapters?.length || 0

  // 键盘导航（仅阅读模式）
  useEffect(() => {
    if (!chapterNum) return
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

  // ========================
  // 加载中
  // ========================
  if (loading) {
    return (
      <div className="reader-standalone">
        <div className="reader-loading">
          <div className="reader-loading-icon">{bookCovers[bookNum] || '📖'}</div>
          <div className="reader-loading-spinner" />
          <h2 className="reader-loading-title">
            正在打开 {bookTitles[bookNum] || '书籍'}...
          </h2>
          <p className="reader-loading-hint">
            {lang === 'cn' ? '翻开羊皮纸，中文译本正在浮现' : '翻开羊皮纸，魔法文字正在浮现'}
          </p>
        </div>
      </div>
    )
  }

  // ========================
  // 错误
  // ========================
  if (error || !bookData) {
    return (
      <div className="reader-standalone">
        <div className="reader-standalone-topbar">
          <Link to="/reader" className="reader-standalone-back">
            <span>←</span>
            <span>返回书架</span>
          </Link>
        </div>
        <div className="reader-error">
          <div className="reader-error-icon">😔</div>
          <h2 className="reader-error-title">无法加载书籍</h2>
          <p className="reader-error-msg">{error || '未知错误'}</p>
          <Link to="/reader" className="btn btn-primary reader-error-btn">
            返回书架
          </Link>
        </div>
      </div>
    )
  }

  // ========================
  // 章节选择页面（无 chapterId 时）
  // ========================
  if (!chapterId) {
    const bookInfo = books.find(b => b.number === bookNum)
    return (
      <div className="reader-standalone" style={{ '--book-color': bookColor }}>
        {/* 顶部导航条 */}
        <div className="reader-standalone-topbar">
          <Link to="/reader" className="reader-standalone-back">
            <span>←</span>
            <span>返回书架</span>
          </Link>
          <div className="reader-standalone-topbar-center">
            {bookCovers[bookNum]} {bookData.titleCn}
          </div>
          <div className="reader-standalone-topbar-right">
            <button onClick={toggleLang} className="reader-standalone-lang-btn">
              {lang === 'cn' ? '🇬🇧 English' : '🇨🇳 中文'}
            </button>
          </div>
        </div>

        {/* 书籍封面区 */}
        <div className="reader-chapters-hero">
          <div className="reader-chapters-cover">
            {bookInfo?.coverImage ? (
              <img src={bookInfo.coverImage} alt={bookData.titleCn} className="reader-chapters-cover-img" />
            ) : (
              <span className="reader-chapters-cover-emoji">{bookCovers[bookNum]}</span>
            )}
          </div>
          <h1 className="reader-chapters-title">{bookData.titleCn}</h1>
          <div className="reader-chapters-en">{bookData.titleEn}</div>
          <div className="reader-chapters-meta">
            <span>📑 {totalChapters} 章</span>
            <span className="reader-chapters-meta-dot">·</span>
            <span>{lang === 'cn' ? '🇨🇳 中文译本' : '🇬🇧 英文原版'}</span>
          </div>
          <button
            onClick={() => goToChapter(1)}
            className="reader-chapters-start-btn"
          >
            📖 从第一章开始阅读
          </button>
        </div>

        {/* 章节列表 */}
        <div className="reader-chapters-body">
          <h2 className="reader-chapters-section-title">📑 章节目录</h2>
          <div className="reader-chapters-grid">
            {bookData.chapters.map((ch) => (
              <button
                key={ch.number}
                onClick={() => goToChapter(ch.number)}
                className="reader-chapter-item"
                style={{ '--book-color': bookColor }}
              >
                <span className="reader-chapter-num">{ch.number}</span>
                <div className="reader-chapter-text">
                  <div className="reader-chapter-name">{ch.titleCn}</div>
                  {lang === 'en' && ch.title !== ch.titleCn && (
                    <div className="reader-chapter-name-en">{ch.title}</div>
                  )}
                </div>
                <span className="reader-chapter-arrow">→</span>
              </button>
            ))}
          </div>
        </div>

        {/* 底部导航 */}
        <div className="reader-chapters-footer">
          <Link to="/reader" className="btn btn-outline">← 返回书架</Link>
          <Link to={`/books/${bookInfo?.id || ''}`} className="btn btn-outline">📚 查看本书百科</Link>
          {bookNum < 7 && (
            <Link to={`/reader/${bookNum + 1}`} className="btn btn-outline">
              下一部：{bookTitles[bookNum + 1]} →
            </Link>
          )}
        </div>
      </div>
    )
  }

  // ========================
  // 正式阅读界面
  // ========================
  if (!chapter) {
    return (
      <div className="reader-standalone">
        <div className="reader-standalone-topbar">
          <Link to={`/reader/${bookNum}`} className="reader-standalone-back">
            <span>←</span>
            <span>返回目录</span>
          </Link>
        </div>
        <div className="reader-error">
          <p className="reader-error-msg">章节不存在</p>
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
    <div className="reader-standalone" style={{ '--book-color': bookColor }}>
      {/* 阅读进度条 */}
      <div className="reader-progress-bar">
        <div className="reader-progress-fill" style={{ width: `${readingProgress}%` }} />
      </div>

      {/* 侧边栏目录 */}
      <div className={`reader-sidebar-overlay ${sidebarOpen ? 'visible' : ''}`} onClick={() => setSidebarOpen(false)} />
      <aside ref={sidebarRef} className={`reader-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="reader-sidebar-header">
          <div className="reader-sidebar-book-info">
            <span className="reader-sidebar-cover">{bookCovers[bookNum]}</span>
            <div>
              <div className="reader-sidebar-book-title">{bookData.titleCn}</div>
              <div className="reader-sidebar-book-meta">{totalChapters} 章 · {lang === 'cn' ? '中文' : 'EN'}</div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="reader-sidebar-close">✕</button>
        </div>
        <div className="reader-sidebar-list">
          {bookData.chapters.map(ch => (
            <button
              key={ch.number}
              onClick={() => goToChapter(ch.number)}
              className={`reader-sidebar-item ${ch.number === chapterNum ? 'active' : ''}`}
            >
              <span className="reader-sidebar-item-num">{ch.number}</span>
              <span className="reader-sidebar-item-name">{ch.titleCn}</span>
              {ch.number === chapterNum && <span className="reader-sidebar-item-current">●</span>}
            </button>
          ))}
        </div>
        <div className="reader-sidebar-footer">
          <Link to={`/reader/${bookNum}`} className="reader-sidebar-footer-link">📑 章节概览</Link>
          <Link to="/reader" className="reader-sidebar-footer-link">📚 返回书架</Link>
        </div>
      </aside>

      {/* 顶部工具栏 */}
      <div className="reader-standalone-topbar reader-topbar-reading">
        <div className="reader-topbar-inner">
          {/* 左：目录按钮 + 书名 */}
          <div className="reader-topbar-left">
            <button onClick={() => setSidebarOpen(true)} className="reader-topbar-menu-btn" title="打开目录">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect y="3" width="20" height="2" rx="1" fill="currentColor"/>
                <rect y="9" width="20" height="2" rx="1" fill="currentColor"/>
                <rect y="15" width="20" height="2" rx="1" fill="currentColor"/>
              </svg>
            </button>
            <Link to={`/reader/${bookNum}`} className="reader-topbar-book-link" title="返回章节目录">
              <span>{bookCovers[bookNum]}</span>
              <span className="reader-topbar-book-name">{bookData.titleCn}</span>
            </Link>
          </div>

          {/* 中：章节名 */}
          <div className="reader-topbar-chapter-info">
            <span className="reader-topbar-chapter-name">{chapter.titleCn}</span>
            <span className="reader-topbar-chapter-progress">{chapterNum}/{totalChapters}</span>
          </div>

          {/* 右侧控制 */}
          <div className="reader-topbar-right">
            <button onClick={toggleLang} className="reader-topbar-lang-btn" title={lang === 'cn' ? '切换到英文原版' : '切换到中文译本'}>
              {lang === 'cn' ? '🇨🇳' : '🇬🇧'}
            </button>

            <div className="reader-font-controls">
              <button onClick={() => changeFontSize(-1)} className="reader-font-btn" title="缩小字体">A-</button>
              <span className="reader-font-size">{fontSize}</span>
              <button onClick={() => changeFontSize(1)} className="reader-font-btn" title="增大字体">A+</button>
            </div>

            <Link to="/reader" className="reader-topbar-exit-btn" title="返回书架">
              ✕
            </Link>
          </div>
        </div>
      </div>

      {/* 正文内容 */}
      <div ref={contentRef} className="reader-reading-content">
        {/* 章节标题 */}
        <div className="reader-chapter-header">
          <div className="reader-chapter-label">
            {lang === 'cn' ? `第 ${chapterNum} 章` : `Chapter ${chapterNum}`}
          </div>
          <h1 className={`reader-chapter-title ${lang === 'en' ? 'reader-chapter-title-en' : ''}`}>
            {chapter.titleCn}
          </h1>
          {lang === 'en' && chapter.title !== `Chapter ${chapterNum}` && chapter.title !== chapter.titleCn && (
            <div className="reader-chapter-title-sub">{chapter.title}</div>
          )}
          <div className="reader-chapter-divider" />
        </div>

        {/* 段落 */}
        <div
          className={`reader-text ${lang === 'cn' ? 'reader-text-cn' : 'reader-text-en'}`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {paragraphs.map((p, i) => (
            <p key={i} className="reader-paragraph">{p}</p>
          ))}
        </div>

        {/* 底部导航 */}
        <div className="reader-nav-footer">
          {chapterNum > 1 ? (
            <button onClick={() => goToChapter(chapterNum - 1)} className="reader-nav-btn reader-nav-prev">
              <span className="reader-nav-btn-arrow">←</span>
              <div className="reader-nav-btn-info">
                <span className="reader-nav-btn-label">上一章</span>
                <span className="reader-nav-btn-title">{bookData.chapters[chapterNum - 2]?.titleCn}</span>
              </div>
            </button>
          ) : (
            <div />
          )}
          {chapterNum < totalChapters ? (
            <button onClick={() => goToChapter(chapterNum + 1)} className="reader-nav-btn reader-nav-next">
              <div className="reader-nav-btn-info">
                <span className="reader-nav-btn-label">下一章</span>
                <span className="reader-nav-btn-title">{bookData.chapters[chapterNum]?.titleCn}</span>
              </div>
              <span className="reader-nav-btn-arrow">→</span>
            </button>
          ) : (
            <div className="reader-finish">
              <div className="reader-finish-icon">✨</div>
              <div className="reader-finish-text">
                恭喜你读完了《{bookData.titleCn || bookData.title}》！
              </div>
              <div className="reader-finish-actions">
                {bookNum < 7 ? (
                  <Link to={`/reader/${bookNum + 1}`} className="btn btn-primary">
                    开始阅读《{bookTitles[bookNum + 1]}》 →
                  </Link>
                ) : (
                  <Link to="/reader" className="btn btn-primary">
                    🏠 返回书架
                  </Link>
                )}
                <Link to={`/reader/${bookNum}`} className="btn btn-outline">
                  📑 回到目录
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
