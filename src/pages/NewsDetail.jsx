import { useParams, useNavigate, Link } from 'react-router-dom'
import useNews from '../data/news'
import useDocumentHead from '../hooks/useDocumentHead'

export default function NewsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { news, loading } = useNews()
  const item = news.find(n => String(n.id) === id)

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
      <div className="container fade-in detail-empty-state">
        <span className="news-loading-icon">🦉</span>
        <p className="detail-loading-text">猫头鹰正在送来最新消息...</p>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="container fade-in detail-empty-state">
        <h2 className="detail-empty-title">📰 未找到该新闻</h2>
        <button className="back-btn" style={{ marginTop: 24 }} onClick={() => navigate('/news')}>
          ← 返回预言家日报
        </button>
      </div>
    )
  }

  // 提取来源域名
  const sourceDomain = item.source ? (() => {
    try { return new URL(item.source).hostname.replace('www.', '') } catch { return '' }
  })() : ''

  return (
    <div className="container fade-in">
      <button className="back-btn" onClick={() => navigate('/news')}>← 返回预言家日报</button>

      <div className="news-detail-wrapper">
        <div className="news-detail-header">
          <span className="news-detail-icon">{item.image}</span>
          <h1 className="page-title" style={{ marginTop: 16, marginBottom: 8 }}>{item.title}</h1>
          <div className="news-detail-meta">
            <span className="news-category">{item.category}</span>
            <span className="news-date">🕐 {item.date}</span>
          </div>
        </div>

        {/* 摘要 */}
        <div className="news-detail-summary">
          <p>{item.summary}</p>
        </div>

        {/* 正文内容 */}
        {item.content && item.content !== item.summary && (
          <div className="news-detail-content">{item.content}</div>
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
              {sourceDomain || '查看原文'} ↗
            </a>
          </div>
        )}

        {/* 相关链接区域 */}
        {item.relatedLinks && item.relatedLinks.length > 0 && (
          <div className="news-related-box">
            <h3 className="news-related-title">🔗 相关内容</h3>
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
      </div>
    </div>
  )
}
