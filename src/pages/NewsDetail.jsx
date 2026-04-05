import { useParams, useNavigate, Link } from 'react-router-dom'
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

        {/* 相关链接区域 */}
        {item.relatedLinks && item.relatedLinks.length > 0 && (
          <div style={{
            marginTop: 32,
            padding: '20px 24px',
            borderRadius: '12px',
            background: 'rgba(212,175,55,0.05)',
            border: '1px solid rgba(212,175,55,0.15)',
          }}>
            <h3 style={{
              fontSize: '1rem',
              color: 'var(--color-gold)',
              marginBottom: 14,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              🔗 相关内容
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
              {item.relatedLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    background: 'rgba(212,175,55,0.1)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    color: 'var(--color-parchment)',
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  className="hover-tag-gold"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 来源信息 */}
        {item.source && (
          <div style={{
            marginTop: 16,
            padding: '12px 20px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>📎 来源：</span>
            <a
              href={item.source}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.8rem',
                color: 'var(--color-gold)',
                textDecoration: 'none',
                wordBreak: 'break-all',
              }}
              className="hover-link-underline"
            >
              {item.source} ↗
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
