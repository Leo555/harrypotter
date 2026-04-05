import { Link } from 'react-router-dom'
import movies from '../data/movies'

export default function Movies() {
  return (
    <div className="container fade-in">
      <h1 className="page-title">🎬 电影百科</h1>
      <p className="page-subtitle">从2001到2011年，八部电影将魔法世界完美呈现在银幕之上</p>

      <div className="movies-grid">
        {movies.map(movie => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card">
            <div className="movie-card-poster" style={{ background: `linear-gradient(135deg, ${movie.color}, ${movie.color}99)` }}>
              <span className="movie-card-emoji">🎬</span>
              <span className="movie-card-number">#{movie.number}</span>
            </div>
            <div className="movie-card-body">
              <h3 className="movie-card-title">{movie.title}</h3>
              <div className="movie-card-meta">
                <span>📅 {movie.year}</span>
                <span>🎬 {movie.director}</span>
                <span>⏱️ {movie.duration}</span>
              </div>
              <div className="movie-card-box">
                💰 全球票房 {movie.boxOffice}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="section-info-box">
        <p>🎬 八部电影全球总票房超过 <strong>77亿美元</strong>，是史上最成功的电影系列之一</p>
      </div>
    </div>
  )
}
