import { Link } from 'react-router-dom'

const magicItems = [
  { emoji: '📔', name: '汤姆·里德尔的日记', nameEn: "Tom Riddle's Diary", type: '魂器', desc: '伏地魔创造的第一个魂器，记录着年少时代的里德尔。它曾控制金妮·韦斯莱打开密室，被哈利用蛇怪的毒牙摧毁。' },
  { emoji: '💍', name: '马沃罗·冈特的戒指', nameEn: "Marvolo Gaunt's Ring", type: '魂器/圣器', desc: '冈特家族的传家宝，内嵌复活石。被邓布利多找到并摧毁，但他也因此受了致命诅咒。' },
  { emoji: '🏆', name: '赫奇帕奇的金杯', nameEn: "Hufflepuff's Cup", type: '魂器', desc: '赫尔加·赫奇帕奇的遗物，被存放在贝拉特里克斯·莱斯特兰奇在古灵阁的金库中。' },
  { emoji: '👑', name: '拉文克劳的冠冕', nameEn: "Ravenclaw's Diadem", type: '魂器', desc: '罗伊纳·拉文克劳的冠冕，据说能增强佩戴者的智慧。被伏地魔藏于有求必应屋中。' },
  { emoji: '🐍', name: '斯莱特林的挂坠盒', nameEn: "Slytherin's Locket", type: '魂器', desc: '萨拉查·斯莱特林的遗物，曾折磨佩戴它的哈利、罗恩和赫敏，最终被罗恩用格兰芬多之剑摧毁。' },
  { emoji: '⚡', name: '哈利·波特（活魂器）', nameEn: 'Harry Potter (Living Horcrux)', type: '魂器', desc: '伏地魔无意中将灵魂碎片嵌入哈利体内，使哈利成为第七个魂器。在禁林中被伏地魔的索命咒"摧毁"。' },
  { emoji: '🪄', name: '老魔杖（接骨木魔杖）', nameEn: 'The Elder Wand', type: '死亡圣器', desc: '三件死亡圣器之一，据说是世界上最强大的魔杖。由死亡本身所造，其忠诚只属于打败前任主人的巫师。' },
  { emoji: '🧥', name: '隐形衣', nameEn: 'Cloak of Invisibility', type: '死亡圣器', desc: '三件死亡圣器之一，波特家族世代相传。与普通隐形衣不同，它永不褪色、永不失效。' },
  { emoji: '💎', name: '复活石', nameEn: 'Resurrection Stone', type: '死亡圣器', desc: '三件死亡圣器之一，能召唤已逝之人的灵魂。哈利在走向禁林面对伏地魔时使用了它。' },
  { emoji: '🗺️', name: '活点地图', nameEn: "Marauder's Map", type: '魔法道具', desc: '由掠夺者（尖头叉子、大脚板、月亮脸、虫尾巴）创造，能显示霍格沃茨内所有人的实时位置。' },
  { emoji: '⏰', name: '时间转换器', nameEn: 'Time-Turner', type: '魔法道具', desc: '能让使用者回到过去的沙漏形装置。赫敏曾用它来上额外的课程，并帮助救出了小天狼星和巴克比克。' },
  { emoji: '🪞', name: '厄里斯魔镜', nameEn: 'Mirror of Erised', type: '魔法道具', desc: '能显示观看者内心最深切渴望的魔镜。邓布利多在镜中看到自己的家人，而哈利看到了他的父母。' },
  { emoji: '🗡️', name: '格兰芬多之剑', nameEn: 'Sword of Gryffindor', type: '传奇物品', desc: '由妖精格里菲克打造的宝剑，能在需要时出现在真正的格兰芬多人面前。它吸收了蛇怪毒液，因此能摧毁魂器。' },
  { emoji: '🧹', name: '火弩箭', nameEn: 'Firebolt', type: '魔法道具', desc: '世界上最快的竞赛飞天扫帚，由小天狼星作为圣诞礼物送给哈利。10秒内可加速到150英里/小时。' },
  { emoji: '📻', name: '韦斯莱飞车', nameEn: "Weasley's Flying Car", type: '魔法道具', desc: '亚瑟·韦斯莱改造的1962年福特英格利亚，可以飞行和隐形。哈利和罗恩曾驾驶它飞往霍格沃茨。' },
]

export default function MagicItems() {
  return (
    <div className="container fade-in">
      <h1 className="page-title">⚗️ 魔法物品</h1>
      <p className="page-subtitle">从死亡圣器到活点地图，魔法世界中最传奇的物品</p>

      <div className="spells-grid">
        {magicItems.map((item, i) => (
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
            </div>
          </div>
        ))}
      </div>

      <div className="section-info-box">
        <p>⚗️ 共收录 <strong>{magicItems.length}</strong> 件传奇魔法物品，更多物品持续更新中...</p>
      </div>
    </div>
  )
}
