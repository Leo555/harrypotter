import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
              <circle cx="16" cy="16" r="14" stroke="#d4a843" strokeWidth="1" opacity="0.4" />
              <path d="M18 4L12 15h5l-4 13 10-14h-6l5-10z" fill="url(#footerBolt)" />
              <defs>
                <linearGradient id="footerBolt" x1="12" y1="4" x2="23" y2="32">
                  <stop offset="0%" stopColor="#f5d778" />
                  <stop offset="100%" stopColor="#b8860b" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="footer-title">哈利波特的魔法世界</span>
          <p className="footer-tagline">魔法世界的一切，尽在此处</p>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>百科全书</h4>
            <Link to="/books">原著百科</Link>
            <Link to="/movies">电影百科</Link>
            <Link to="/characters">人物百科</Link>
            <Link to="/timeline">魔法时间线</Link>
          </div>
          <div className="footer-col">
            <h4>魔法世界</h4>
            <Link to="/world/spells">咒语大全</Link>
            <Link to="/world/creatures">魔法生物</Link>
            <Link to="/world/items">魔法物品</Link>
            <Link to="/world/places">地点百科</Link>
          </div>
          <div className="footer-col">
            <h4>互动体验</h4>
            <Link to="/interactive/sorting">分院帽测试</Link>
            <Link to="/interactive/patronus">守护神测试</Link>
            <Link to="/interactive/wand">魔杖匹配</Link>
            <a href="https://map.lz5z.com" target="_blank" rel="noopener noreferrer">活点地图</a>
            <Link to="/news">预言家日报</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>本站为粉丝创作项目，哈利·波特系列版权归 J.K. Rowling 及华纳兄弟所有</p>
        <p className="footer-quote">"在霍格沃茨，只要有人寻求帮助，帮助就会来到。" — 阿不思·邓布利多</p>
      </div>
    </footer>
  )
}
