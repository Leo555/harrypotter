import { Link } from 'react-router-dom'
import { news } from '../data/characters'

export default function News() {
  return (
    <div className="container fade-in">
      <h1 className="page-title">📰 预言家日报</h1>
      <p className="page-subtitle">魔法世界的最新消息与动态 — 影视、游戏、活动一手资讯</p>

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
    </div>
  )
}
