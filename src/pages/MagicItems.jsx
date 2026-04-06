import { useState } from 'react'
import useDocumentHead from '../hooks/useDocumentHead'
import WikiCrossLinks from '../components/WikiCrossLinks'
import StatsPanel from '../components/StatsPanel'
import magicItems from '../data/magicItems'

export default function MagicItems() {
  useDocumentHead({
    title: '⚗️ 魔法物品',
    titleEn: 'Magical Items — Legendary Artifacts Encyclopedia',
    description: '魔法世界传奇物品百科 — 死亡圣器、七大魂器、活点地图、格兰芬多之剑等经典物品详解。',
    descriptionEn: "Legendary magical items encyclopedia — the Deathly Hallows, Horcruxes, Marauder's Map, Sword of Gryffindor & more iconic artifacts.",
    keywords: '哈利波特魔法物品,死亡圣器,魂器,老魔杖,隐形衣,复活石,活点地图',
    keywordsEn: "Deathly Hallows,Horcruxes,Elder Wand,Invisibility Cloak,Resurrection Stone,Marauder's Map,Harry Potter items",
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const types = ['all', '魂器', '死亡圣器', '魔法道具', '传奇物品', '魂器/圣器', '黑暗物品']

  const filtered = magicItems.filter(item => {
    const matchesSearch = search === '' ||
      item.name.includes(search) ||
      item.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.includes(search)
    const matchesType = filter === 'all' || item.type === filter
    return matchesSearch && matchesType
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">⚗️ 魔法物品</h1>
      <p className="page-subtitle">从死亡圣器到活点地图，魔法世界中最传奇的物品</p>

      {/* 统计面板 */}
      <StatsPanel stats={[
        { label: '收录物品', value: `${magicItems.length} 件`, icon: '⚗️' },
        { label: '魂器', value: `${magicItems.filter(i => i.type === '魂器').length + 1} 件`, icon: '💀' },
        { label: '死亡圣器', value: '3 件', icon: '△' },
        { label: '传奇物品', value: `${magicItems.filter(i => i.type === '魔法道具' || i.type === '传奇物品').length} 件`, icon: '✨' },
      ]} />

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔮 搜索物品名称..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-bar">
        {types.map(t => (
          <button
            key={t}
            className={`filter-btn ${filter === t ? 'active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t === 'all' ? '✨ 全部' : t === '魂器' ? '💀 魂器' : t === '死亡圣器' ? '△ 死亡圣器' : t === '魔法道具' ? '🔧 魔法道具' : t === '传奇物品' ? '⭐ 传奇物品' : t === '魂器/圣器' ? '💍 魂器/圣器' : '🧿 黑暗物品'}
          </button>
        ))}
      </div>

      <div className="spells-grid">
        {filtered.map((item, i) => (
          <div key={i} className="magic-item-card" style={{ borderColor: 'rgba(212,168,67,0.15)' }}>
            <div className="spell-card-header">
              <span className="spell-icon">{item.emoji}</span>
              <div>
                <h3 className="spell-name">{item.name}</h3>
                <div className="spell-name-en">{item.nameEn}</div>
              </div>
            </div>
            <div className="spell-card-body">
              <div className="spell-meta">
                <span className="spell-type" style={{
                  background: item.type === '魂器' ? 'rgba(231,76,60,0.15)' :
                    item.type === '死亡圣器' ? 'rgba(155,89,182,0.15)' :
                    item.type === '魂器/圣器' ? 'rgba(243,156,18,0.15)' :
                    item.type === '黑暗物品' ? 'rgba(45,52,54,0.15)' : 'rgba(52,152,219,0.15)',
                  color: item.type === '魂器' ? '#e74c3c' :
                    item.type === '死亡圣器' ? '#9b59b6' :
                    item.type === '魂器/圣器' ? '#f39c12' :
                    item.type === '黑暗物品' ? '#636e72' : '#3498db',
                  borderColor: item.type === '魂器' ? 'rgba(231,76,60,0.3)' :
                    item.type === '死亡圣器' ? 'rgba(155,89,182,0.3)' :
                    item.type === '魂器/圣器' ? 'rgba(243,156,18,0.3)' :
                    item.type === '黑暗物品' ? 'rgba(45,52,54,0.3)' : 'rgba(52,152,219,0.3)',
                }}>
                  {item.type}
                </span>
              </div>
              <p className="spell-desc">{item.desc}</p>
              {item.destroyed && (
                <div style={{
                  marginTop: '8px',
                  padding: '4px 10px',
                  background: 'rgba(231,76,60,0.08)',
                  borderRadius: '8px',
                  fontSize: '0.7rem',
                  color: '#e74c3c',
                }}>
                  ⚔️ 摧毁方式：{item.destroyed}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
          <span style={{ fontSize: '3rem' }}>🔮</span>
          <p style={{ marginTop: 16 }}>没有找到匹配的魔法物品...</p>
        </div>
      )}

      <div className="section-info-box">
        <p>⚗️ 共收录 <strong>{magicItems.length}</strong> 件传奇魔法物品，含魂器摧毁方式等详细信息</p>
      </div>

      <WikiCrossLinks currentPath="/world/items" />
    </div>
  )
}
