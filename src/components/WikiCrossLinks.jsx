import { Link } from 'react-router-dom'
import { characters } from '../data/characters'
import { spells } from '../data/spells'
import creatures from '../data/creatures'
import potions from '../data/potions'
import places from '../data/places'
import magicItems from '../data/magicItems'

const allLinks = [
  { label: '🧙 人物百科', path: '/characters', desc: `${characters.length}+ 位人物` },
  { label: '📚 原著百科', path: '/books', desc: '7 部原著小说' },
  { label: '🎬 电影百科', path: '/movies', desc: '8 部经典电影' },
  { label: '✨ 咒语大全', path: '/world/spells', desc: `${spells.length} 条咒语` },
  { label: '🐉 魔法生物', path: '/world/creatures', desc: `${creatures.length} 种生物` },
  { label: '⚗️ 魔药百科', path: '/world/potions', desc: `${potions.length} 种魔药` },
  { label: '🗺️ 地点百科', path: '/world/places', desc: `${places.length} 个地点` },
  { label: '🔮 魔法物品', path: '/world/items', desc: `${magicItems.length} 件物品` },
  { label: '🎩 分院帽测试', path: '/interactive/sorting', desc: '测测你的学院' },
  { label: '🦌 守护神测试', path: '/interactive/patronus', desc: '发现你的守护神' },
  { label: '🪄 魔杖匹配', path: '/interactive/wand', desc: '找到你的魔杖' },
]

export default function WikiCrossLinks({ currentPath }) {
  const links = allLinks.filter(l => l.path !== currentPath)

  return (
    <div className="wiki-cross-links">
      <h3 className="wiki-cross-links__title">
        🔗 探索魔法世界更多内容
      </h3>
      <div className="wiki-cross-links__grid">
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className="wiki-cross-link"
          >
            <span className="wiki-cross-link__label">
              {link.label}
            </span>
            <span className="wiki-cross-link__desc">
              {link.desc}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
