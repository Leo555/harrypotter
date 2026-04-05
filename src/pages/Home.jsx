import { Link } from 'react-router-dom'
import { news } from '../data/characters'
import books from '../data/books'
import movies from '../data/movies'

const features = [
  { path: '/books', icon: '📚', title: '原著百科', desc: '七部小说的完整百科，章节目录、经典名句、关键事件全收录' },
  { path: '/movies', icon: '🎬', title: '电影百科', desc: '八部电影详细资料，演员表、幕后花絮、票房数据一网打尽' },
  { path: '/characters', icon: '🧙', title: '人物百科', desc: '50+核心人物详细档案，从身份背景到人生轨迹' },
  { path: '/world/spells', icon: '✨', title: '咒语大全', desc: '魔法世界所有咒语收录，分类检索，了解每一个魔法的奥秘' },
  { path: '/news', icon: '📰', title: '预言家日报', desc: '哈利波特最新新闻动态，影视、游戏、活动资讯实时更新' },
  { path: '/extra-stories', icon: '📖', title: '隐秘故事集', desc: 'J.K.罗琳的番外传说，人物背景故事、魔法世界设定与美国魔法史' },
  { path: '/interactive/sorting', icon: '🎩', title: '分院帽测试', desc: '回答十道问题，发现你真正属于哪个霍格沃茨学院' },
]

const quotes = [
  { text: '在霍格沃茨，只要有人寻求帮助，帮助就会来到。', speaker: '阿不思·邓布利多', book: '魔法石' },
  { text: '决定我们成为什么样人的，不是我们的能力，而是我们的选择。', speaker: '阿不思·邓布利多', book: '密室' },
  { text: '幸福可以在最黑暗的时刻找到，只要你记得打开灯。', speaker: '阿不思·邓布利多', book: '阿兹卡班' },
  { text: '我们每个人心中都有光明和黑暗。重要的是我们选择展现哪一面。', speaker: '小天狼星·布莱克', book: '凤凰社' },
  { text: 'Always.（永远。）', speaker: '西弗勒斯·斯内普', book: '死亡圣器' },
]

export default function Home() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  const latestNews = news.slice(0, 3)

  return (
    <div className="fade-in">
      {/* Hero 区域 */}
      <section className="hero">
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }} />
          ))}
        </div>
        <div className="hero-badge">⚡ 中文哈利波特百科全书</div>
        <h1 className="hero-title">哈利波特的魔法世界</h1>
        <p className="hero-title-en">Harry Potter's Wizarding World</p>
        <p className="hero-subtitle">探索魔法世界的每一个角落 — 原著 · 电影 · 人物 · 咒语 · 新闻</p>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="stat-number">{books.length}</span>
            <span className="stat-label">部原著</span>
          </div>
          <div className="hero-stat">
            <span className="stat-number">{movies.length}</span>
            <span className="stat-label">部电影</span>
          </div>
          <div className="hero-stat">
            <span className="stat-number">50+</span>
            <span className="stat-label">个人物</span>
          </div>
          <div className="hero-stat">
            <span className="stat-number">100+</span>
            <span className="stat-label">条咒语</span>
          </div>
        </div>

        <div className="hero-cta">
          <Link to="/books" className="btn btn-primary">📚 开始探索</Link>
          <Link to="/interactive/sorting" className="btn btn-outline">🎩 分院帽测试</Link>
        </div>
      </section>

      {/* 每日名言 */}
      <section className="container section-quote">
        <blockquote className="daily-quote">
          <span className="quote-mark">"</span>
          <p className="quote-text">{randomQuote.text}</p>
          <footer className="quote-footer">
            — {randomQuote.speaker}，《哈利·波特与{randomQuote.book}》
          </footer>
        </blockquote>
      </section>

      {/* 核心模块入口 */}
      <section className="container">
        <h2 className="section-title">
          <span className="section-icon">🏰</span>
          探索魔法世界
        </h2>
        <div className="feature-grid">
          {features.map((f, i) => (
            <Link to={f.path} key={i} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
              <span className="feature-arrow">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 七部原著速览 */}
      <section className="container">
        <h2 className="section-title">
          <span className="section-icon">📚</span>
          七部原著
        </h2>
        <div className="books-scroll">
          {books.map(book => (
            <Link to={`/books/${book.id}`} key={book.id} className="book-mini-card" style={{ borderColor: book.color }}>
              <div className="book-mini-number">第{book.number}部</div>
              <div className="book-mini-cover" style={{ background: book.color }}>{book.cover}</div>
              <div className="book-mini-title">{book.title}</div>
              <div className="book-mini-year">{book.year}年出版</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 最新新闻 */}
      <section className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-icon">📰</span>
            预言家日报 · 最新消息
          </h2>
          <Link to="/news" className="section-link">查看全部 →</Link>
        </div>
        <div className="news-grid-home">
          {latestNews.map(item => (
            <Link to={`/news/${item.id}`} key={item.id} className="news-home-card">
              <div className="news-home-icon">{item.image}</div>
              <div className="news-home-body">
                <span className="news-category">{item.category}</span>
                <h3 className="news-home-title">{item.title}</h3>
                <p className="news-home-summary">{item.summary}</p>
                <span className="news-home-date">{item.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 分院帽入口 */}
      <section className="container">
        <div className="sorting-banner">
          <div className="sorting-banner-content">
            <span className="sorting-banner-icon">🎩</span>
            <div>
              <h3 className="sorting-banner-title">你属于哪个学院？</h3>
              <p className="sorting-banner-desc">戴上分院帽，回答十道问题，发现你在霍格沃茨的真正归属</p>
            </div>
            <Link to="/interactive/sorting" className="btn btn-primary">开始测试</Link>
          </div>
          <div className="sorting-houses">
            <span className="house-badge" style={{ background: '#740001' }}>🦁 格兰芬多</span>
            <span className="house-badge" style={{ background: '#1a472a' }}>🐍 斯莱特林</span>
            <span className="house-badge" style={{ background: '#0e1a40' }}>🦅 拉文克劳</span>
            <span className="house-badge" style={{ background: '#946b2d' }}>🦡 赫奇帕奇</span>
          </div>
        </div>
      </section>
    </div>
  )
}
