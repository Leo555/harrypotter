import { useState } from 'react'
import useDocumentHead from '../hooks/useDocumentHead'
import WikiCrossLinks from '../components/WikiCrossLinks'
import StatsPanel from '../components/StatsPanel'

const creatures = [
  { emoji: '🐉', name: '龙', nameEn: 'Dragon', desc: '最壮观的魔法生物之一，已知有十个品种，包括匈牙利树蜂龙、瑞典短鼻龙等。龙的心弦是三种魔杖芯之一，龙血有十二种已知用途（由邓布利多发现）。在三强争霸赛中，参赛者需要绕过龙来获取金蛋。', danger: '极危险', classification: 'XXXXX', habitat: '山地、荒野' },
  { emoji: '🦅', name: '鹰头马身有翼兽', nameEn: 'Hippogriff', desc: '马身鹰头的骄傲生物，接近时必须鞠躬表示尊重。巴克比克是最著名的鹰头马身有翼兽，曾被冤判死刑后被哈利和赫敏用时间转换器救出，此后成为小天狼星的坐骑。', danger: '危险', classification: 'XXX', habitat: '开阔草地' },
  { emoji: '🐦', name: '凤凰', nameEn: 'Phoenix', desc: '能够在火焰中重生的不朽之鸟。凤凰泪有强大的治愈能力，邓布利多的福克斯是最著名的凤凰。福克斯的两根尾羽分别成为哈利和伏地魔魔杖的芯，导致两根魔杖无法正面对决（闪回咒）。', danger: '有趣', classification: 'XXXX', habitat: '山峰高处' },
  { emoji: '🦄', name: '独角兽', nameEn: 'Unicorn', desc: '纯洁而美丽的生物，银色血液有延续生命的力量，但饮用者将从此被诅咒过着半死不活的生活。幼年独角兽是金色的，两岁时变为银色，四岁时变为纯白色。独角兽更亲近女性。', danger: '无害', classification: 'XXXX', habitat: '禁林深处' },
  { emoji: '🕷️', name: '八眼蜘蛛', nameEn: 'Acromantula', desc: '能说人话的巨型蜘蛛，体长可达15英尺。海格的宠物阿拉戈克就是一只八眼蜘蛛，在禁林深处建立了庞大的蛛群。它们极度惧怕蛇怪，这是它们唯一的天敌。', danger: '极危险', classification: 'XXXXX', habitat: '热带丛林、禁林' },
  { emoji: '👻', name: '摄魂怪', nameEn: 'Dementor', desc: '阿兹卡班的守卫，能吸取人类的快乐和希望。它们在靠近时会使周围变得冰冷、绝望。最可怕的攻击是"摄魂怪之吻"——直接吸取受害者的灵魂。唯一已知的防御方法是守护神咒。', danger: '极危险', classification: 'Non-being', habitat: '阿兹卡班' },
  { emoji: '🧝', name: '家养小精灵', nameEn: 'House-elf', desc: '服务于巫师家族的忠诚生物，拥有强大的魔法但受到奴役契约束缚。只有收到主人赠予的衣物才能获得自由。多比是最著名的家养小精灵，被哈利解放后成为自由精灵。赫敏创建了S.P.E.W（家养小精灵权益促进会）。', danger: '无害', classification: 'Being', habitat: '巫师宅邸' },
  { emoji: '🐍', name: '蛇怪', nameEn: 'Basilisk', desc: '蛇之王，由蛇佬腔使用者将蟾蜍蛋放在母鸡下面孵化而成。直视其眼睛会立即死亡，间接看到（如通过镜子或水面）则只会被石化。公鸡的啼鸣是它的致命弱点。密室中的蛇怪已存活近千年。', danger: '极危险', classification: 'XXXXX', habitat: '密室' },
  { emoji: '🐎', name: '夜骐', nameEn: 'Thestral', desc: '只有见证过死亡的人才能看到的骨瘦如柴的飞马。外表虽然可怕——黑色皮包骨，蝙蝠翅膀，白色无瞳眼睛——但性情温顺且极其聪明。霍格沃茨的马车就是由夜骐牵引的。哈利直到五年级才能看到它们。', danger: '危险', classification: 'XXXX', habitat: '禁林' },
  { emoji: '🧚', name: '康沃尔小仙子', nameEn: 'Cornish Pixie', desc: '蓝色的小型捣蛋精灵，身高约8英寸，非常吵闹且喜欢制造混乱。洛哈特在第一堂黑魔法防御术课上释放了一箱小仙子，结果完全无法控制。赫敏用冻结咒将它们制服。', danger: '烦人', classification: 'XXX', habitat: '康沃尔' },
  { emoji: '🐺', name: '狼人', nameEn: 'Werewolf', desc: '被狼人咬伤后受诅咒的巫师，在满月时会不受控制地变身为狼。芬里尔·格雷伯克是最臭名昭著的狼人，卢平教授是最著名的善良狼人。狼毒药剂可以让狼人在变身时保持理智。', danger: '极危险', classification: 'XXXXX', habitat: '各地' },
  { emoji: '🔥', name: '三头犬', nameEn: 'Fluffy (Three-Headed Dog)', desc: '海格的宠物三头犬路威，负责看守通往魔法石的活板门。它唯一的弱点是音乐——听到音乐就会沉沉睡去。海格从一个希腊人手里买下了它。', danger: '极危险', classification: 'XXXXX', habitat: '霍格沃茨（曾经）' },
  { emoji: '🦎', name: '火螃蟹', nameEn: 'Fire Crab', desc: '外形像一只巨大的乌龟，背壳镶满宝石。当受到威胁时，火螃蟹会从身体后部喷射火焰进行防御。它的壳常被非法用来制作坩埚，在黑市上价值不菲。海格在奇兽饲育学课上曾展示过这种生物。', danger: '危险', classification: 'XXX', habitat: '斐济沿海' },
  { emoji: '🐸', name: '曼德拉草', nameEn: 'Mandrake', desc: '外形像一个丑陋的婴儿与植物的混合体。成年曼德拉草的叫声可以杀死听到的人，幼年的叫声只会使人昏迷。曼德拉草是恢复被石化者的关键药材。二年级时斯普劳特教授让学生们种植和照料曼德拉草——纳威听到它的尖叫后直接昏倒了。', danger: '危险', classification: 'XXX', habitat: '温室栽培' },
  { emoji: '🌊', name: '人鱼', nameEn: 'Merpeople', desc: '居住在霍格沃茨湖底的水生智慧种族，拥有自己的语言和社会结构。他们的歌声在水中优美动听，但在空气中听起来像刺耳的尖叫。在三强争霸赛的第二项任务中，选手需要潜入湖底从人鱼手中解救人质。人鱼以长矛和石器为武器，不受魔法部管辖。', danger: '危险', classification: 'XXXX', habitat: '霍格沃茨湖' },
  { emoji: '🔮', name: '半人马', nameEn: 'Centaur', desc: '上半身为人、下半身为马的智慧生物，精通星象学和占卜术。霍格沃茨禁林中生活着一群半人马——弗伦泽因为背人类（哈利）而被族群放逐，后在霍格沃茨担任占卜课教授。半人马非常骄傲，不愿被归类为"生物"，自认为是"存在"。', danger: '危险', classification: 'XXXX', habitat: '禁林' },
  { emoji: '🪲', name: '嗅嗅', nameEn: 'Niffler', desc: '外形像鸭嘴兽的小型生物，长着黑色绒毛和扁平的嘴巴，对一切闪亮的东西有着不可抗拒的执念。它们的肚子上有一个神奇的袋子（像无底洞一样），能装下远超体型的财宝。在《神奇动物在哪里》中，纽特·斯卡曼德的嗅嗅多次因偷闪亮物品惹麻烦。', danger: '无害', classification: 'XXX', habitat: '英国各地' },
  { emoji: '🐦‍🔥', name: '雷鸟', nameEn: 'Thunderbird', desc: '北美洲的巨型魔法鸟类，能在飞行时制造风暴。雷鸟的尾羽是极为强力的魔杖核心材料，伊尔弗莫尼魔法学校的四大学院之一就以雷鸟命名。弗兰克是纽特·斯卡曼德营救过的一只雷鸟，最终被放归亚利桑那沙漠。', danger: '危险', classification: 'XXXX', habitat: '北美荒野' },
  { emoji: '🐉', name: '角尾龙', nameEn: 'Hungarian Horntail', desc: '最危险的龙种之一，也是已知所有龙中最凶猛的。匈牙利树蜂龙拥有铜色的角、蝙蝠般的翅膀和带刺的尾巴，能喷出50英尺远的火焰。哈利在三强争霸赛第一项任务中面对的就是一头匈牙利树蜂龙——他用飞行技巧和召唤来的火弩箭与其周旋。', danger: '极危险', classification: 'XXXXX', habitat: '匈牙利山地' },
]

