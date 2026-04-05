import { useState } from 'react'
import useDocumentHead from '../hooks/useDocumentHead'

const magicItems = [
  { emoji: '📔', name: '汤姆·里德尔的日记', nameEn: "Tom Riddle's Diary", type: '魂器', desc: '伏地魔创造的第一个魂器，记录着年少时代的里德尔。日记中潜藏着16岁汤姆·里德尔的灵魂碎片，它曾控制金妮·韦斯莱打开密室释放蛇怪。哈利在密室中用蛇怪的毒牙将其刺穿摧毁——这是第一个被摧毁的魂器。', destroyed: '蛇怪毒牙（哈利·波特）' },
  { emoji: '💍', name: '马沃罗·冈特的戒指', nameEn: "Marvolo Gaunt's Ring", type: '魂器/圣器', desc: '冈特家族的传家宝，镶有佩弗利尔家族的标记（实为复活石）。伏地魔杀害父亲后将其制成魂器。邓布利多在冈特旧宅找到并用格兰芬多之剑摧毁它，但戒指上的致命诅咒使他的手变黑枯萎，只剩一年寿命。', destroyed: '格兰芬多之剑（邓布利多）' },
  { emoji: '🏆', name: '赫奇帕奇的金杯', nameEn: "Hufflepuff's Cup", type: '魂器', desc: '赫尔加·赫奇帕奇的遗物，一个小型金杯，具有特殊魔法属性。伏地魔杀害赫普兹巴·史密斯后偷走了它，存放在贝拉特里克斯·莱斯特兰奇在古灵阁的高安全等级金库中。', destroyed: '蛇怪毒牙（赫敏·格兰杰）' },
  { emoji: '👑', name: '拉文克劳的冠冕', nameEn: "Ravenclaw's Diadem", type: '魂器', desc: '罗伊纳·拉文克劳的冠冕，据说能增强佩戴者的智慧，上面刻着"超凡的智慧是人类最大的财富"。失踪数百年后被伏地魔找到并制成魂器，藏于霍格沃茨有求必应室。', destroyed: '厉火（文森特·克拉布意外释放）' },
  { emoji: '🐍', name: '斯莱特林的挂坠盒', nameEn: "Slytherin's Locket", type: '魂器', desc: '萨拉查·斯莱特林的遗物。R.A.B（雷古勒斯·布莱克）牺牲自己从洞穴中取出并替换了假货。真正的挂坠盒辗转到了蒙顿格斯手中，后被乌姆里奇获得。三人组潜入魔法部将其取回，罗恩用格兰芬多之剑将其摧毁。', destroyed: '格兰芬多之剑（罗恩·韦斯莱）' },
  { emoji: '⚡', name: '哈利·波特（活魂器）', nameEn: 'Harry Potter (Living Horcrux)', type: '魂器', desc: '伏地魔无意中创造的第七个魂器。1981年当索命咒反弹时，伏地魔不稳定的灵魂碎片嵌入了婴儿哈利体内。这赋予了哈利蛇佬腔能力和与伏地魔的精神连接。哈利在禁林中坦然赴死，伏地魔的索命咒只摧毁了魂器碎片。', destroyed: '阿瓦达索命咒（伏地魔本人，误杀自己的魂器）' },
  { emoji: '🐍', name: '娜吉尼', nameEn: 'Nagini', type: '魂器', desc: '伏地魔的蛇宠和最后一个有意创造的魂器。娜吉尼实际上是一个被血咒诅咒、永久变成蛇的女人（马尔迪克图斯）。她执行了伏地魔的多个命令，包括杀害斯内普。', destroyed: '格兰芬多之剑（纳威·隆巴顿）' },
  { emoji: '🪄', name: '老魔杖（接骨木魔杖）', nameEn: 'The Elder Wand', type: '死亡圣器', desc: '三件死亡圣器中最强大的一件，据说由死亡本身所造。这根魔杖的忠诚只属于打败其前任主人的巫师。从安提俄克·佩弗利尔到格林德沃到邓布利多，直到德拉科缴了邓布利多的械，再到哈利缴了德拉科的械——最终老魔杖效忠于哈利。', destroyed: null },
  { emoji: '🧥', name: '隐形衣', nameEn: 'Cloak of Invisibility', type: '死亡圣器', desc: '三件死亡圣器之一，由最小的佩弗利尔兄弟伊格诺图斯获得，此后在波特家族世代相传。与普通隐形衣不同，它永不褪色、永不失效，甚至连死亡都无法透过它。邓布利多曾借用研究后归还给哈利。', destroyed: null },
  { emoji: '💎', name: '复活石', nameEn: 'Resurrection Stone', type: '死亡圣器', desc: '三件死亡圣器之一，能召唤已逝之人的灵魂影像（非真正复活）。它被镶在冈特戒指中，后被邓布利多取出。哈利在走向禁林面对伏地魔时转动复活石，见到了父母、小天狼星和卢平的灵魂陪伴他走完最后的路。', destroyed: null },
  { emoji: '🗺️', name: '活点地图', nameEn: "Marauder's Map", type: '魔法道具', desc: '由掠夺者（尖头叉子詹姆、大脚板小天狼星、月亮脸卢平、虫尾巴彼得）在学生时代创造。激活咒语"我庄严宣誓我绝不干好事"，关闭咒语"恶作剧完成"。能实时显示霍格沃茨内所有人的位置，无论其使用隐形衣还是复方汤剂。', destroyed: null },
  { emoji: '⏰', name: '时间转换器', nameEn: 'Time-Turner', type: '魔法道具', desc: '沙漏形魔法装置，每转一圈可以回到一小时前。赫敏在三年级获得许可使用它来上额外课程，后来用它帮助拯救了小天狼星和巴克比克。魔法部神秘事务司存有大量时间转换器，在五年级的战斗中全部被毁。', destroyed: null },
  { emoji: '🪞', name: '厄里斯魔镜', nameEn: 'Mirror of Erised', type: '魔法道具', desc: '能显示观看者内心最深切渴望的魔镜。镜框上刻着"Erised stra ehru oyt ube cafru oyt on wohsi"（倒写的"I show not your face but your heart\'s desire"）。邓布利多在镜中看到自己的家人团聚，哈利看到了父母。', destroyed: null },
  { emoji: '🗡️', name: '格兰芬多之剑', nameEn: 'Sword of Gryffindor', type: '传奇物品', desc: '由妖精工匠格里菲克用精灵银打造，它会在真正的格兰芬多人有需要时出现。剑会吸收让它变强的物质——哈利用它杀死蛇怪后，剑浸透了蛇怪毒液，因此能够摧毁魂器。它先后被哈利、邓布利多、罗恩和纳威使用。', destroyed: null },
  { emoji: '🧹', name: '火弩箭', nameEn: 'Firebolt', type: '魔法道具', desc: '世界上最快的竞赛飞天扫帚，10秒内可加速到150英里/小时。由小天狼星作为圣诞礼物匿名送给哈利。曾被麦格教授没收检查是否被施了恶咒（让哈利和赫敏产生了短暂的矛盾）。在"七个波特"行动中被毁。', destroyed: null },
]

