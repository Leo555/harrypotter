import { useParams, useNavigate, Link } from 'react-router-dom'
import books from '../data/books'
import { characters } from '../data/characters'
import movies from '../data/movies'
import useDocumentHead from '../hooks/useDocumentHead'

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const book = books.find(b => b.id === id)

  useDocumentHead({
    title: book ? `${book.title}` : '未找到书籍',
    description: book ? `${book.title}（${book.titleEn}）— ${book.summary.slice(0, 120)}` : '',
    keywords: book ? `${book.title},${book.titleEn},哈利波特第${book.number}部,在线阅读` : '',
  })

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

  return (
    <div className="container fade-in">
      <button className="back-btn" onClick={() => navigate('/books')}>← 返回原著百科</button>

      <div className="book-detail">
        {/* 头部 */}
        <div className="book-detail-header" style={{ borderColor: book.color }}>
          <div className="book-detail-cover" style={{ background: book.coverImage ? 'transparent' : `linear-gradient(135deg, ${book.color}, ${book.color}88)` }}>
            {book.coverImage ? (
              <img loading="lazy" src={book.coverImage} alt={book.title} className="book-detail-cover-img" />
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
            <Link
              to={`/books/${book.id}/read`}
              className="book-detail-read-btn"
            >
              📖 开始阅读原著
            </Link>
          </div>
        </div>

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
                      <img loading="lazy" src={char.image} alt={char.name} className="char-avatar-circle" />
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
              <Link
                key={i}
                to={`/books/${book.id}/read/${i + 1}`}
                className="chapter-item chapter-item-link book-chapter-btn"
              >
                <span className="chapter-number">第{i + 1}章</span>
                <span className="chapter-name">{chapterName}</span>
                <span className="chapter-read-icon">📖</span>
              </Link>
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
