import { useState } from 'react'
import useDocumentHead from '../hooks/useDocumentHead'
import WikiCrossLinks from '../components/WikiCrossLinks'

const places = [
  { emoji: '🏰', name: '霍格沃茨魔法学校', nameEn: 'Hogwarts School', location: '苏格兰高地', type: '学校', desc: '全世界最著名的魔法学校，约于公元990年由戈德里克·格兰芬多、赫尔加·赫奇帕奇、罗伊纳·拉文克劳和萨拉查·斯莱特林四人共同创建。城堡拥有142道楼梯（其中有些会移动）、无数密室和秘道。对麻瓜来说，它看起来只是一片危险的废墟和"禁止入内"的标志。七楼的有求必应室会根据需求变化形态。' },
  { emoji: '🏘️', name: '对角巷', nameEn: 'Diagon Alley', location: '伦敦', type: '商业区', desc: '英国巫师界的商业中心，隐藏在破釜酒吧后面的砖墙之后。用魔杖按特定顺序敲击砖块即可进入。这里有奥利凡德魔杖店（创立于公元前382年）、古灵阁巫师银行、丽痕书店、韦斯莱魔法把戏坊、品质魁地奇用品商店、摩金夫人长袍专卖店等。' },
  { emoji: '🏦', name: '古灵阁巫师银行', nameEn: 'Gringotts', location: '对角巷', type: '银行', desc: '由妖精经营的巫师银行，白色大理石建筑矗立在对角巷最高处。入口处刻有警告诗："来此寻宝者，请你三思而后行。贪得无厌的人，将得到应有的报应。"地下金库由地下矿车连接，高安全等级金库有龙看守。哈利一行曾骑龙逃离古灵阁。' },
  { emoji: '🏚️', name: '翻倒巷', nameEn: 'Knockturn Alley', location: '伦敦', type: '商业区', desc: '对角巷旁的一条阴暗小巷，专售黑魔法物品和可疑商品。博金-博克商店是这里最著名的店铺，年轻时代的伏地魔曾在此工作。消失柜的另一半就在博金-博克店中，德拉科利用它让食死徒入侵霍格沃茨。' },
  { emoji: '🚂', name: '九又四分之三站台', nameEn: 'Platform 9¾', location: '伦敦国王十字车站', type: '交通枢纽', desc: '隐藏在9号和10号站台之间的魔法站台，是霍格沃茨特快列车的始发站。巫师需要直接穿过两站台之间的隔墙才能到达（最好跑着穿过去）。红色的霍格沃茨特快列车每年9月1日上午11点准时发车。多比曾封锁了入口阻止哈利和罗恩。' },
  { emoji: '🏠', name: '陋居', nameEn: 'The Burrow', location: '英格兰德文郡奥特里圣卡奇波尔', type: '住宅', desc: '韦斯莱家族的住所，一栋由魔法支撑的歪歪斜斜的多层建筑。每层好像都是后来加建的，充满了温暖和混乱。厨房有一个神奇的时钟，指针指向家庭成员而非数字。这里的花园里有地精出没。对哈利来说，这是他第一个真正有家的感觉的地方。' },
  { emoji: '🏢', name: '魔法部', nameEn: 'Ministry of Magic', location: '伦敦地下', type: '政府机构', desc: '英国魔法界的政府机关，位于伦敦地下。访客入口是一个旧电话亭，拨打62442（MAGIC）即可进入。大厅中央有一座"魔法即是力量"的喷泉（后被重建）。内部设有魔法法律执行司、神秘事务司（预言厅所在地）、魔法游戏和运动司等部门。' },
  { emoji: '⛓️', name: '阿兹卡班', nameEn: 'Azkaban', location: '北海小岛', type: '监狱', desc: '巫师世界最恐怖的监狱，位于北海中一座冰冷荒凉的小岛上。原由摄魂怪看守，囚犯在其中会丧失一切快乐的记忆，许多人因此发疯。小天狼星是已知第一个越狱成功者（靠阿尼马格斯形态）。伏地魔掌权后释放了大量食死徒囚犯。' },
  { emoji: '🏡', name: '格里莫广场12号', nameEn: '12 Grimmauld Place', location: '伦敦', type: '住宅/总部', desc: '布莱克家族的祖宅，被忠诚赤胆咒保护，只有知道具体地址的人才能看到这栋房子（它会在11号和13号之间挤出来）。后成为凤凰社总部。房内有布莱克夫人永远尖叫的画像、家养小精灵克利切、以及一棵记录血统的家族树挂毯。' },
  { emoji: '🌳', name: '禁林', nameEn: 'Forbidden Forest', location: '霍格沃茨校园', type: '森林', desc: '霍格沃茨校园边的广袤危险森林，栖息着独角兽、半人马（弗伦泽和群落）、八眼蜘蛛（阿拉戈克的后代）、夜骐等神奇生物。学生被严禁进入，但哈利几乎每年都会踏足。这里也是哈利最后走向"赴死"的地方。' },
  { emoji: '🏘️', name: '霍格莫德村', nameEn: 'Hogsmeade', location: '苏格兰', type: '村庄', desc: '英国唯一一个纯巫师居住的村庄，三年级以上学生在周末可以凭许可证前往。著名地点包括三把扫帚酒吧（罗斯默塔夫人经营）、猪头酒吧（邓布利多的弟弟阿不福思经营）、蜂蜜公爵糖果店、佐科恶作剧商店和尖叫棚屋。' },
  { emoji: '🌿', name: '戈德里克山谷', nameEn: "Godric's Hollow", location: '英格兰西部', type: '村庄', desc: '格兰芬多和邓布利多家族的故乡，也是波特一家最后的住所。1981年万圣节之夜，伏地魔在此杀害了詹姆和莉莉·波特。波特家的废墟被保留为纪念碑，村中广场有波特一家三口的雕像。教堂墓地中有肯德拉和阿利安娜·邓布利多的墓碑。' },
  { emoji: '🏥', name: '圣芒戈魔法伤病医院', nameEn: "St Mungo's Hospital", location: '伦敦', type: '医疗机构', desc: '英国魔法世界的主要医院，隐藏在伦敦一家废弃的百货公司——珀斯和道恩精品百货——后面。访客需要对着橱窗里的人体模型说明来意才能进入。医院分为多个科室：魔咒损伤科、魔法生物伤害科、魔药和植物中毒科等。纳威的父母弗兰克和爱丽丝·隆巴顿就长期住在这里的永久损伤科。' },
  { emoji: '🗼', name: '布斯巴顿魔法学院', nameEn: 'Beauxbatons Academy', location: '法国（比利牛斯山脉）', type: '学校', desc: '法国顶级魔法学校，位于比利牛斯山脉中一座华丽的宫殿里。布斯巴顿以其优雅精致著称，学生乘坐由阿布拉克萨斯飞马拉的巨大马车来往。芙蓉·德拉库尔就来自这所学校。校长是女巨人血统的奥林佩·马克西姆夫人，身材几乎和海格一样高大。' },
  { emoji: '⛵', name: '德姆斯特朗学院', nameEn: 'Durmstrang Institute', location: '北欧（具体位置保密）', type: '学校', desc: '北欧著名魔法学校，以教授黑魔法（而非仅仅防御黑魔法）而闻名。学校的位置是严格保密的——学生被禁止告诉任何人学校在哪里。维克多·克鲁姆是德姆斯特朗最著名的学生，前校长卡卡洛夫曾是食死徒。格林德沃也曾在这里就读。' },
  { emoji: '🏖️', name: '贝壳小屋', nameEn: 'Shell Cottage', location: '康沃尔海岸', type: '住宅', desc: '比尔·韦斯莱和芙蓉·德拉库尔的海边小屋，成为了三人组在逃亡途中最重要的避难所。多比在从马尔福庄园营救哈利等人后就死在了这里的花园中。哈利在这里亲手为多比挖掘了坟墓——"这里安葬着多比，一个自由的精灵。"贝壳小屋也是他们策划闯入古灵阁的据点。' },
  { emoji: '🏚️', name: '尖叫棚屋', nameEn: 'Shrieking Shack', location: '霍格莫德', type: '建筑', desc: '被认为是全英国闹鬼最凶的建筑，实际上是邓布利多为卢平建造的变身安全屋。每月满月时卢平穿过打人柳下的秘密通道来到这里变身，痛苦的嚎叫声让居民们以为这里有凶恶的幽灵。这里是哈利第一次见到小天狼星和真相大白的地方，也是斯内普最后被蛇妖娜吉尼杀害的地点。' },
  { emoji: '🕸️', name: '马尔福庄园', nameEn: 'Malfoy Manor', location: '英格兰威尔特郡', type: '住宅', desc: '马尔福家族的豪华庄园，在第二次巫师战争中被伏地魔征用为食死徒总部。地下室关押过奥利凡德先生、卢娜·洛夫古德和拉环等人。赫敏在这里被贝拉特里克斯严刑拷打，多比在营救行动中从这里带走了所有人，但自己被贝拉特里克斯的银刀击中身亡。' },
  { emoji: '🌑', name: '洞穴（魂器藏匿处）', nameEn: 'The Cave', location: '英格兰海岸', type: '秘密地点', desc: '伏地魔在童年时发现的海边洞穴，后来被他用来藏匿斯莱特林的挂坠盒魂器。洞穴入口需要用血才能打开，里面是一个巨大的地下湖，中央小岛上有一个石盆盛满了致命的翠绿色药水。邓布利多必须喝下所有药水才能取出（假的）魂器——这些药水让他重历了最痛苦的记忆，极度虚弱。' },
]