export default function MagicItems() {
  useDocumentHead({
    title: '⚗️ 魔法物品',
    description: '魔法世界传奇物品百科 — 死亡圣器、七大魂器、活点地图、格兰芬多之剑等经典物品详解。',
    keywords: '哈利波特魔法物品,死亡圣器,魂器,老魔杖,隐形衣,复活石,活点地图',
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const types = ['all', '魂器', '死亡圣器', '魔法道具', '传奇物品', '魂器/圣器']

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
          { label: '收录物品', value: `${magicItems.length} 件`, icon: '⚗️' },
          { label: '魂器', value: `${magicItems.filter(i => i.type === '魂器').length + 1} 件`, icon: '💀' },
          { label: '死亡圣器', value: '3 件', icon: '△' },
          { label: '传奇物品', value: `${magicItems.filter(i => i.type === '魔法道具' || i.type === '传奇物品').length} 件`, icon: '✨' },
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
            {t === 'all' ? '✨ 全部' : t === '魂器' ? '💀 魂器' : t === '死亡圣器' ? '△ 死亡圣器' : t === '魔法道具' ? '🔧 魔法道具' : t === '传奇物品' ? '⭐ 传奇物品' : '💍 魂器/圣器'}
          </button>
        ))}
      </div>

      <div className="spells-grid">
        {filtered.map((item, i) => (
          <div key={i} className="spell-card" style={{ borderColor: 'rgba(212,168,67,0.15)' }}>
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
                    item.type === '魂器/圣器' ? 'rgba(243,156,18,0.15)' : 'rgba(52,152,219,0.15)',
                  color: item.type === '魂器' ? '#e74c3c' :
                    item.type === '死亡圣器' ? '#9b59b6' :
                    item.type === '魂器/圣器' ? '#f39c12' : '#3498db',
                  borderColor: item.type === '魂器' ? 'rgba(231,76,60,0.3)' :
                    item.type === '死亡圣器' ? 'rgba(155,89,182,0.3)' :
                    item.type === '魂器/圣器' ? 'rgba(243,156,18,0.3)' : 'rgba(52,152,219,0.3)',
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
    </div>
  )
}
