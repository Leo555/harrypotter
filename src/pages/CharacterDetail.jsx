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
        </div>

        <div className="detail-section">
          <h2 className="detail-section-title">📋 基本信息</h2>
          <div className="info-grid">
            <div className="info-item"><span className="info-label">出生日期</span><span className="info-value">{char.born}</span></div>
            <div className="info-item"><span className="info-label">血统</span><span className="info-value">{char.bloodStatus}</span></div>
            <div className="info-item"><span className="info-label">魔杖</span><span className="info-value">{char.wand}</span></div>
            <div className="info-item"><span className="info-label">守护神</span><span className="info-value">{char.patronus}</span></div>
            <div className="info-item"><span className="info-label">职业</span><span className="info-value">{char.occupation}</span></div>
            <div className="info-item"><span className="info-label">学院</span><span className="info-value">{house?.emoji} {house?.name}</span></div>
          </div>
        </div>

        <div className="detail-section">
          <h2 className="detail-section-title">📖 人物简介</h2>
          <p className="detail-description">{char.description}</p>
          <blockquote className="book-quote" style={{ marginTop: 20 }}>
            <p>{char.quote}</p>
          </blockquote>
        </div>

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
      </div>
    </div>
  )
}
