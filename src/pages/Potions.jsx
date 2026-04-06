import { useState } from 'react'
import potions from '../data/potions'
import useDocumentHead from '../hooks/useDocumentHead'
import WikiCrossLinks from '../components/WikiCrossLinks'
import StatsPanel from '../components/StatsPanel'

export default function Potions() {
  useDocumentHead({
    title: '⚗️ 魔药百科',
    titleEn: 'Potions Encyclopedia — Wizarding World Brews',
    description: '魔法世界魔药大全 — 复方汤剂、福灵剂、吐真剂、迷情剂等经典魔药的配方、效果与故事。',
    descriptionEn: 'Complete potions encyclopedia — Polyjuice Potion, Felix Felicis, Veritaserum, Amortentia & more. Recipes, effects & stories.',
    keywords: '哈利波特魔药,复方汤剂,福灵剂,吐真剂,迷情剂,魔药学',
    keywordsEn: 'Harry Potter potions,Polyjuice Potion,Felix Felicis,Veritaserum,Amortentia,potions class',
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const difficulties = ['all', '中级', '高级', '极高级']

  const filtered = potions.filter(p => {
    const matchesSearch = search === '' ||
      p.name.includes(search) ||
      p.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      p.effect.includes(search)
    const matchesDiff = filter === 'all' || p.difficulty === filter
    return matchesSearch && matchesDiff
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">⚗️ 魔药百科</h1>
      <p className="page-subtitle">从复方汤剂到福灵剂，探索魔法世界中最神奇的魔药配方</p>

      {/* 统计面板 */}
      <StatsPanel stats={[
        { label: '收录魔药', value: `${potions.length} 种`, icon: '⚗️' },
        { label: '高级魔药', value: `${potions.filter(p => p.difficulty === '高级').length} 种`, icon: '🔥' },
        { label: '极高级', value: `${potions.filter(p => p.difficulty === '极高级').length} 种`, icon: '⭐' },
        { label: '中级魔药', value: `${potions.filter(p => p.difficulty === '中级').length} 种`, icon: '📚' },
      ]} />

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔮 搜索魔药名称或效果..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-bar">
        {difficulties.map(d => (
          <button
            key={d}
            className={`filter-btn ${filter === d ? 'active' : ''}`}
            onClick={() => setFilter(d)}
          >
            {d === 'all' ? '✨ 全部' : d === '中级' ? '📚 中级' : d === '高级' ? '🔥 高级' : '⭐ 极高级'}
          </button>
        ))}
      </div>

      <div className="spells-grid">
        {filtered.map(potion => (
          <div key={potion.id} className="potion-card" style={{ borderColor: `${potion.color}44` }}>
            <div className="spell-card-header">
              <span className="spell-icon">{potion.icon}</span>
              <div>
                <h3 className="spell-name">{potion.name}</h3>
                <div className="spell-name-en">{potion.nameEn}</div>
              </div>
            </div>
            <div className="spell-card-body">
              <div className="spell-meta">
                <span className="spell-type" style={{
                  background: `${potion.color}22`,
                  color: potion.color,
                  borderColor: `${potion.color}44`,
                }}>
                  {potion.difficulty}
                </span>
                <span className="spell-category">⏱️ {potion.brewTime}</span>
              </div>
              <p className="spell-effect"><strong>效果：</strong>{potion.effect}</p>
              {/* 成分 */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '4px',
                margin: '8px 0',
              }}>
                {potion.ingredients.slice(0, 4).map((ing, i) => (
                  <span key={i} style={{
                    padding: '1px 6px',
                    borderRadius: '8px',
                    background: 'rgba(212,175,55,0.08)',
                    fontSize: '0.6rem',
                    opacity: 0.7,
                    border: '1px solid rgba(212,175,55,0.15)',
                  }}>
                    {ing}
                  </span>
                ))}
              </div>
              <p className="spell-desc">{potion.description}</p>
              <div className="spell-source">首次出现：{potion.firstAppearance}</div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
          <span style={{ fontSize: '3rem' }}>⚗️</span>
          <p style={{ marginTop: 16 }}>没有找到匹配的魔药...</p>
        </div>
      )}

      <div className="section-info-box">
        <p>⚗️ 共收录 <strong>{potions.length}</strong> 种经典魔药，包含配方、难度、酿制时间等详细信息</p>
      </div>

      <WikiCrossLinks currentPath="/world/potions" />
    </div>
  )
}
