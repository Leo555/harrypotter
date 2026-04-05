import { Link } from 'react-router-dom'

export default function Patronus() {
  const patronusList = [
    { emoji: '🦌', name: '牡鹿', desc: '勇敢与守护的象征，代表着深沉的爱与牺牲', famous: '哈利·波特、詹姆·波特' },
    { emoji: '🦦', name: '水獭', desc: '聪慧与好奇的代表，灵活且充满活力', famous: '赫敏·格兰杰' },
    { emoji: '🐕', name: '杰克罗素梗', desc: '忠诚与勇气的化身，虽小但无畏', famous: '罗恩·韦斯莱' },
    { emoji: '🐴', name: '母马', desc: '优雅与力量的结合，自由奔放', famous: '金妮·韦斯莱' },
    { emoji: '🐺', name: '狼', desc: '坚韧与野性的象征，群体中的守护者', famous: '莱姆斯·卢平' },
    { emoji: '🦊', name: '狐狸', desc: '机智与敏捷的代表，善于在困境中找到出路', famous: '西莫·斐尼甘' },
    { emoji: '🐱', name: '猫', desc: '独立与神秘的化身，拥有敏锐的直觉', famous: '米勒娃·麦格' },
    { emoji: '🦅', name: '苍鹰', desc: '高瞻远瞩、自由翱翔的精神象征', famous: '未知' },
    { emoji: '🐍', name: '蛇', desc: '变革与重生的力量，深邃而神秘', famous: '未知（极为罕见）' },
    { emoji: '🦢', name: '天鹅', desc: '纯洁与优雅的象征，外柔内刚', famous: '秋·张' },
    { emoji: '🐰', name: '野兔', desc: '敏捷与机警，在月光下最为活跃', famous: '卢娜·洛夫古德' },
    { emoji: '🦡', name: '獾', desc: '忠实与勤劳的象征，坚定不移', famous: '未知' },
  ]

  return (
    <div className="container fade-in">
      <h1 className="page-title">🦌 守护神测试</h1>
      <p className="page-subtitle">呼神护卫 — 发现属于你的守护神</p>

      <div style={{
        textAlign: 'center',
        padding: '40px 24px',
        background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.6), rgba(20, 20, 50, 0.8))',
        borderRadius: '16px',
        border: '1px solid rgba(212, 168, 67, 0.25)',
        marginBottom: '32px',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🪄✨</div>
        <h2 style={{ fontFamily: "'Cinzel', serif", color: 'var(--color-gold)', fontSize: '1.4rem', marginBottom: '12px' }}>
          Expecto Patronum!
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.8 }}>
          守护神咒是最强大的防御魔法之一。每个巫师的守护神都独一无二，
          它的形态反映了施咒者最深层的内心特质。完整的守护神测试即将上线，
          届时你将通过一系列深入灵魂的问题，发现属于你的守护神。
        </p>
        <div style={{
          display: 'inline-block',
          padding: '10px 28px',
          background: 'rgba(212, 168, 67, 0.15)',
          border: '1px solid rgba(212, 168, 67, 0.3)',
          borderRadius: '8px',
          color: 'var(--color-gold)',
          fontSize: '0.9rem',
        }}>
          🔮 测试即将上线 · 敬请期待
        </div>
      </div>

      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '24px' }}>
        🌟 已知的著名守护神
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {patronusList.map((p, i) => (
          <div key={i} style={{
            background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.5), rgba(20, 20, 50, 0.7))',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(212, 168, 67, 0.12)',
            transition: 'border-color 0.3s, transform 0.3s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '2rem' }}>{p.emoji}</span>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-text)' }}>{p.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-gold)', opacity: 0.7 }}>施术者：{p.famous}</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Link to="/interactive/sorting" className="cta-btn" style={{ textDecoration: 'none' }}>
          🎩 先去参加分院帽测试
        </Link>
      </div>
    </div>
  )
}
