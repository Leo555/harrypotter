import { Link } from 'react-router-dom'
import useNews from '../data/news'
import useDocumentHead from '../hooks/useDocumentHead'

export default function News() {
  const { news, loading } = useNews()

  useDocumentHead({
    title: '📰 预言家日报',
    titleEn: 'The Daily Prophet - News',
    description: '魔法世界的最新消息与动态 — 哈利波特影视、游戏、活动、周边一手资讯实时更新。',
    descriptionEn: 'Latest news from the Wizarding World — Harry Potter movies, games, events, and merchandise updates.',
    keywords: '哈利波特新闻,预言家日报,魔法世界资讯,Harry Potter新闻',
    keywordsEn: 'Harry Potter news,Daily Prophet,Wizarding World updates',
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">📰 预言家日报</h1>
      <p className="page-subtitle">魔法世界的最新消息与动态 — 影视、游戏、活动一手资讯</p>

      {loading ? (
        <div className="news-loading">
          <span className="news-loading-icon">🦉</span>
          <p>猫头鹰正在送来最新消息...</p>
        </div>
      ) : (
        <div className="news-list">
          {news.map(item => (
            <Link to={`/news/${item.id}`} key={item.id} className="news-card">
              <div className="news-icon">{item.image}</div>
              <div className="news-body">
                <span className="news-category">{item.category}</span>
                <h3 className="news-title">{item.title}</h3>
                <div className="news-date">🕐 {item.date}</div>
                <p className="news-summary">{item.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
