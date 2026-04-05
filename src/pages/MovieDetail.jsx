import { useParams, useNavigate, Link } from 'react-router-dom'
import movies from '../data/movies'
import useDocumentHead from '../hooks/useDocumentHead'

export default function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const movie = movies.find(m => m.id === id)

  useDocumentHead({
    title: movie ? `🎬 ${movie.title}` : '未找到电影',
    description: movie ? `${movie.title}（${movie.titleEn}）— ${movie.year}年 · ${movie.director} · ${movie.duration} · 全球票房${movie.boxOffice}` : '',
    keywords: movie ? `${movie.title},${movie.titleEn},哈利波特电影第${movie.number}部` : '',
  })

  if (!movie) {
    return (
      <div className="container fade-in" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h2 style={{ color: 'var(--color-gold)' }}>🎬 未找到该电影</h2>
        <button className="back-btn" style={{ marginTop: 24 }} onClick={() => navigate('/movies')}>
          ← 返回电影百科
        </button>
      </div>
    )
  }

  const prevMovie = movies.find(m => m.number === movie.number - 1)
  const nextMovie = movies.find(m => m.number === movie.number + 1)

  return (
    <div className="container fade-in">
      <button className="back-btn" onClick={() => navigate('/movies')}>← 返回电影百科</button>

      <div className="book-detail">
        {/* 头部 */}
        <div className="book-detail-header" style={{ borderColor: movie.color }}>
          <div className="book-detail-cover" style={{ background: `linear-gradient(135deg, ${movie.color}, ${movie.color}88)` }}>
            <span style={{ fontSize: '4rem' }}>🎬</span>
          </div>
          <div className="book-detail-info">
            <div className="book-detail-number" style={{ color: movie.color }}>第{movie.number}部电影</div>
            <h1 className="book-detail-title">{movie.title}</h1>
            <div className="book-detail-title-en">{movie.titleEn}</div>
            <div className="book-detail-meta">
              <span className="meta-tag">📅 {movie.year}年</span>
              <span className="meta-tag">🎬 {movie.director}</span>
              <span className="meta-tag">⏱️ {movie.duration}</span>
              <span className="meta-tag">💰 {movie.boxOffice}</span>
            </div>
          </div>
        </div>

        {/* 制作信息 */}
        <div className="detail-section">
          <h2 className="detail-section-title">📋 制作信息</h2>
          <div className="info-grid">
            <div className="info-item"><span className="info-label">导演</span><span className="info-value">{movie.director}（{movie.directorEn}）</span></div>
            <div className="info-item"><span className="info-label">上映年份</span><span className="info-value">{movie.year}年</span></div>
            <div className="info-item"><span className="info-label">时长</span><span className="info-value">{movie.duration}</span></div>
            <div className="info-item"><span className="info-label">全球票房</span><span className="info-value">{movie.boxOffice}</span></div>
            {movie.budget && <div className="info-item"><span className="info-label">制作预算</span><span className="info-value">{movie.budget}</span></div>}
            {movie.rating && <div className="info-item"><span className="info-label">分级</span><span className="info-value">{movie.rating}</span></div>}
            {movie.music && <div className="info-item"><span className="info-label">配乐</span><span className="info-value">{movie.music}</span></div>}
          </div>
        </div>

        {/* 评分 */}
        {movie.score && (
          <div className="detail-section">
            <h2 className="detail-section-title">⭐ 评分</h2>
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
            }}>
              {movie.score.douban && (
                <div style={{
                  flex: '1',
                  minWidth: '120px',
                  padding: '20px',
                  background: 'rgba(44,182,44,0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(44,182,44,0.2)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '4px' }}>豆瓣</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#2cb62c' }}>{movie.score.douban}</div>
                </div>
              )}
              {movie.score.imdb && (
                <div style={{
                  flex: '1',
                  minWidth: '120px',
                  padding: '20px',
                  background: 'rgba(245,197,24,0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(245,197,24,0.2)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '4px' }}>IMDb</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f5c518' }}>{movie.score.imdb}</div>
                </div>
              )}
              {movie.score.rottenTomatoes && (
                <div style={{
                  flex: '1',
                  minWidth: '120px',
                  padding: '20px',
                  background: 'rgba(250,60,60,0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(250,60,60,0.2)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '4px' }}>烂番茄</div>
                  <div style={{ fontSize: '2rem', fontWeight: '700', color: '#fa3c3c' }}>{movie.score.rottenTomatoes}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 剧情简介 */}
        <div className="detail-section">
          <h2 className="detail-section-title">📖 剧情简介</h2>
          <p className="detail-description">{movie.detailedSummary || movie.summary}</p>
          {movie.relatedBook && (
            <div style={{ marginTop: '16px' }}>
              <Link
                to={`/books/${movie.relatedBook}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  background: 'rgba(212,175,55,0.08)',
                  borderRadius: '8px',
                  border: '1px solid rgba(212,175,55,0.2)',
                  color: 'var(--color-gold)',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s',
                }}
              >
                📚 查看原著对照 →
              </Link>
            </div>
          )}
        </div>

        {/* 演员表 */}
        <div className="detail-section">
          <h2 className="detail-section-title">🎭 主要演员</h2>
          <div className="cast-grid">
            {movie.cast.map((c, i) => (
              <div key={i} className="cast-card">
                <div className="cast-role">{c.role}</div>
                <div className="cast-actor">{c.actor}</div>
                <div className="cast-actor-en">{c.actorEn}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 经典台词 */}
        {movie.classicLines && movie.classicLines.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">💬 经典台词</h2>
            <div className="quotes-list">
              {movie.classicLines.map((line, i) => (
                <blockquote key={i} className="book-quote">
                  <p>"{line.text}"</p>
                  <footer>— {line.speaker}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        )}

        {/* 幕后花絮 */}
        <div className="detail-section">
          <h2 className="detail-section-title">🎬 幕后花絮</h2>
          <div className="trivia-list">
            {movie.trivia.map((t, i) => (
              <div key={i} className="trivia-item">
                <span className="trivia-bullet">✦</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 奖项 */}
        {movie.awards && movie.awards.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">🏆 奖项与荣誉</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {movie.awards.map((award, i) => (
                <span key={i} style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  background: 'rgba(212,175,55,0.1)',
                  color: 'var(--color-gold)',
                  fontSize: '0.85rem',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}>
                  🏅 {award}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 上下部导航 */}
        <div className="book-nav">
          {prevMovie ? (
            <Link to={`/movies/${prevMovie.id}`} className="book-nav-btn book-nav-prev">
              <span className="book-nav-label">← 上一部</span>
              <span className="book-nav-title">{prevMovie.title}</span>
            </Link>
          ) : <div />}
          {nextMovie ? (
            <Link to={`/movies/${nextMovie.id}`} className="book-nav-btn book-nav-next">
              <span className="book-nav-label">下一部 →</span>
              <span className="book-nav-title">{nextMovie.title}</span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}
