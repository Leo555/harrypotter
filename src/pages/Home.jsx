import { Link } from 'react-router-dom'
import { characters, houses, news } from '../data/characters'
import books from '../data/books'
import movies from '../data/movies'
import { spells } from '../data/spells'
import useDocumentHead from '../hooks/useDocumentHead'

const features = [
  { path: '/books', icon: '📚', title: '原著百科', desc: '七部小说完整百科，章节目录、经典名句、关键事件全收录' },
  { path: '/movies', icon: '🎬', title: '电影百科', desc: '八部电影详细资料，演员表、幕后花絮、票房数据一网打尽' },
  { path: '/characters', icon: '🧙', title: '人物百科', desc: '50+ 核心人物详细档案，从身份背景到人生轨迹' },
  { path: '/world/spells', icon: '✨', title: '咒语大全', desc: '魔法世界所有咒语收录，分类检索，了解每一个魔法的奥秘' },
  { path: '/world/creatures', icon: '🐉', title: '魔法生物', desc: '从龙到凤凰，探索魔法世界中最神奇的生物图鉴' },
  { path: '/world/items', icon: '⚗️', title: '魔法物品', desc: '死亡圣器、魂器、活点地图......传奇物品全收录' },
  { path: '/world/places', icon: '🗺️', title: '地点百科', desc: '霍格沃茨、对角巷、阿兹卡班......走遍魔法世界每个角落' },
  { path: '/news', icon: '📰', title: '预言家日报', desc: '哈利波特最新新闻动态，影视、游戏、活动资讯实时更新' },
  { path: '/extra-stories', icon: '📖', title: '隐秘故事集', desc: 'J.K.罗琳的番外传说，人物背景故事与魔法世界设定' },
  { path: '/timeline', icon: '⏳', title: '魔法时间线', desc: '1926-2017 百年大事记，魔法世界的历史长河' },
]

const quotes = [
  { text: '在霍格沃茨，只要有人寻求帮助，帮助就会来到。', speaker: '阿不思·邓布利多', book: '魔法石' },
  { text: '决定我们成为什么样人的，不是我们的能力，而是我们的选择。', speaker: '阿不思·邓布利多', book: '密室' },
  { text: '幸福可以在最黑暗的时刻找到，只要你记得打开灯。', speaker: '阿不思·邓布利多', book: '阿兹卡班的囚徒' },
  { text: '我们每个人心中都有光明和黑暗。重要的是我们选择展现哪一面。', speaker: '小天狼星·布莱克', book: '凤凰社' },
  { text: 'Always.（永远。）', speaker: '西弗勒斯·斯内普', book: '死亡圣器' },
  { text: '怕一个名字只会加深你对那个东西的恐惧。', speaker: '阿不思·邓布利多', book: '魔法石' },
  { text: '沉湎于虚幻的梦想，而忘记现实的生活，这是毫无益处的。', speaker: '阿不思·邓布利多', book: '魔法石' },
  { text: '真相是一种美丽而可怕的东西，需要格外谨慎地对待。', speaker: '阿不思·邓布利多', book: '魔法石' },
  { text: '对于头脑十分清醒的人来说，死亡不过是另一场伟大的冒险。', speaker: '阿不思·邓布利多', book: '魔法石' },
  { text: '表现我们真正的自我，是我们自己的选择，这比我们所具有的能力更重要。', speaker: '阿不思·邓布利多', book: '密室' },
]

const interactiveItems = [
  { path: '/interactive/sorting', icon: '🎩', title: '分院帽测试', desc: '回答十道问题，发现你属于哪个学院', status: 'active' },
  { path: '/interactive/patronus', icon: '🦌', title: '守护神测试', desc: '呼神护卫——发现属于你的守护神', status: 'active' },
  { path: '/interactive/wand', icon: '🪄', title: '魔杖匹配', desc: '魔杖选择巫师——找到你的命定之杖', status: 'active' },
  { path: '/reader', icon: '📖', title: '原著阅读', desc: '在线阅读七部原著，百科详情页内直接开读', status: 'active' },
]

