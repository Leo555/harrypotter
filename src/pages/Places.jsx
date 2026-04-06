import { useState } from 'react'
import useDocumentHead from '../hooks/useDocumentHead'
import WikiCrossLinks from '../components/WikiCrossLinks'
import StatsPanel from '../components/StatsPanel'
import places from '../data/places'

export default function Places() {
  useDocumentHead({
    title: '🗺️ 地点百科',
    titleEn: 'Places Encyclopedia — Wizarding World Locations',
    description: '魔法世界地点百科 — 霍格沃茨、对角巷、阿兹卡班、九又四分之三站台等经典地点详解。',
    descriptionEn: 'Guide to Wizarding World locations — Hogwarts, Diagon Alley, Azkaban, Platform 9¾, Ministry of Magic & more iconic places.',
    keywords: '哈利波特地点,霍格沃茨,对角巷,阿兹卡班,九又四分之三站台,魔法部',
    keywordsEn: 'Hogwarts,Diagon Alley,Azkaban,Platform 9 3/4,Ministry of Magic,Harry Potter locations',
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const types = [...new Set(places.map(p => p.type))]

  const filtered = places.filter(p => {
    const matchesSearch = search === '' ||
      p.name.includes(search) ||
      p.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.includes(search)
    const matchesType = filter === 'all' || p.type === filter
    return matchesSearch && matchesType
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">🗺️ 地点百科</h1>
      <p className="page-subtitle">从霍格沃茨到对角巷，走遍魔法世界的每一个角落</p>

      {/* 统计面板 */}
      <StatsPanel stats={[
        { label: '收录地点', value: `${places.length} 个`, icon: '🗺️' },
        { label: '地点类型', value: `${types.length} 种`, icon: '🏷️' },
        { label: '伦敦地区', value: `${places.filter(p => p.location.includes('伦敦')).length} 个`, icon: '🇬🇧' },
        { label: '苏格兰', value: `${places.filter(p => p.location.includes('苏格兰')).length} 个`, icon: '🏴' },
      ]} />

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔮 搜索地点名称..."
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
        {types.map(t => (
          <button
            key={t}
            className={`filter-btn ${filter === t ? 'active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="spells-grid">
        {filtered.map((place, i) => (
          <div key={i} className="place-card" style={{ borderColor: 'rgba(212,168,67,0.15)' }}>
            <div className="spell-card-header">
              <span className="spell-icon">{place.emoji}</span>
              <div>
                <h3 className="spell-name">{place.name}</h3>
                <div className="spell-name-en">{place.nameEn}</div>
              </div>
            </div>
            <div className="spell-card-body">
              <div className="spell-meta">
                <span className="spell-type" style={{
                  background: 'rgba(212,168,67,0.12)',
                  color: 'var(--color-gold)',
                  borderColor: 'rgba(212,168,67,0.25)',
                }}>
                  {place.type}
                </span>
                <span className="spell-category">📍 {place.location}</span>
              </div>
              <p className="spell-desc">{place.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
          <span style={{ fontSize: '3rem' }}>🔮</span>
          <p style={{ marginTop: 16 }}>没有找到匹配的地点...</p>
        </div>
      )}

      <div className="section-info-box">
        <p>🗺️ 共收录 <strong>{places.length}</strong> 个魔法世界著名地点，含详细背景故事</p>
      </div>

      <WikiCrossLinks currentPath="/world/places" />
    </div>
  )
}
