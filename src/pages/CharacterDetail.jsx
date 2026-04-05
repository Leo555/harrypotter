import { useParams, Link, useNavigate } from 'react-router-dom'
import { characters, houses } from '../data/characters'
import useDocumentHead from '../hooks/useDocumentHead'

export default function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const char = characters.find(c => c.id === id)

  useDocumentHead({
    title: char ? `${char.name}（${char.nameEn}）` : '未找到人物',
    description: char ? `${char.name}的详细档案 — ${char.description.slice(0, 120)}` : '',
    keywords: char ? `${char.name},${char.nameEn},哈利波特人物,${char.occupation}` : '',
  })

  if (!char) {
    return (
      <div className="container fade-in" style={{ textAlign: 'center', padding: '80px 24px' }}>
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
          <span className="detail-avatar">{char.avatar}</span>
          <h1 className="detail-name">{char.name}</h1>
          <div className="detail-name-en">{char.nameEn}</div>
          <div style={{ marginTop: 12 }}>
            <span className="meta-tag" style={{ background: `${house?.color}88`, padding: '5px 14px', fontSize: '0.85rem' }}>
              {house?.emoji} {house?.name} — {house?.trait}
            </span>
          </div>
          {/* 演员信息 */}
          {char.actor && (
            <div style={{
              marginTop: '12px',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '20px',
              fontSize: '0.8rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span>🎬</span>
              <span>饰演者：{char.actor}</span>
              {char.actorEn && <span style={{ opacity: 0.5 }}>（{char.actorEn}）</span>}
            </div>
          )}
        </div>

        {/* 外貌描述 */}
        {char.appearance && (
          <div className="detail-section">
            <h2 className="detail-section-title">👤 外貌特征</h2>
            <p style={{
              padding: '16px 20px',
              background: 'rgba(212,175,55,0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(212,175,55,0.1)',
              lineHeight: '1.8',
              fontSize: '0.9rem',
            }}>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {char.skills.map((skill, i) => (
                <span key={i} style={{
                  padding: '6px 16px',
                  borderRadius: '20px',
                  background: `${house?.color || '#d4af37'}22`,
                  color: house?.light || 'var(--color-gold)',
                  fontSize: '0.85rem',
                  border: `1px solid ${house?.color || '#d4af37'}44`,
                }}>
                  ✦ {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="detail-section">
          <h2 className="detail-section-title">📖 人物简介</h2>
          <p className="detail-description">{char.description}</p>
        </div>

        {/* 详细传记 */}
        {char.biography && (
          <div className="detail-section">
            <h2 className="detail-section-title">📜 详细传记</h2>
            <div style={{
              padding: '24px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '12px',
              border: '1px solid rgba(212,175,55,0.1)',
            }}>
              {char.biography.split('\n\n').map((para, i) => (
                <p key={i} style={{
                  lineHeight: '1.9',
                  fontSize: '0.9rem',
                  marginBottom: i < char.biography.split('\n\n').length - 1 ? '16px' : 0,
                  textIndent: '2em',
                }}>
                  {para}
                </p>
              ))}
            </div>
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
                  <footer style={{ fontSize: '0.75rem', opacity: 0.6 }}>— {q.source}</footer>
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
                <span className="relation-center-emoji">{char.avatar}</span>
                <span className="relation-center-name">{char.name}</span>
              </div>
              <div className="relation-nodes">
                {relatedChars.map(rc => (
                  <Link to={`/characters/${rc.id}`} key={rc.id} className="relation-node">
                    <span className="relation-node-emoji">{rc.avatar}</span>
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