export default function Places() {
  useDocumentHead({
    title: '🗺️ 地点百科',
    description: '魔法世界地点百科 — 霍格沃茨、对角巷、阿兹卡班、九又四分之三站台等经典地点详解。',
    keywords: '哈利波特地点,霍格沃茨,对角巷,阿兹卡班,九又四分之三站台,魔法部',
  })

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const types = [...new Set(places.map(p => p.type))]

  const filtered = places.filter(p => {
    const matchesSearch = search === '' ||
      p.name.includes(search) ||
      p.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.includes(search)
    const matchesType = filter === 'all' || p.type === filter
    return matchesSearch && matchesType
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">🗺️ 地点百科</h1>
      <p className="page-subtitle">从霍格沃茨到对角巷，走遍魔法世界的每一个角落</p>

      {/* 统计面板 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '16px',
        margin: '32px 0',
        padding: '24px',
        background: 'rgba(212,175,55,0.05)',
        borderRadius: '16px',
        border: '1px solid rgba(212,175,55,0.15)',
      }}>
        {[
          { label: '收录地点', value: `${places.length} 个`, icon: '🗺️' },
          { label: '地点类型', value: `${types.length} 种`, icon: '🏷️' },
          { label: '伦敦地区', value: `${places.filter(p => p.location.includes('伦敦')).length} 个`, icon: '🇬🇧' },
          { label: '苏格兰', value: `${places.filter(p => p.location.includes('苏格兰')).length} 个`, icon: '🏴' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.6rem', marginBottom: '4px' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--color-gold)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="🔮 搜索地点名称..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          ✨ 全部
        </button>
        {types.map(t => (
          <button
            key={t}
            className={`filter-btn ${filter === t ? 'active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="spells-grid">
        {filtered.map((place, i) => (
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

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 0', opacity: 0.5 }}>
          <span style={{ fontSize: '3rem' }}>🔮</span>
          <p style={{ marginTop: 16 }}>没有找到匹配的地点...</p>
        </div>
      )}

      <div className="section-info-box">
        <p>🗺️ 共收录 <strong>{places.length}</strong> 个魔法世界著名地点，含详细背景故事</p>
      </div>

      <WikiCrossLinks currentPath="/world/places" />
    </div>
  )
}
