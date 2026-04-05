import { Link } from 'react-router-dom'
import books from '../data/books'
import useDocumentHead from '../hooks/useDocumentHead'

export default function Books() {
  useDocumentHead({
    title: '📚 原著百科',
    description: 'J.K.罗琳创作的七部哈利·波特小说完整百科 — 故事梗概、章节目录、经典名句、关键事件、魔法物品全收录。',
    keywords: '哈利波特小说,原著百科,魔法石,密室,阿兹卡班,火焰杯,凤凰社,混血王子,死亡圣器',
  })

  const totalPages = books.reduce((sum, b) => sum + b.pages, 0)
  const totalChapters = books.reduce((sum, b) => sum + b.chapters.length, 0)
  const totalQuotes = books.reduce((sum, b) => sum + b.quotes.length, 0)

  return (
    <div className="container fade-in">
      <h1 className="page-title">📚 原著百科</h1>
      <p className="page-subtitle">J.K.罗琳创作的七部哈利·波特小说，构建了一个完整而迷人的魔法世界</p>

      {/* 统计面板 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '16px',
        margin: '32px 0',
        padding: '24px',
        background: 'rgba(212,175,55,0.05)',
        borderRadius: '16px',
        border: '1px solid rgba(212,175,55,0.15)',
      }}>
        {[
          { label: '全系列', value: '7 部', icon: '📚' },
          { label: '总页数', value: `${totalPages} 页`, icon: '📄' },
          { label: '总章节', value: `${totalChapters} 章`, icon: '📑' },
          { label: '时间跨度', value: '1997-2007', icon: '📅' },
          { label: '经典名句', value: `${totalQuotes} 条`, icon: '💬' },
          { label: '全球销量', value: '5亿+册', icon: '🌍' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-gold)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 时间线导航 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '4px',
        marginBottom: '32px',
        flexWrap: 'wrap',
      }}>
        {books.map(book => (
          <a
            key={book.id}
            href={`#book-${book.number}`}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              background: `${book.color}22`,
              color: book.color,
              border: `1px solid ${book.color}44`,
              fontSize: '0.8rem',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.target.style.background = book.color; e.target.style.color = '#fff' }}
            onMouseLeave={e => { e.target.style.background = `${book.color}22`; e.target.style.color = book.color }}
          >
            #{book.number} {book.year}
          </a>
        ))}
      </div>

      {/* 书籍卡片 */}
      <div className="books-grid">
        {books.map(book => (
          <Link to={`/books/${book.id}`} key={book.id} id={`book-${book.number}`} className="book-card">
            <div className="book-card-cover" style={{ background: `linear-gradient(135deg, ${book.color}, ${book.color}88)` }}>
              <span className="book-card-emoji">{book.cover}</span>
              <span className="book-card-number">第{book.number}部</span>
            </div>
            <div className="book-card-body">
              <h3 className="book-card-title">{book.title}</h3>
              <div className="book-card-title-en">{book.titleEn}</div>
              <div className="book-card-meta">
                <span>📅 {book.year}年</span>
                <span>📄 {book.pages}页</span>
                <span>📑 {book.chapters.length}章</span>
              </div>
              <div style={{ 
                fontSize: '0.72rem', 
                color: 'rgba(212,175,55,0.7)', 
                marginBottom: '8px',
                fontStyle: 'italic' 
              }}>
                {book.hogwartsYear}
              </div>
              <p className="book-card-summary">{book.summary.slice(0, 80)}...</p>

              {/* 主题标签 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '8px' }}>
                {book.themes.slice(0, 3).map((theme, i) => (
                  <span key={i} style={{
                    padding: '2px 8px',
                    borderRadius: '10px',
                    background: `${book.color}15`,
                    color: book.color,
                    fontSize: '0.65rem',
                    border: `1px solid ${book.color}30`,
                  }}>
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 系列信息 */}
      <div className="section-info-box">
        <p>📖 七部小说共计 <strong>{totalPages}页</strong>、<strong>{totalChapters}个章节</strong>，被翻译成 <strong>80多种语言</strong>，全球销量超过 <strong>5亿册</strong></p>
        <p style={{ marginTop: '8px', fontSize: '0.8rem', opacity: 0.7 }}>
          📝 出版时间线：1997年《魔法石》→ 2007年《死亡圣器》，横跨十年的魔法传奇
        </p>
      </div>
    </div>
  )
}
