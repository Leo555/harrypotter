import { useState } from 'react'
import { Link } from 'react-router-dom'
import { characters, houses } from '../data/characters'
import useDocumentHead from '../hooks/useDocumentHead'

export default function Characters() {
  useDocumentHead({
    title: '🧙 人物百科',
    description: '魔法世界50+核心人物详细档案 — 哈利·波特、赫敏·格兰杰、伏地魔等角色的身份背景、魔杖信息、人生轨迹与关系网络。',
    keywords: '哈利波特人物,魔法师,霍格沃茨角色,邓布利多,斯内普,伏地魔',
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

  return (
    <div className="container fade-in">
      <h1 className="page-title">🧙 人物百科</h1>
      <p className="page-subtitle">魔法世界的每一位重要人物，从"大难不死的男孩"到"永远的"斯内普</p>

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
                {char.avatar}
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
        <p>📊 共收录 <strong>{characters.length}</strong> 位巫师和女巫，更多人物档案持续更新中...</p>
      </div>
    </div>
  )
}
