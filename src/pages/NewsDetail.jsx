import { useParams, useNavigate } from 'react-router-dom'
import { news } from '../data/characters'

export default function NewsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = news.find(n => n.id === Number(id))

  if (!item) {
    return (
      <div className="container fade-in" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2 style={{ color: 'var(--color-gold)' }}>📰 未找到该新闻</h2>
        <button className="back-btn" style={{ marginTop: 24 }} onClick={() => navigate('/news')}>
          ← 返回预言家日报
        </button>
      </div>
    )
  }

  return (
    <div className="container fade-in">
      <button className="back-btn" onClick={() => navigate('/news')}>← 返回预言家日报</button>

      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ fontSize: '4rem' }}>{item.image}</span>
          <h1 className="page-title" style={{ marginTop: 16, marginBottom: 8 }}>{item.title}</h1>
          <span className="news-category" style={{ fontSize: '0.85rem' }}>{item.category}</span>
          <div className="news-date" style={{ marginTop: 12 }}>🕐 {item.date}</div>
        </div>
        <div className="news-detail-content">{item.content}</div>
      </div>
    </div>
  )
}
