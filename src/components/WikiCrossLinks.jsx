import { Link } from 'react-router-dom'

const allLinks = [
  { label: '🧙 人物百科', path: '/characters', desc: '21位主要人物' },
  { label: '📚 原著百科', path: '/books', desc: '7部原著小说' },
  { label: '🎬 电影百科', path: '/movies', desc: '8部经典电影' },
  { label: '✨ 咒语大全', path: '/world/spells', desc: '26条经典咒语' },
  { label: '🐉 魔法生物', path: '/world/creatures', desc: '20种神奇生物' },
  { label: '⚗️ 魔药百科', path: '/potions', desc: '17种经典魔药' },
  { label: '🗺️ 地点百科', path: '/world/places', desc: '20个著名地点' },
  { label: '🔮 魔法物品', path: '/world/items', desc: '22件传奇物品' },
  { label: '🎩 分院帽测试', path: '/interactive/sorting', desc: '测测你的学院' },
  { label: '🦌 守护神测试', path: '/interactive/patronus', desc: '发现你的守护神' },
  { label: '🪄 魔杖匹配', path: '/interactive/wand', desc: '找到你的魔杖' },
  { label: '📖 原著阅读', path: '/books', desc: '百科内直接阅读' },
]

export default function WikiCrossLinks({ currentPath }) {
  const links = allLinks.filter(l => l.path !== currentPath)

  return (
    <div style={{
      marginTop: '40px',
      padding: '24px',
      borderRadius: '16px',
      background: 'rgba(212,175,55,0.03)',
      border: '1px solid rgba(212,175,55,0.1)',
    }}>
      <h3 style={{
        fontSize: '1rem',
        color: 'var(--color-gold)',
        marginBottom: '16px',
        textAlign: 'center',
      }}>
        🔗 探索魔法世界更多内容
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '8px',
      }}>
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(212,175,55,0.05)',
              border: '1px solid rgba(212,175,55,0.1)',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(212,175,55,0.12)'
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(212,175,55,0.05)'
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.1)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span style={{
              fontSize: '0.82rem',
              color: 'var(--color-parchment)',
              fontWeight: '500',
            }}>
              {link.label}
            </span>
            <span style={{
              fontSize: '0.65rem',
              color: 'var(--color-text-secondary)',
              marginTop: '2px',
            }}>
              {link.desc}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
