import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  {
    label: '📚 原著百科',
    path: '/books',
  },
  {
    label: '🎬 电影百科',
    path: '/movies',
  },
  {
    label: '🧙 人物百科',
    path: '/characters',
  },
  {
    label: '🏰 魔法世界',
    path: '/world',
    children: [
      { path: '/world/spells', label: '✨ 咒语大全' },
      { path: '/world/creatures', label: '🐉 魔法生物' },
      { path: '/world/items', label: '⚗️ 魔法物品' },
      { path: '/world/places', label: '🗺️ 地点百科' },
      { path: '/world/potions', label: '🧪 魔药百科' },
    ]
  },
  {
    label: '📰 预言家日报',
    path: '/news',
  },
  {
    label: '📖 隐秘故事集',
    path: '/extra-stories',
  },
  {
    label: '📖 原著阅读',
    path: '/reader',
  },
  {
    label: '🎯 互动专区',
    path: '/interactive',
    children: [
      { path: '/interactive/sorting', label: '🎩 分院帽测试' },
      { path: '/interactive/patronus', label: '🦌 守护神测试' },
      { path: '/interactive/wand', label: '🪄 魔杖匹配' },
    ]
  },
]

export default function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  const isActive = (item) => {
    if (location.pathname === item.path) return true
    if (item.children) {
      return item.children.some(child => location.pathname.startsWith(child.path))
    }
    return location.pathname.startsWith(item.path) && item.path !== '/'
  }

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo">
          <div className="logo-emblem">
            <svg className="logo-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 外圈魔法光环 */}
              <circle cx="24" cy="24" r="22" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.5" />
              <circle cx="24" cy="24" r="18" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" className="logo-ring-spin" />
              {/* 闪电疤痕 */}
              <path d="M26 8L18 22h7l-5 18 14-20h-8l6-12z" fill="url(#boltGrad)" className="logo-bolt" />
              {/* 星星装饰 */}
              <circle cx="10" cy="14" r="1" fill="#d4a843" opacity="0.8" className="logo-star s1" />
              <circle cx="38" cy="12" r="0.8" fill="#d4a843" opacity="0.6" className="logo-star s2" />
              <circle cx="8" cy="32" r="0.6" fill="#d4a843" opacity="0.5" className="logo-star s3" />
              <circle cx="40" cy="34" r="0.7" fill="#d4a843" opacity="0.7" className="logo-star s4" />
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="48" y2="48">
                  <stop offset="0%" stopColor="#f5d778" />
                  <stop offset="50%" stopColor="#d4a843" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
                <linearGradient id="boltGrad" x1="18" y1="8" x2="34" y2="48">
                  <stop offset="0%" stopColor="#fff7d4" />
                  <stop offset="30%" stopColor="#f5d778" />
                  <stop offset="70%" stopColor="#d4a843" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-main">哈利波特的魔法世界</span>
            <span className="logo-sub">WIZARDING WORLD</span>
          </div>
        </Link>

        <nav className="nav desktop-nav">
          {navItems.map(item => (
            <div
              key={item.path}
              className="nav-item-wrapper"
              onMouseEnter={() => item.children && setActiveDropdown(item.path)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={item.children ? item.children[0].path : item.path}
                className={`nav-item ${isActive(item) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
              {item.children && activeDropdown === item.path && (
                <div className="dropdown-menu">
                  {item.children.map(child => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`dropdown-item ${location.pathname === child.path ? 'active' : ''}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="菜单"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* 移动端菜单 */}
      {mobileOpen && (
        <div className="mobile-nav">
          {navItems.map(item => (
            <div key={item.path}>
              <Link
                to={item.children ? item.children[0].path : item.path}
                className={`mobile-nav-item ${isActive(item) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="mobile-nav-children">
                  {item.children.map(child => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`mobile-nav-child ${location.pathname === child.path ? 'active' : ''}`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}
