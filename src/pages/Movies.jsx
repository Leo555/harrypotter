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
          <div key={movie.id} className="movie-card">
            <Link to={`/movies/${movie.id}`} className="movie-card-link">
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
            {movie.watchLinks && (
              <div className="movie-card-watch">
                <div className="movie-card-watch-links">
                  <a
                    href={movie.watchLinks.tencent}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="movie-watch-btn movie-watch-tencent"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M2.72 16.36c-.52.24-.72.76-.72 1.08 0 .8.76 1.56 2.2 1.56 1.16 0 2.52-.48 3.76-1.28a13.6 13.6 0 0 1-1.56-.6c-1.44-.68-2.72-1.44-3.68-.76zm18.56 0c-.96-.68-2.24.08-3.68.76-.48.24-1 .44-1.56.6 1.24.8 2.6 1.28 3.76 1.28 1.44 0 2.2-.76 2.2-1.56 0-.32-.2-.84-.72-1.08zM12 2C7.36 2 4.48 5.48 4.48 10.16c0 2.76.88 5.28 2.36 7.2.6.04 1.2.08 1.8.08h6.72c.6 0 1.2-.04 1.8-.08 1.48-1.92 2.36-4.44 2.36-7.2C19.52 5.48 16.64 2 12 2z"/></svg>
                    腾讯视频
                  </a>
                  <a
                    href={movie.watchLinks.bilibili}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="movie-watch-btn movie-watch-bilibili"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.906.247-.248.556-.372.92-.372.37 0 .68.124.92.372l2.333 2.226c.08.08.147.16.2.24h4.747c.053-.08.12-.16.2-.24l2.333-2.226c.247-.248.556-.372.92-.372.37 0 .68.124.92.372.247.247.373.55.373.906s-.124.659-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/></svg>
                    哔哩哔哩
                  </a>
                </div>
              </div>
            )}
          </div>
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
