import { Link } from 'react-router-dom'

export default function WandMatch() {
  const wandCores = [
    { emoji: '🪶', name: '凤凰羽毛', desc: '最稀有的杖芯材料，能施展最广泛的魔法。凤凰羽毛杖芯有自己的主意，最难被驯服，选择主人最为挑剔。', famous: '哈利·波特、伏地魔' },
    { emoji: '🦄', name: '独角兽毛', desc: '最忠诚的杖芯，施咒稳定且强大。不太容易倒向黑魔法，对第一任主人最为忠诚。', famous: '罗恩·韦斯莱、纳威·隆巴顿' },
    { emoji: '💛', name: '龙心弦', desc: '最强大的杖芯，学习速度快，威力十足。但最容易发生意外，忠诚度也最低。', famous: '赫敏·格兰杰、贝拉特里克斯' },
    { emoji: '🌊', name: '雷鸟尾羽', desc: '北美魔杖制造师伊尔弗莫尼的最爱，擅长变形术，能感知危险。', famous: '北美巫师（伊尔弗莫尼传统）' },
    { emoji: '🐍', name: '角水蛇角', desc: '极为罕见的杖芯，对蛇佬腔使用者格外敏感，被认为能感知想法。', famous: '伊索特·塞尔（伊尔弗莫尼创始人）' },
    { emoji: '🦅', name: '毛球兽毛', desc: '拥有毛球兽温和忠诚的特质，施咒平稳可靠，适合心地善良的巫师。', famous: '雅各布·科沃尔斯基（例外案例）' },
  ]

  const wandWoods = [
    { name: '冬青木', emoji: '🌿', trait: '守护者' },
    { name: '紫杉木', emoji: '🌲', trait: '强大' },
    { name: '接骨木', emoji: '⚡', trait: '传奇' },
    { name: '橡木', emoji: '🌳', trait: '忠诚' },
    { name: '葡萄藤', emoji: '🍇', trait: '深邃' },
    { name: '柳木', emoji: '🌾', trait: '治愈' },
    { name: '山楂木', emoji: '🌸', trait: '矛盾' },
    { name: '桤木', emoji: '🍃', trait: '灵活' },
  ]

  return (
    <div className="container fade-in">
      <h1 className="page-title">🪄 魔杖匹配</h1>
      <p className="page-subtitle">"魔杖选择巫师" — 奥利凡德先生</p>

      <div style={{
        textAlign: 'center',
        padding: '40px 24px',
        background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.6), rgba(20, 20, 50, 0.8))',
        borderRadius: '16px',
        border: '1px solid rgba(212, 168, 67, 0.25)',
        marginBottom: '32px',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🪄⭐</div>
        <h2 style={{ fontFamily: "'Cinzel', serif", color: 'var(--color-gold)', fontSize: '1.4rem', marginBottom: '12px' }}>
          The Wand Chooses the Wizard
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.8 }}>
          每根魔杖都由独特的木材与杖芯组合而成，没有两根完全相同的魔杖。
          奥利凡德先生说过："魔杖选择巫师，这一点一直都很清楚。"
          完整的魔杖匹配测试即将上线，找到属于你的命定之杖。
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
        💫 杖芯百科
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '16px',
        marginBottom: '40px',
      }}>
        {wandCores.map((core, i) => (
          <div key={i} style={{
            background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.5), rgba(20, 20, 50, 0.7))',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid rgba(212, 168, 67, 0.12)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <span style={{ fontSize: '2rem' }}>{core.emoji}</span>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '1.05rem' }}>{core.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', opacity: 0.7 }}>代表巫师：{core.famous}</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 }}>{core.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '24px' }}>
        🌳 魔杖木材
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '40px',
      }}>
        {wandWoods.map((wood, i) => (
          <div key={i} style={{
            background: 'rgba(212, 168, 67, 0.08)',
            border: '1px solid rgba(212, 168, 67, 0.2)',
            borderRadius: '12px',
            padding: '14px 20px',
            textAlign: 'center',
            minWidth: '120px',
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{wood.emoji}</div>
            <div style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.9rem' }}>{wood.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-gold)', marginTop: '2px' }}>{wood.trait}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/interactive/sorting" className="cta-btn" style={{ textDecoration: 'none' }}>
          🎩 先去参加分院帽测试
        </Link>
      </div>
    </div>
  )
}
