import { Link } from 'react-router-dom'

const creatures = [
  { emoji: '🐉', name: '龙', nameEn: 'Dragon', desc: '最壮观的魔法生物之一，已知有十个品种，包括匈牙利树蜂龙、瑞典短鼻龙等。', danger: '极危险', classification: 'XXXXX' },
  { emoji: '🦅', name: '鹰头马身有翼兽', nameEn: 'Hippogriff', desc: '马身鹰头的骄傲生物，接近时必须鞠躬表示尊重。巴克比克是最著名的鹰头马身有翼兽。', danger: '危险', classification: 'XXX' },
  { emoji: '🐦', name: '凤凰', nameEn: 'Phoenix', desc: '能够在火焰中重生的不朽之鸟。凤凰泪有强大的治愈能力，邓布利多的福克斯是最著名的凤凰。', danger: '有趣', classification: 'XXXX' },
  { emoji: '🦄', name: '独角兽', nameEn: 'Unicorn', desc: '纯洁而美丽的生物，银色血液有延续生命的力量，但饮用者将从此被诅咒。', danger: '无害', classification: 'XXXX' },
  { emoji: '🕷️', name: '八眼蜘蛛', nameEn: 'Acromantula', desc: '能说人话的巨型蜘蛛，海格的宠物阿拉戈克就是一只八眼蜘蛛。', danger: '极危险', classification: 'XXXXX' },
  { emoji: '👻', name: '摄魂怪', nameEn: 'Dementor', desc: '阿兹卡班的守卫，能吸取人类的快乐和希望，最可怕的攻击是摄魂怪之吻。', danger: '极危险', classification: 'Non-being' },
  { emoji: '🧝', name: '家养小精灵', nameEn: 'House-elf', desc: '服务于巫师家族的忠诚生物，只有收到主人赠予的衣物才能获得自由。多比是最著名的家养小精灵。', danger: '无害', classification: 'Being' },
  { emoji: '🐍', name: '蛇怪', nameEn: 'Basilisk', desc: '蛇之王，凝视其眼睛会立即死亡，只有公鸡的啼鸣能杀死它。', danger: '极危险', classification: 'XXXXX' },
  { emoji: '🐎', name: '夜骐', nameEn: 'Thestral', desc: '只有见证过死亡的人才能看到的骨瘦如柴的飞马，外表可怕但性情温顺。', danger: '危险', classification: 'XXXX' },
  { emoji: '🧚', name: '小仙子', nameEn: 'Pixie', desc: '蓝色的小型捣蛋精灵，擅长制造混乱，洛哈特的课上曾被大量释放。', danger: '烦人', classification: 'XXX' },
  { emoji: '🐺', name: '狼人', nameEn: 'Werewolf', desc: '满月时变身为狼的巫师，芬里尔·格雷伯克是最臭名昭著的狼人，卢平是最著名的好狼人。', danger: '极危险', classification: 'XXXXX' },
  { emoji: '🔥', name: '火焰杯守卫巨龙', nameEn: 'Tournament Dragons', desc: '三强争霸赛第一项任务中的四条母龙：匈牙利树蜂龙、中国火球龙、瑞典短鼻龙和威尔士绿龙。', danger: '极危险', classification: 'XXXXX' },
]

export default function Creatures() {
  return (
    <div className="container fade-in">
      <h1 className="page-title">🐉 魔法生物</h1>
      <p className="page-subtitle">从龙到独角兽，探索魔法世界中最神奇的生物</p>

      <div className="spells-grid">
        {creatures.map((creature, i) => (
          <div key={i} className="spell-card" style={{ borderColor: 'rgba(212,168,67,0.15)' }}>
            <div className="spell-card-header">
              <span className="spell-icon">{creature.emoji}</span>
              <div>
                <h3 className="spell-name">{creature.name}</h3>
                <div className="spell-name-en">{creature.nameEn}</div>
              </div>
            </div>
            <div className="spell-card-body">
              <div className="spell-meta">
                <span className="spell-type" style={{
                  background: creature.danger === '极危险' ? 'rgba(231,76,60,0.15)' :
                    creature.danger === '危险' ? 'rgba(230,126,34,0.15)' : 'rgba(46,204,113,0.15)',
                  color: creature.danger === '极危险' ? '#e74c3c' :
                    creature.danger === '危险' ? '#e67e22' : '#2ecc71',
                  borderColor: creature.danger === '极危险' ? 'rgba(231,76,60,0.3)' :
                    creature.danger === '危险' ? 'rgba(230,126,34,0.3)' : 'rgba(46,204,113,0.3)',
                }}>
                  {creature.danger}
                </span>
                <span className="spell-category">分级 {creature.classification}</span>
              </div>
              <p className="spell-desc">{creature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="section-info-box">
        <p>🐉 共收录 <strong>{creatures.length}</strong> 种魔法生物，更多生物图鉴持续更新中...</p>
      </div>
    </div>
  )
}
