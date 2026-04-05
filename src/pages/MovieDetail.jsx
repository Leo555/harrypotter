import { useParams, useNavigate, Link } from 'react-router-dom'
import movies from '../data/movies'
import { characters } from '../data/characters'
import useDocumentHead from '../hooks/useDocumentHead'

// 电影角色名 → 人物百科ID映射
const roleToCharacterId = {
  '哈利·波特': 'harry-potter',
  '赫敏·格兰杰': 'hermione-granger',
  '罗恩·韦斯莱': 'ron-weasley',
  '阿不思·邓布利多': 'albus-dumbledore',
  '西弗勒斯·斯内普': 'severus-snape',
  '米勒娃·麦格': 'minerva-mcgonagall',
  '鲁伯·海格': 'rubeus-hagrid',
  '金妮·韦斯莱': 'ginny-weasley',
  '小天狼星·布莱克': 'sirius-black',
  '德拉科·马尔福': 'draco-malfoy',
  '卢娜·洛夫古德': 'luna-lovegood',
  '纳威·隆巴顿': 'neville-longbottom',
  '莱姆斯·卢平': 'remus-lupin',
  '伏地魔': 'voldemort',
  '汤姆·里德尔': 'voldemort',
  '多比（配音）': 'dobby',
  '多比': 'dobby',
  '贝拉特里克斯·莱斯特兰奇': 'bellatrix-lestrange',
  '疯眼汉穆迪': 'alastor-moody',
  '尼法朵拉·唐克斯': 'nymphadora-tonks',
}

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
        {/* 头部 — 电影海报 + 信息 */}
        <div className="movie-detail-header" style={{ borderColor: movie.color }}>
          <div className="movie-detail-poster">
            <img src={movie.cover} alt={movie.title} className="movie-detail-poster-img" />
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
            {/* 评分徽章 */}
            {movie.score && (
              <div className="movie-detail-scores">
                {movie.score.douban && (
                  <div className="movie-detail-score-item">
                    <span className="movie-detail-score-label">豆瓣</span>
                    <span className="movie-detail-score-value" style={{ color: '#2cb62c' }}>{movie.score.douban}</span>
                  </div>
                )}
                {movie.score.imdb && (
                  <div className="movie-detail-score-item">
                    <span className="movie-detail-score-label">IMDb</span>
                    <span className="movie-detail-score-value" style={{ color: '#f5c518' }}>{movie.score.imdb}</span>
                  </div>
                )}
                {movie.score.rottenTomatoes && (
                  <div className="movie-detail-score-item">
                    <span className="movie-detail-score-label">烂番茄</span>
                    <span className="movie-detail-score-value" style={{ color: '#fa3c3c' }}>{movie.score.rottenTomatoes}</span>
                  </div>
                )}
              </div>
            )}
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
            {movie.cast.map((c, i) => {
              const charId = roleToCharacterId[c.role]
              return (
                <div key={i} className="cast-card">
                  {charId ? (
                    <Link to={`/characters/${charId}`} style={{
                      color: 'var(--color-gold)',
                      textDecoration: 'none',
                      fontWeight: '600',
                      transition: 'opacity 0.3s',
                    }}>
                      <div className="cast-role" style={{ color: 'var(--color-gold)' }}>
                        {c.role} →
                      </div>
                    </Link>
                  ) : (
                    <div className="cast-role">{c.role}</div>
                  )}
                  <a
                    href={`https://www.imdb.com/find/?q=${encodeURIComponent(c.actorEn)}&s=nm`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: 'var(--color-parchment)',
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                    }}
                  >
                    <div className="cast-actor">{c.actor} 🔗</div>
                  </a>
                  <div className="cast-actor-en">{c.actorEn}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 相关人物百科卡片 */}
        {(() => {
          const relatedCharacters = movie.cast
            .map(c => {
              const charId = roleToCharacterId[c.role]
              return charId ? characters.find(ch => ch.id === charId) : null
            })
            .filter(Boolean)
          return relatedCharacters.length > 0 ? (
            <div className="detail-section">
              <h2 className="detail-section-title">🧙 相关人物百科</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                点击卡片查看详细人物档案
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '12px',
              }}>
                {relatedCharacters.map(char => (
                  <Link
                    key={char.id}
                    to={`/characters/${char.id}`}
                    style={{
                      textDecoration: 'none',
                      padding: '16px',
                      borderRadius: '12px',
                      background: 'rgba(212,175,55,0.04)',
                      border: '1px solid rgba(212,175,55,0.12)',
                      transition: 'all 0.3s ease',
                      display: 'block',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(212,175,55,0.1)'
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.35)'
                      e.currentTarget.style.transform = 'translateY(-3px)'
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(212,175,55,0.04)'
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.12)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <div style={{
                      fontSize: '2rem',
                      marginBottom: '8px',
                      textAlign: 'center',
                    }}>
                      {char.avatar}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: 'var(--color-parchment)',
                      textAlign: 'center',
                      marginBottom: '4px',
                    }}>
                      {char.name}
                    </div>
                    <div style={{
                      fontSize: '0.72rem',
                      color: 'var(--color-text-secondary)',
                      textAlign: 'center',
                      marginBottom: '8px',
                    }}>
                      {char.nameEn}
                    </div>
                    {char.house && (
                      <div style={{
                        fontSize: '0.7rem',
                        textAlign: 'center',
                        padding: '3px 8px',
                        borderRadius: '10px',
                        background: 'rgba(212,175,55,0.08)',
                        color: 'var(--color-gold)',
                        display: 'inline-block',
                        width: '100%',
                      }}>
                        {char.house}
                      </div>
                    )}
                    <div style={{
                      fontSize: '0.72rem',
                      color: 'var(--color-text-secondary)',
                      textAlign: 'center',
                      marginTop: '6px',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {char.occupation}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null
        })()}

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
