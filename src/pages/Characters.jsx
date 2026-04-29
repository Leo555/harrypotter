import { useState } from 'react'
import { Link } from 'react-router-dom'
import { characters, houses } from '../data/characters'
import useDocumentHead from '../hooks/useDocumentHead'
import StatsPanel from '../components/StatsPanel'

export default function Characters() {
  useDocumentHead({
    title: '🧙 人物百科',
    titleEn: 'Characters Encyclopedia — Wizarding World Profiles',
    description: '魔法世界核心人物详细档案 — 哈利·波特、赫敏·格兰杰、伏地魔等角色的身份背景、详细传记、人生轨迹与关系网络。',
    descriptionEn: 'Detailed character profiles from the Wizarding World — Harry Potter, Hermione Granger, Voldemort & more. Backgrounds, biographies, life stories & relationship networks.',
    keywords: '哈利波特人物,魔法师,霍格沃茨角色,邓布利多,斯内普,伏地魔',
    keywordsEn: 'Harry Potter characters,Wizarding World characters,Dumbledore,Snape,Voldemort,Hogwarts',
  })

  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = characters.filter(c => {
    const matchesHouse = filter === 'all' || c.house === filter
    const matchesSearch = search === '' ||
      c.name.includes(search) ||
      c.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      c.occupation.includes(search)
    return matchesHouse && matchesSearch
  })

  // 学院统计
  const houseCounts = {}
  characters.forEach(c => {
    houseCounts[c.house] = (houseCounts[c.house] || 0) + 1
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">🧙 人物百科</h1>
      <p className="page-subtitle">魔法世界的每一位重要人物，从"大难不死的男孩"到"永远的"斯内普</p>

      {/* 统计面板 */}
      <StatsPanel stats={[
        { label: '收录人物', value: `${characters.length} 位`, icon: '🧙' },
        { label: '格兰芬多', value: `${houseCounts.gryffindor || 0} 位`, icon: '🦁' },
        { label: '斯莱特林', value: `${houseCounts.slytherin || 0} 位`, icon: '🐍' },
        { label: '拉文克劳', value: `${houseCounts.ravenclaw || 0} 位`, icon: '🦅' },
        { label: '赫奇帕奇', value: `${houseCounts.hufflepuff || 0} 位`, icon: '🦡' },
        { label: '其他', value: `${houseCounts.other || 0} 位`, icon: '🌟' },
      ]} />

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔮 搜索人物姓名、职业..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          ✨ 全部
        </button>
        {Object.entries(houses).map(([key, house]) => (
          <button
            key={key}
            className={`filter-btn ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {house.emoji} {house.name}
          </button>
        ))}
      </div>

      <div className="character-grid">
        {filtered.map(char => (
          <Link to={`/characters/${char.id}`} key={char.id} className="character-card">
            <div className="character-card-header">
              <div className="character-avatar" style={{ background: houses[char.house]?.color || '#333' }}>
                {char.image ? (
                  <img
                    loading="lazy"
                    src={char.image}
                    alt={char.name}
                    className="character-avatar-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fb = e.target.parentElement.querySelector('.avatar-fallback');
                      if (fb) fb.style.display = 'flex';
                    }}
                  />
                ) : null}
                {(!char.image || true) && <span className={`avatar-fallback${!char.image ? '' : ' avatar-fallback-hidden'}`}>{char.avatar}</span>}
              </div>
              <div>
                <div className="character-card-name">{char.name}</div>
                <div className="character-card-name-en">{char.nameEn}</div>
              </div>
            </div>
            <div className="character-card-body">
              <div className="character-meta">
                <span className="meta-tag" style={{ background: `${houses[char.house]?.color}44` }}>
                  {houses[char.house]?.emoji} {houses[char.house]?.name}
                </span>
                <span className="meta-tag">{char.bloodStatus}</span>
              </div>
              {/* 演员信息 */}
              {char.actor && (
                <div style={{
                  fontSize: '0.7rem',
                  opacity: 0.6,
                  marginTop: '6px',
                }}>
                  🎬 {char.actor}
                </div>
              )}
              {/* 技能标签 */}
              {char.skills && (
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  flexWrap: 'wrap',
                  marginTop: '8px',
                }}>
                  {char.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} style={{
                      padding: '1px 6px',
                      borderRadius: '8px',
                      background: 'rgba(212,175,55,0.1)',
                      color: 'var(--color-gold)',
                      fontSize: '0.6rem',
                      border: '1px solid rgba(212,175,55,0.2)',
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <div className="character-quote">{char.quote}</div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
          <span style={{ fontSize: '3rem' }}>🔮</span>
          <p style={{ marginTop: 16 }}>没有找到匹配的巫师或女巫...</p>
        </div>
      )}

      <div className="section-info-box">
        <p>📊 共收录 <strong>{characters.length}</strong> 位巫师和女巫的详细档案，包含传记、技能、演员信息</p>
        <p style={{ marginTop: '8px', fontSize: '0.8rem', opacity: 0.7 }}>
          ✨ 点击人物卡片查看完整传记、人生轨迹和关系网络
        </p>
      </div>
    </div>
  )
}
