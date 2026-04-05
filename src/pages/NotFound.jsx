import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container fade-in" style={{ textAlign: 'center', padding: '100px 24px' }}>
      <div style={{ fontSize: '6rem', marginBottom: '16px' }}>🧹</div>
      <h1 style={{
        fontFamily: "'Cinzel', serif",
        color: 'var(--color-gold)',
        fontSize: '2.5rem',
        marginBottom: '12px',
      }}>
        404
      </h1>
      <h2 style={{
        color: 'var(--color-parchment)',
        fontSize: '1.3rem',
        fontWeight: 400,
        marginBottom: '24px',
      }}>
        这条走廊似乎被移动楼梯带去了别处...
      </h2>
      <p style={{
        color: 'var(--color-parchment)',
        opacity: 0.6,
        maxWidth: '500px',
        margin: '0 auto 32px',
        lineHeight: 1.8,
      }}>
        你要找的页面不存在，也许它像消失柜一样去了另一个地方。
        不如回到首页，重新开始你的魔法之旅吧。
      </p>
      <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
        ⚡ 回到魔法世界
      </Link>
    </div>
  )
}
