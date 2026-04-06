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
    titleEn: movie ? `${movie.titleEn} — Movie Details` : 'Movie Not Found',
    description: movie ? `${movie.title}（${movie.titleEn}）— ${movie.year}年 · ${movie.director} · ${movie.duration} · 全球票房${movie.boxOffice}` : '',
    descriptionEn: movie ? `${movie.titleEn} (${movie.year}) — Directed by ${movie.director}. Runtime: ${movie.duration}. Box Office: ${movie.boxOffice}.` : '',
    keywords: movie ? `${movie.title},${movie.titleEn},哈利波特电影第${movie.number}部` : '',
    keywordsEn: movie ? `${movie.titleEn},Harry Potter movie,${movie.director}` : '',
    image: movie?.cover,
    type: 'video.movie',
    jsonLd: movie ? {
      '@context': 'https://schema.org',
      '@type': 'Movie',
      name: movie.titleEn,
      alternateName: movie.title,
      datePublished: String(movie.year),
      director: { '@type': 'Person', name: movie.director },
      duration: movie.duration,
      description: movie.titleEn,
    } : null,
  })

  if (!movie) {
    return (
      <div className="container fade-in detail-empty-state">
        <h2 className="detail-empty-title">🎬 未找到该电影</h2>
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
            <img loading="lazy" src={movie.cover} alt={movie.title} className="movie-detail-poster-img" />
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
                    <span className="movie-detail-score-value movie-score-douban">{movie.score.douban}</span>
                  </div>
                )}
                {movie.score.imdb && (
                  <div className="movie-detail-score-item">
                    <span className="movie-detail-score-label">IMDb</span>
                    <span className="movie-detail-score-value movie-score-imdb">{movie.score.imdb}</span>
                  </div>
                )}
                {movie.score.rottenTomatoes && (
                  <div className="movie-detail-score-item">
                    <span className="movie-detail-score-label">烂番茄</span>
                    <span className="movie-detail-score-value movie-score-rotten">{movie.score.rottenTomatoes}</span>
                  </div>
                )}
              </div>
            )}
            {/* 观看按钮 */}
            {movie.watchLinks && (
              <div className="movie-card-watch movie-card-watch-inline">
                <div className="movie-card-watch-links">
                  {movie.watchLinks.tencent && (
                    <a
                      href={movie.watchLinks.tencent}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="movie-watch-btn movie-watch-tencent"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M2.72 16.36c-.52.24-.72.76-.72 1.08 0 .8.76 1.56 2.2 1.56 1.16 0 2.52-.48 3.76-1.28a13.6 13.6 0 0 1-1.56-.6c-1.44-.68-2.72-1.44-3.68-.76zm18.56 0c-.96-.68-2.24.08-3.68.76-.48.24-1 .44-1.56.6 1.24.8 2.6 1.28 3.76 1.28 1.44 0 2.2-.76 2.2-1.56 0-.32-.2-.84-.72-1.08zM12 2C7.36 2 4.48 5.48 4.48 10.16c0 2.76.88 5.28 2.36 7.2.6.04 1.2.08 1.8.08h6.72c.6 0 1.2-.04 1.8-.08 1.48-1.92 2.36-4.44 2.36-7.2C19.52 5.48 16.64 2 12 2z"/></svg>
                      腾讯视频
                    </a>
                  )}
                  {movie.watchLinks.bilibili && (
                    <a
                      href={movie.watchLinks.bilibili}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="movie-watch-btn movie-watch-bilibili"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.906.247-.248.556-.372.92-.372.37 0 .68.124.92.372l2.333 2.226c.08.08.147.16.2.24h4.747c.053-.08.12-.16.2-.24l2.333-2.226c.247-.248.556-.372.92-.372.37 0 .68.124.92.372.247.247.373.55.373.906s-.124.659-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.384-.569-.4-.96V12.44c.016-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.384-.569-.4-.96V12.44c.016-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/></svg>
                      哔哩哔哩
                    </a>
                  )}
                </div>
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
              <Link to={`/books/${movie.relatedBook}`} className="movie-related-book-link">
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
                    <Link to={`/characters/${charId}`} className="movie-cast-role-link">
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
                    className="movie-cast-actor-link"
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
              <p className="movie-char-hint">点击卡片查看详细人物档案</p>
              <div className="grid-auto-200">
                {relatedCharacters.map(char => (
                  <Link
                    key={char.id}
                    to={`/characters/${char.id}`}
                    className="movie-char-card hover-card-gold"
                  >
                    <div className="movie-char-avatar-wrap">
                      {char.image ? (
                        <img loading="lazy" src={char.image} alt={char.name} className="char-avatar-circle" />
                      ) : char.avatar}
                    </div>
                    <div className="movie-char-name">{char.name}</div>
                    <div className="movie-char-name-en">{char.nameEn}</div>
                    {char.house && (
                      <div className="movie-char-house-tag">{char.house}</div>
                    )}
                    <div className="movie-char-occupation">{char.occupation}</div>
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
            <div className="movie-award-tags">
              {movie.awards.map((award, i) => (
                <span key={i} className="movie-award-tag">🏅 {award}</span>
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
