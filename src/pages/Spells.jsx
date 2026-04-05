import { useState } from 'react'
import { spells } from '../data/spells'
import useDocumentHead from '../hooks/useDocumentHead'

export default function Spells() {
  useDocumentHead({
    title: '✨ 咒语大全',
    description: '魔法世界经典咒语大全 — 从除你武器到阿瓦达索命，收录所有咒语的名称、效果、分类与首次出现。',
    keywords: '哈利波特咒语,魔法咒语,除你武器,呼神护卫,阿瓦达索命,不可饶恕咒',
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const categories = ['all', '防御', '黑魔法', '实用', '特殊']

  const filtered = spells.filter(s => {
    const matchesSearch = search === '' ||
      s.name.includes(search) ||
      s.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      s.effect.includes(search)
    const matchesCategory = filter === 'all' || s.category === filter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">✨ 咒语大全</h1>
      <p className="page-subtitle">收录魔法世界中的经典咒语，从基础的"荧光闪烁"到致命的"阿瓦达索命"</p>

      {/* 统计面板 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '16px',
        margin: '32px 0',
        padding: '24px',
        background: 'rgba(212,175,55,0.05)',
        borderRadius: '16px',
        border: '1px solid rgba(212,175,55,0.15)',
      }}>
        {[
          { label: '收录咒语', value: `${spells.length} 条`, icon: '✨' },
          { label: '防御咒语', value: `${spells.filter(s => s.category === '防御').length} 条`, icon: '🛡️' },
          { label: '黑魔法', value: `${spells.filter(s => s.category === '黑魔法').length} 条`, icon: '💀' },
          { label: '实用咒语', value: `${spells.filter(s => s.category === '实用').length} 条`, icon: '🔧' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-gold)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔮 搜索咒语名称或效果..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat === 'all' ? '✨ 全部' : cat === '防御' ? '🛡️ 防御' : cat === '黑魔法' ? '💀 黑魔法' : cat === '实用' ? '🔧 实用' : '🌟 特殊'}
          </button>
        ))}
      </div>

      <div className="spells-grid">
        {filtered.map(spell => (
          <div key={spell.id} className="spell-card" style={{ borderColor: `${spell.color}44` }}>
            <div className="spell-card-header">
              <span className="spell-icon">{spell.icon}</span>
              <div>
                <h3 className="spell-name">{spell.name}</h3>
                <div className="spell-name-en">{spell.nameEn}</div>
              </div>
            </div>
            <div className="spell-card-body">
              <div className="spell-meta">
                <span className="spell-type" style={{ background: `${spell.color}22`, color: spell.color, borderColor: `${spell.color}44` }}>
                  {spell.type}
                </span>
                <span className="spell-category">{spell.category}</span>
              </div>
              <p className="spell-effect"><strong>效果：</strong>{spell.effect}</p>
              <p className="spell-desc">{spell.description}</p>
              <div className="spell-source">首次出现：{spell.firstAppearance}</div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
          <span style={{ fontSize: '3rem' }}>🪄</span>
          <p style={{ marginTop: 16 }}>没有找到匹配的咒语...</p>
        </div>
      )}

      <div className="section-info-box">
        <p>✨ 共收录 <strong>{spells.length}</strong> 条经典咒语，涵盖防御、黑魔法、实用和特殊四大类别</p>
      </div>
    </div>
  )
}