export default function Creatures() {
  useDocumentHead({
    title: '🐉 魔法生物',
    titleEn: 'Magical Creatures — Fantastic Beasts Encyclopedia',
    description: '魔法世界生物图鉴 — 龙、凤凰、独角兽、摄魂怪等魔法生物的分级、习性与故事。',
    descriptionEn: 'Encyclopedic guide to magical creatures — Dragons, Phoenixes, Unicorns, Dementors & more. Classifications, behaviors & stories from the Wizarding World.',
    keywords: '哈利波特生物,魔法生物,龙,凤凰,独角兽,摄魂怪,夜骐',
    keywordsEn: 'magical creatures,Fantastic Beasts,Dragons,Phoenix,Unicorn,Dementor,Thestral,Harry Potter',
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const dangers = ['all', '极危险', '危险', '有趣', '无害', '烦人']

  const filtered = creatures.filter(c => {
    const matchesSearch = search === '' ||
      c.name.includes(search) ||
      c.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      c.desc.includes(search)
    const matchesDanger = filter === 'all' || c.danger === filter
    return matchesSearch && matchesDanger
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">🐉 魔法生物</h1>
      <p className="page-subtitle">从龙到独角兽，探索魔法世界中最神奇的生物</p>

      {/* 统计面板 */}
      <StatsPanel stats={[
        { label: '收录生物', value: `${creatures.length} 种`, icon: '🐉' },
        { label: '极危险', value: `${creatures.filter(c => c.danger === '极危险').length} 种`, icon: '⚠️' },
        { label: '危险级别', value: '5 级', icon: '📊' },
        { label: 'XXXXX级', value: `${creatures.filter(c => c.classification === 'XXXXX').length} 种`, icon: '💀' },
      ]} />

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔮 搜索生物名称..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-bar">
        {dangers.map(d => (
          <button
            key={d}
            className={`filter-btn ${filter === d ? 'active' : ''}`}
            onClick={() => setFilter(d)}
          >
            {d === 'all' ? '✨ 全部' : d === '极危险' ? '💀 极危险' : d === '危险' ? '⚠️ 危险' : d === '有趣' ? '🤔 有趣' : d === '无害' ? '🕊️ 无害' : '😤 烦人'}
          </button>
        ))}
      </div>

      <div className="spells-grid">
        {filtered.map((creature, i) => (
          <div key={i} className="creature-card" style={{ borderColor: 'rgba(212,168,67,0.15)' }}>
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
              {creature.habitat && (
                <div style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '4px' }}>📍 栖息地：{creature.habitat}</div>
              )}
              <p className="spell-desc">{creature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
          <span style={{ fontSize: '3rem' }}>🔮</span>
          <p style={{ marginTop: 16 }}>没有找到匹配的魔法生物...</p>
        </div>
      )}

      <div className="section-info-box">
        <p>🐉 共收录 <strong>{creatures.length}</strong> 种魔法生物，按魔法部分级标准分类</p>
      </div>

      <WikiCrossLinks currentPath="/world/creatures" />
    </div>
  )
}
