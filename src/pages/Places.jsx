import { Link } from 'react-router-dom'

const places = [
  { emoji: '🏰', name: '霍格沃茨魔法学校', nameEn: 'Hogwarts School', location: '苏格兰高地', type: '学校', desc: '全世界最著名的魔法学校，由四位伟大巫师于约1000年前创建。城堡拥有142道楼梯（其中有些会移动），无数密室和秘道。对麻瓜来说，它看起来只是一片危险的废墟。' },
  { emoji: '🏘️', name: '对角巷', nameEn: 'Diagon Alley', location: '伦敦', type: '商业区', desc: '英国巫师的商业中心，隐藏在破釜酒吧后面。通过敲击特定的砖块可以进入。这里有奥利凡德魔杖店、古灵阁巫师银行、丽痕书店等著名商铺。' },
  { emoji: '🏦', name: '古灵阁巫师银行', nameEn: 'Gringotts', location: '对角巷', type: '银行', desc: '由妖精经营的巫师银行，是魔法世界中最安全的地方之一（除了霍格沃茨）。地下金库由地下矿车连接，并有龙看守最高安全等级的金库。' },
  { emoji: '🏚️', name: '翻倒巷', nameEn: 'Knockturn Alley', location: '伦敦', type: '商业区', desc: '对角巷旁的一条阴暗小巷，专售黑魔法物品。博金-博克商店是这里最著名的店铺，马尔福家经常光顾此处。' },
  { emoji: '🚂', name: '九又四分之三站台', nameEn: 'Platform 9¾', location: '伦敦国王十字车站', type: '交通枢纽', desc: '隐藏在9号和10号站台之间的魔法站台，是霍格沃茨特快列车的始发站。巫师需要直接穿过两站台之间的隔墙才能到达。' },
  { emoji: '🏠', name: '陋居', nameEn: 'The Burrow', location: '英格兰德文郡', type: '住宅', desc: '韦斯莱家族的住所，一栋看起来摇摇欲坠、由魔法支撑的多层歪斜建筑。虽然简陋但充满温暖和爱，是哈利心目中的第一个真正的家。' },
  { emoji: '🏢', name: '魔法部', nameEn: 'Ministry of Magic', location: '伦敦地下', type: '政府机构', desc: '英国魔法界的政府机关，位于伦敦地下。入口之一是一个旧电话亭，拨打62442（MAGIC）即可进入。内部有预言厅、神秘事务司等重要部门。' },
  { emoji: '⛓️', name: '阿兹卡班', nameEn: 'Azkaban', location: '北海小岛', type: '监狱', desc: '巫师世界最恐怖的监狱，位于北海中一座荒凉的小岛上。曾由摄魂怪看守，囚犯在其中会丧失一切快乐的记忆。小天狼星是已知唯一逃脱者。' },
  { emoji: '🏡', name: '格里莫广场12号', nameEn: '12 Grimmauld Place', location: '伦敦', type: '住宅/总部', desc: '布莱克家族的祖宅，后成为凤凰社总部。被忠诚赤胆咒保护，只有知道地址的人才能看到它。房子里住着小精灵克利切和布莱克夫人的尖叫画像。' },
  { emoji: '🌳', name: '禁林', nameEn: 'Forbidden Forest', location: '霍格沃茨校园', type: '森林', desc: '霍格沃茨校园边的危险森林，栖息着独角兽、半人马、八眼蜘蛛、夜骐等生物。学生被严禁进入，但哈利等人多次冒险深入其中。' },
  { emoji: '🏘️', name: '霍格莫德村', nameEn: 'Hogsmeade', location: '苏格兰', type: '村庄', desc: '英国唯一一个纯巫师居住的村庄，靠近霍格沃茨。著名地点包括三把扫帚酒吧、猪头酒吧、蜂蜜公爵糖果店和佐科恶作剧商店。' },
  { emoji: '🌿', name: '戈德里克山谷', nameEn: "Godric's Hollow", location: '英格兰西部', type: '村庄', desc: '戈德里克·格兰芬多的出生地，也是波特一家曾经的住所。1981年万圣节，伏地魔在此杀害了詹姆和莉莉·波特，但被年幼的哈利所击败。' },
]

export default function Places() {
  return (
    <div className="container fade-in">
      <h1 className="page-title">🗺️ 地点百科</h1>
      <p className="page-subtitle">从霍格沃茨到对角巷，走遍魔法世界的每一个角落</p>

      <div className="spells-grid">
        {places.map((place, i) => (
          <div key={i} className="spell-card" style={{ borderColor: 'rgba(212,168,67,0.15)' }}>
            <div className="spell-card-header">
              <span className="spell-icon">{place.emoji}</span>
              <div>
                <h3 className="spell-name">{place.name}</h3>
                <div className="spell-name-en">{place.nameEn}</div>
              </div>
            </div>
            <div className="spell-card-body">
              <div className="spell-meta">
                <span className="spell-type" style={{
                  background: 'rgba(212,168,67,0.12)',
                  color: 'var(--color-gold)',
                  borderColor: 'rgba(212,168,67,0.25)',
                }}>
                  {place.type}
                </span>
                <span className="spell-category">📍 {place.location}</span>
              </div>
              <p className="spell-desc">{place.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="section-info-box">
        <p>🗺️ 共收录 <strong>{places.length}</strong> 个魔法世界著名地点，更多地点持续更新中...</p>
      </div>
    </div>
  )
}
