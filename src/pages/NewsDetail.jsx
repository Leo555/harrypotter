import { useParams, useNavigate, Link } from 'react-router-dom'
import useNews from '../data/news'
import useDocumentHead from '../hooks/useDocumentHead'

export default function NewsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { news, loading } = useNews()
  const item = news.find(n => n.id === Number(id))

  useDocumentHead({
    title: item ? `📰 ${item.title}` : '未找到新闻',
    titleEn: item ? `News: ${item.title}` : 'News Not Found',
    description: item ? `${item.summary}` : '该新闻不存在或已被移除。',
    descriptionEn: item ? `Harry Potter news: ${item.title}` : 'This news article could not be found.',
    keywords: item ? `${item.title},${item.category},哈利波特新闻` : '',
    keywordsEn: item ? `Harry Potter news,${item.category}` : '',
    type: 'article',
  })

  if (loading) {
    return (
      <div className="container fade-in not-found-wrapper">
        <span className="news-loading-icon">🦉</span>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 16 }}>猫头鹰正在送来最新消息...</p>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="container fade-in not-found-wrapper">
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

      <div className="news-detail-wrapper">
        <div className="news-detail-header">
          <span className="news-detail-icon">{item.image}</span>
          <h1 className="page-title" style={{ marginTop: 16, marginBottom: 8 }}>{item.title}</h1>
          <span className="news-category" style={{ fontSize: '0.85rem' }}>{item.category}</span>
          <div className="news-date" style={{ marginTop: 12 }}>🕐 {item.date}</div>
        </div>

        <div className="news-detail-content">{item.content}</div>

        {/* 相关链接区域 */}
        {item.relatedLinks && item.relatedLinks.length > 0 && (
          <div className="news-related-box">
            <h3 className="news-related-title">
              🔗 相关内容
            </h3>
            <div className="news-related-tags">
              {item.relatedLinks.map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  className="news-related-tag hover-tag-gold"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* 来源信息 */}
        {item.source && (
          <div className="news-source-box">
            <span className="news-source-label">📎 来源：</span>
            <a
              href={item.source}
              target="_blank"
              rel="noopener noreferrer"
              className="news-source-link hover-link-underline"
            >
              {item.source} ↗
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
