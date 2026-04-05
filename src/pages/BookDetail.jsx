import { useParams, useNavigate, Link } from 'react-router-dom'
import books from '../data/books'
import { characters } from '../data/characters'
import useDocumentHead from '../hooks/useDocumentHead'

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const book = books.find(b => b.id === id)

  useDocumentHead({
    title: book ? `${book.title}` : '未找到书籍',
    description: book ? `${book.title}（${book.titleEn}）— ${book.summary.slice(0, 120)}` : '',
    keywords: book ? `${book.title},${book.titleEn},哈利波特第${book.number}部` : '',
  })

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

  return (
    <div className="container fade-in">
      <button className="back-btn" onClick={() => navigate('/books')}>← 返回原著百科</button>

      <div className="book-detail">
        {/* 头部 */}
        <div className="book-detail-header" style={{ borderColor: book.color }}>
          <div className="book-detail-cover" style={{ background: `linear-gradient(135deg, ${book.color}, ${book.color}88)` }}>
            <span style={{ fontSize: '4rem' }}>{book.cover}</span>
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

        {/* 关键人物 */}
        {keyChars.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">👥 关键人物</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '12px',
            }}>
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
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(212,175,55,0.08)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <span style={{ fontSize: '2rem', marginBottom: '8px' }}>{char.avatar}</span>
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
            {book.chapters.map((chapter, i) => (
              <div key={i} className="chapter-item">
                <span className="chapter-number">第{i + 1}章</span>
                <span className="chapter-name">{chapter}</span>
              </div>
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
