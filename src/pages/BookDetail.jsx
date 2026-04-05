import { useParams, useNavigate, Link } from 'react-router-dom'
import books from '../data/books'
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
          </div>
        </div>

        {/* 故事梗概 */}
        <div className="detail-section">
          <h2 className="detail-section-title">📖 故事梗概</h2>
          <p className="detail-description">{book.summary}</p>
        </div>

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