export default function Home() {
  useDocumentHead({
    title: null,
    description: '中文互联网最全面的哈利波特百科全书网站 — 原著百科、电影百科、人物百科、咒语大全、魔法生物、互动测试，探索魔法世界的每一个角落。',
    keywords: '哈利波特,Harry Potter,魔法世界,霍格沃茨,百科全书,人物百科,咒语大全,分院帽测试',
  })

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  const latestNews = news.slice(0, 3)
  const featuredCharacters = characters.slice(0, 10)

  return (
    <div className="fade-in">
      {/* Hero 区域 */}
      <section className="hero">
        <div className="hero-particles">
          {[...Array(25)].map((_, i) => (
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
        <p className="hero-subtitle">探索魔法世界的每一个角落 — 原著 · 电影 · 人物 · 咒语 · 生物 · 物品 · 地点</p>

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
            <span className="stat-number">{characters.length}+</span>
            <span className="stat-label">位人物</span>
          </div>
          <div className="hero-stat">
            <span className="stat-number">{spells.length}+</span>
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
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-icon">📚</span>
            七部原著
          </h2>
          <Link to="/books" className="section-link">查看全部 →</Link>
        </div>
        <div className="showcase-scroll">
          {books.map(book => (
            <Link to={`/books/${book.id}`} key={book.id} className="showcase-card">
              <div className="showcase-poster" style={{ background: book.coverImage ? '#1a1a2e' : book.color }}>
                {book.coverImage ? (
                  <img src={book.coverImage} alt={book.title} className="showcase-poster-img" />
                ) : (
                  <span className="showcase-poster-emoji">{book.cover}</span>
                )}
                <div className="showcase-poster-overlay">
                  <span className="showcase-badge">第{book.number}部</span>
                </div>
              </div>
              <div className="showcase-info">
                <div className="showcase-title">{book.title}</div>
                <div className="showcase-meta">{book.year}年出版</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 八部电影速览 */}
      <section className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-icon">🎬</span>
            八部电影
          </h2>
          <Link to="/movies" className="section-link">查看全部 →</Link>
        </div>
        <div className="showcase-scroll">
          {movies.map(movie => (
            <Link to={`/movies/${movie.id}`} key={movie.id} className="showcase-card">
              <div className="showcase-poster">
                <img src={movie.cover} alt={movie.title} className="showcase-poster-img" />
                <div className="showcase-poster-overlay">
                  <span className="showcase-badge">#{movie.number}</span>
                </div>
              </div>
              <div className="showcase-info">
                <div className="showcase-title">{movie.title}</div>
                <div className="showcase-meta">{movie.year} · {movie.director}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 人物风云榜 */}
      <section className="container">
        <div className="section-header">
          <h2 className="section-title">
            <span className="section-icon">🧙</span>
            人物风云榜
          </h2>
          <Link to="/characters" className="section-link">查看全部 →</Link>
        </div>
        <div className="home-characters-grid">
          {featuredCharacters.map(char => (
            <Link to={`/characters/${char.id}`} key={char.id} className="feature-card home-char-card">
              <div style={{
                width: 72, height: 72,
                borderRadius: '50%',
                background: houses[char.house]?.color || '#333',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem', margin: '0 auto 10px',
                overflow: 'hidden',
                border: '2px solid rgba(212,168,67,0.3)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              }}>
                {char.image ? (
                  <img src={char.image} alt={char.name} className="char-avatar-circle" />
                ) : (
                  char.avatar
                )}
              </div>
              <h3 style={{ fontSize: '0.95rem', color: 'var(--color-parchment)', marginBottom: 4 }}>{char.name}</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', opacity: 0.8 }}>
                {houses[char.house]?.emoji} {houses[char.house]?.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-parchment)', opacity: 0.5, marginTop: 4 }}>
                {char.occupation}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 互动专区 */}
      <section className="container">
        <h2 className="section-title">
          <span className="section-icon">🎯</span>
          互动专区
        </h2>
        <div className="grid-auto-280">
          {interactiveItems.map((item, i) => (
            <Link to={item.path} key={i} className="feature-card" style={{
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <span className="feature-icon">{item.icon}</span>
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.desc}</p>
              {item.status === 'coming' && (
                <span style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'rgba(212,168,67,0.15)',
                  color: 'var(--color-gold)',
                  fontSize: '0.7rem',
                  padding: '3px 10px',
                  borderRadius: '12px',
                  border: '1px solid rgba(212,168,67,0.3)',
                }}>
                  即将上线
                </span>
              )}
              {item.status === 'active' && (
                <span className="feature-arrow">→</span>
              )}
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
