import { useState } from 'react'
import useDocumentHead from '../hooks/useDocumentHead'
import WikiCrossLinks from '../components/WikiCrossLinks'
import StatsPanel from '../components/StatsPanel'
import creatures from '../data/creatures'

export default function Creatures() {
  useDocumentHead({
    title: '🐉 魔法生物',
    titleEn: 'Magical Creatures — Fantastic Beasts Encyclopedia',
    description: '魔法世界生物图鉴 — 龙、凤凰、独角兽、摄魂怪等魔法生物的分级、习性与故事。',
    descriptionEn: 'Encyclopedic guide to magical creatures — Dragons, Phoenixes, Unicorns, Dementors & more. Classifications, behaviors & stories from the Wizarding World.',
    keywords: '哈利波特生物,魔法生物,龙,凤凰,独角兽,摄魂怪,夜骐',
    keywordsEn: 'magical creatures,Fantastic Beasts,Dragons,Phoenix,Unicorn,Dementor,Thestral,Harry Potter',
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const dangers = ['all', '极危险', '危险', '有趣', '无害', '烦人']

  const filtered = creatures.filter(c => {
    const matchesSearch = search === '' ||
      c.name.includes(search) ||
      c.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.includes(search)
    const matchesDanger = filter === 'all' || c.danger === filter
    return matchesSearch && matchesDanger
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">🐉 魔法生物</h1>
      <p className="page-subtitle">从龙到独角兽，探索魔法世界中最神奇的生物</p>

      {/* 统计面板 */}
      <StatsPanel stats={[
        { label: '收录生物', value: `${creatures.length} 种`, icon: '🐉' },
        { label: '极危险', value: `${creatures.filter(c => c.danger === '极危险').length} 种`, icon: '⚠️' },
        { label: '危险级别', value: '5 级', icon: '📊' },
        { label: 'XXXXX级', value: `${creatures.filter(c => c.classification === 'XXXXX').length} 种`, icon: '💀' },
      ]} />

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔮 搜索生物名称..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-bar">
        {dangers.map(d => (
          <button
            key={d}
            className={`filter-btn ${filter === d ? 'active' : ''}`}
            onClick={() => setFilter(d)}
          >
            {d === 'all' ? '✨ 全部' : d === '极危险' ? '💀 极危险' : d === '危险' ? '⚠️ 危险' : d === '有趣' ? '🤔 有趣' : d === '无害' ? '🕊️ 无害' : '😤 烦人'}
          </button>
        ))}
      </div>

      <div className="spells-grid">
        {filtered.map((creature, i) => (
          <div key={i} className="creature-card" style={{ borderColor: 'rgba(212,168,67,0.15)' }}>
            <div className="spell-card-header">
              {creature.image ? (
                <img loading="lazy" src={creature.image} alt={creature.name} className="spell-icon-img" />
              ) : (
                <span className="spell-icon">{creature.emoji}</span>
              )}
              <div>
                <h3 className="spell-name">{creature.name}</h3>
                <div className="spell-name-en">{creature.nameEn}</div>
              </div>
            </div>
            <div className="spell-card-body">
              <div className="spell-meta">
                <span className="spell-type" style={{
                  background: creature.danger === '极危险' ? 'rgba(231,76,60,0.15)' :
                    creature.danger === '危险' ? 'rgba(230,126,34,0.15)' : 'rgba(46,204,113,0.15)',
                  color: creature.danger === '极危险' ? '#e74c3c' :
                    creature.danger === '危险' ? '#e67e22' : '#2ecc71',
                  borderColor: creature.danger === '极危险' ? 'rgba(231,76,60,0.3)' :
                    creature.danger === '危险' ? 'rgba(230,126,34,0.3)' : 'rgba(46,204,113,0.3)',
                }}>
                  {creature.danger}
                </span>
                <span className="spell-category">分级 {creature.classification}</span>
              </div>
              {creature.habitat && (
                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '4px' }}>📍 栖息地：{creature.habitat}</div>
              )}
              <p className="spell-desc">{creature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
          <span style={{ fontSize: '3rem' }}>🔮</span>
          <p style={{ marginTop: 16 }}>没有找到匹配的魔法生物...</p>
        </div>
      )}

      <div className="section-info-box">
        <p>🐉 共收录 <strong>{creatures.length}</strong> 种魔法生物，按魔法部分级标准分类</p>
      </div>

      <WikiCrossLinks currentPath="/world/creatures" />
    </div>
  )
}
