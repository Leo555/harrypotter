import { Link } from 'react-router-dom'
import movies from '../data/movies'
import useDocumentHead from '../hooks/useDocumentHead'

export default function Movies() {
  useDocumentHead({
    title: '🎬 电影百科',
    description: '哈利·波特八部电影详细资料 — 导演、演员表、票房数据、幕后花絮、经典台词一网打尽。',
    keywords: '哈利波特电影,魔法石电影,密室电影,死亡圣器电影,丹尼尔·雷德克里夫',
  })

  // 计算票房数据
  const parseBoxOffice = (str) => parseFloat(str.replace(/[^0-9.]/g, ''))
  const totalBoxOffice = movies.reduce((sum, m) => sum + parseBoxOffice(m.boxOffice), 0)
  const totalCast = new Set(movies.flatMap(m => m.cast.map(c => c.actorEn))).size

  return (
    <div className="container fade-in">
      <h1 className="page-title">🎬 电影百科</h1>
      <p className="page-subtitle">从2001到2011年，八部电影将魔法世界完美呈现在银幕之上</p>

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
          { label: '电影数量', value: '8 部', icon: '🎬' },
          { label: '时间跨度', value: '2001-2011', icon: '📅' },
          { label: '总票房', value: `${totalBoxOffice.toFixed(1)}亿$`, icon: '💰' },
          { label: '导演人数', value: '4 位', icon: '🎥' },
          { label: '演员阵容', value: `${totalCast}+ 人`, icon: '🎭' },
          { label: '最高单片', value: '13.42亿$', icon: '🏆' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-gold)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{stat.label}</div>
          </div>
        ))}
      </div>


      <div className="movies-grid">
        {movies.map(movie => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card">
            <div className="movie-card-poster">
              <img src={movie.cover} alt={movie.title} className="movie-card-cover" />
              <div className="movie-card-overlay">
                <span className="movie-card-number">#{movie.number}</span>
                <div className="movie-card-overlay-bottom">
                  <div className="movie-card-overlay-info">
                    <span>🎬 {movie.director}</span>
                    <span>⏱️ {movie.duration}</span>
                  </div>
                  {movie.score && (
                    <div className="movie-card-scores">
                      {movie.score.douban && (
                        <span className="movie-score-badge movie-score-douban">
                          豆瓣 {movie.score.douban}
                        </span>
                      )}
                      {movie.score.imdb && (
                        <span className="movie-score-badge movie-score-imdb">
                          IMDb {movie.score.imdb}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="movie-card-body">
              <h3 className="movie-card-title">{movie.title}</h3>
              <div className="movie-card-meta">
                <span>{movie.year}年</span>
                <span className="movie-card-box-inline">💰 {movie.boxOffice}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="section-info-box">
        <p>🎬 八部电影全球总票房超过 <strong>{totalBoxOffice.toFixed(1)}亿美元</strong>，是史上最成功的电影系列之一</p>
        <p style={{ marginTop: '8px', fontSize: '0.8rem', opacity: 0.7 }}>
          🏆 系列最高评分：《死亡圣器（下）》IMDb 8.1 / 豆瓣 9.2 / 烂番茄 96%
        </p>
      </div>
    </div>
  )
}
