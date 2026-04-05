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

        {/* 剧情简介 */}
        <div className="detail-section">
          <h2 className="detail-section-title">📖 剧情简介</h2>
          <p className="detail-description">{movie.summary}</p>
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
