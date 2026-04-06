import { useParams, Link, useNavigate } from 'react-router-dom'
import { characters, houses } from '../data/characters'
import movies from '../data/movies'
import characterGallery from '../data/gallery'
import PhotoGallery from '../components/PhotoGallery'
import useDocumentHead from '../hooks/useDocumentHead'

export default function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const char = characters.find(c => c.id === id)

  useDocumentHead({
    title: char ? `${char.name}（${char.nameEn}）` : '未找到人物',
    titleEn: char ? `${char.nameEn} — Character Profile` : 'Character Not Found',
    description: char ? `${char.name}的详细档案 — ${char.description.slice(0, 120)}` : '',
    descriptionEn: char ? `${char.nameEn} character profile — biography, background, wand info & more from the Wizarding World.` : '',
    keywords: char ? `${char.name},${char.nameEn},哈利波特人物,${char.occupation}` : '',
    keywordsEn: char ? `${char.nameEn},Harry Potter character,Wizarding World` : '',
    type: 'profile',
    jsonLd: char ? {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: char.nameEn,
      alternateName: char.name,
      description: char.description.slice(0, 200),
      jobTitle: char.occupation,
    } : null,
  })

  if (!char) {
    return (
      <div className="container fade-in not-found-wrapper">
        <h2 style={{ color: 'var(--color-gold)' }}>🔮 未找到该人物</h2>
        <button className="back-btn" style={{ marginTop: 24 }} onClick={() => navigate('/characters')}>
          ← 返回人物百科
        </button>
      </div>
    )
  }

  const house = houses[char.house]
  const relatedChars = char.relationships
    .map(rid => characters.find(c => c.id === rid))
    .filter(Boolean)

  return (
    <div className="container fade-in">
      <button className="back-btn" onClick={() => navigate('/characters')}>← 返回人物百科</button>

      <div className="character-detail">
        <div className="detail-header">
          {char.image ? (
            <div className="detail-avatar-img-wrap">
              <img src={char.image} alt={char.name} className="detail-avatar-img" />
            </div>
          ) : (
            <span className="detail-avatar">{char.avatar}</span>
          )}
          <h1 className="detail-name">{char.name}</h1>
          <div className="detail-name-en">{char.nameEn}</div>
          <div style={{ marginTop: 12 }}>
            <span className="meta-tag" style={{ background: `${house?.color}88` }}>
              {house?.emoji} {house?.name} — {house?.trait}
            </span>
          </div>
          {/* 演员信息 */}
          {char.actor && (
            <div className="char-actor-row">
              <div className="char-actor-badge">
                <span>🎬</span>
                <span>饰演者：{char.actor}</span>
                {char.actorEn && <span className="char-actor-en">（{char.actorEn}）</span>}
              </div>
              {char.actorEn && (
                <a
                  href={`https://www.imdb.com/find/?q=${encodeURIComponent(char.actorEn)}&s=nm`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="char-imdb-link"
                >
                  🔗 IMDb
                </a>
              )}
              {char.actor && (
                <a
                  href={`https://search.douban.com/movie/subject_search?search_text=${encodeURIComponent(char.actor)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="char-douban-link"
                >
                  🔗 豆瓣
                </a>
              )}
            </div>
          )}
        </div>

        {/* 外貌描述 */}
        {char.appearance && (
          <div className="detail-section">
            <h2 className="detail-section-title">👤 外貌特征</h2>
            <p className="char-appearance-box">
              {char.appearance}
            </p>
          </div>
        )}

        <div className="detail-section">
          <h2 className="detail-section-title">📋 基本信息</h2>
          <div className="info-grid">
            <div className="info-item"><span className="info-label">出生日期</span><span className="info-value">{char.born}</span></div>
            {char.died && <div className="info-item"><span className="info-label">逝世</span><span className="info-value">{char.died}</span></div>}
            <div className="info-item"><span className="info-label">血统</span><span className="info-value">{char.bloodStatus}</span></div>
            <div className="info-item"><span className="info-label">魔杖</span><span className="info-value">{char.wand}</span></div>
            <div className="info-item"><span className="info-label">守护神</span><span className="info-value">{char.patronus}</span></div>
            <div className="info-item"><span className="info-label">职业</span><span className="info-value">{char.occupation}</span></div>
            <div className="info-item"><span className="info-label">学院</span><span className="info-value">{house?.emoji} {house?.name}</span></div>
          </div>
        </div>

        {/* 技能特长 */}
        {char.skills && char.skills.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">⚡ 技能特长</h2>
            <div className="char-skill-wrap">
              {char.skills.map((skill, i) => (
                <span key={i} className="char-skill-tag" style={{
                  background: `${house?.color || '#d4af37'}22`,
                  color: house?.light || 'var(--color-gold)',
                  border: `1px solid ${house?.color || '#d4af37'}44`,
                }}>
                  ✦ {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 出演电影 */}
        {(() => {
          const charMovies = movies.filter(m =>
            m.cast.some(c => {
              const roleName = c.role
              return roleName === char.name ||
                (char.id === 'voldemort' && (roleName === '伏地魔' || roleName === '汤姆·里德尔')) ||
                (char.id === 'dobby' && (roleName === '多比' || roleName === '多比（配音）'))
            })
          )
          return charMovies.length > 0 ? (
            <div className="detail-section">
              <h2 className="detail-section-title">🎬 出演电影</h2>
              <div className="grid-auto-180">
                {charMovies.map(m => (
                  <Link
                    key={m.id}
                    to={`/movies/${m.id}`}
                    className="char-movie-card hover-lift-sm"
                  >
                    <div className="char-movie-num">
                      第{m.number}部 · {m.year}年
                    </div>
                    <div className="char-movie-title">
                      {m.title}
                    </div>
                    <div className="char-movie-actor">
                      {m.cast.find(c => c.role === char.name || 
                        (char.id === 'voldemort' && (c.role === '伏地魔' || c.role === '汤姆·里德尔')) ||
                        (char.id === 'dobby' && (c.role === '多比' || c.role === '多比（配音）'))
                      )?.actor || ''}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null
        })()}

        <div className="detail-section">
          <h2 className="detail-section-title">📖 人物简介</h2>
          <p className="detail-description">{char.description}</p>
        </div>

        {/* 详细传记 */}
        {char.biography && (
          <div className="detail-section">
            <h2 className="detail-section-title">📜 详细传记</h2>
            <div className="char-bio-box">
              {char.biography.split('\n\n').map((para, i) => (
                <p key={i} className="char-bio-para" style={{
                  marginBottom: i < char.biography.split('\n\n').length - 1 ? '16px' : 0,
                }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* 📸 剧照画廊 */}
        {characterGallery[char.id]?.photos?.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">📸 电影剧照 · 经典瞬间</h2>
            <p className="char-gallery-hint">
              点击查看大图 · 共 {characterGallery[char.id].photos.length} 张经典场景
            </p>
            <PhotoGallery
              photos={characterGallery[char.id].photos}
              characterName={char.name}
            />
          </div>
        )}

        {/* 经典语录 */}
        {char.quotes && char.quotes.length > 0 ? (
          <div className="detail-section">
            <h2 className="detail-section-title">💬 经典语录</h2>
            <div className="quotes-list">
              {char.quotes.map((q, i) => (
                <blockquote key={i} className="book-quote" style={{ marginBottom: '12px' }}>
                  <p>"{q.text}"</p>
                  <footer className="char-quote-source">— {q.source}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        ) : (
          <div className="detail-section">
            <h2 className="detail-section-title">💬 经典语录</h2>
            <blockquote className="book-quote">
              <p>{char.quote}</p>
            </blockquote>
          </div>
        )}

        <div className="detail-section">
          <h2 className="detail-section-title">⏳ 人生轨迹</h2>
          <div className="timeline">
            {char.timeline.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-year">{item.year}年</div>
                <div className="timeline-event">{item.event}</div>
              </div>
            ))}
          </div>
        </div>

        {relatedChars.length > 0 && (
          <div className="detail-section">
            <h2 className="detail-section-title">🗺️ 关系网络</h2>
            <div className="relation-map">
              <div className="relation-center" style={{ borderColor: house?.color }}>
                {char.image ? (
                  <img src={char.image} alt={char.name} className="relation-center-img" />
                ) : (
                  <span className="relation-center-emoji">{char.avatar}</span>
                )}
                <span className="relation-center-name">{char.name}</span>
              </div>
              <div className="relation-nodes">
                {relatedChars.map(rc => (
                  <Link to={`/characters/${rc.id}`} key={rc.id} className="relation-node">
                    {rc.image ? (
                      <img src={rc.image} alt={rc.name} className="relation-node-img" />
                    ) : (
                      <span className="relation-node-emoji">{rc.avatar}</span>
                    )}
                    <span className="relation-node-name">{rc.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 角色导航 */}
        {(() => {
          const idx = characters.findIndex(c => c.id === char.id)
          const prev = idx > 0 ? characters[idx - 1] : null
          const next = idx < characters.length - 1 ? characters[idx + 1] : null
          return (
            <div className="book-nav">
              {prev ? (
                <Link to={`/characters/${prev.id}`} className="book-nav-btn book-nav-prev">
                  <span className="book-nav-label">← 上一位</span>
                  <span className="book-nav-title">{prev.avatar} {prev.name}</span>
                </Link>
              ) : <div />}
              {next ? (
                <Link to={`/characters/${next.id}`} className="book-nav-btn book-nav-next">
                  <span className="book-nav-label">下一位 →</span>
                  <span className="book-nav-title">{next.avatar} {next.name}</span>
                </Link>
              ) : <div />}
            </div>
          )
        })()}
      </div>
    </div>
  )
}
