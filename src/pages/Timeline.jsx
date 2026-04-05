import { characters } from '../data/characters'

function getAllEvents() {
  const events = []

  // 从人物数据收集
  characters.forEach(char => {
    char.timeline.forEach(item => {
      events.push({
        year: item.year,
        event: item.event,
        character: char.name,
        avatar: char.avatar,
        charId: char.id,
        source: 'character',
      })
    })
  })

  // 从书籍数据补充重大事件
  const bookEvents = [
    { year: 1926, event: '汤姆·马沃罗·里德尔（伏地魔）出生', avatar: '🐍' },
    { year: 1938, event: '邓布利多造访孤儿院的汤姆·里德尔', avatar: '🧙' },
    { year: 1943, event: '密室第一次被打开，桃金娘被杀', avatar: '👻' },
    { year: 1970, event: '第一次巫师战争爆发', avatar: '⚔️' },
    { year: 1979, event: '预言被做出——"拥有打败黑魔王力量的人即将降临"', avatar: '🔮' },
    { year: 1980, event: '哈利·波特和纳威·隆巴顿出生', avatar: '⚡' },
    { year: 1981, event: '伏地魔杀害波特夫妇，哈利幸存，伏地魔第一次倒台', avatar: '⚡' },
    { year: 1992, event: '哈利发现魔法石，阻止伏地魔的第一次复活企图', avatar: '💎' },
    { year: 1993, event: '密室被打开，蛇怪袭击学生，哈利摧毁汤姆·里德尔的日记', avatar: '📔' },
    { year: 1994, event: '小天狼星·布莱克逃出阿兹卡班，真相大白', avatar: '🐕' },
    { year: 1995, event: '三强争霸赛举行，伏地魔利用哈利的血复活', avatar: '🔥' },
    { year: 1996, event: '邓布利多军成立，神秘事务司之战', avatar: '⚔️' },
    { year: 1997, event: '邓布利多在天文塔牺牲，哈利踏上寻找魂器之旅', avatar: '🌟' },
    { year: 1998, event: '霍格沃茨大战，伏地魔被最终击败', avatar: '⚡' },
    { year: 2017, event: '哈利送儿子阿不思·西弗勒斯·波特前往霍格沃茨', avatar: '🚂' },
  ]

  bookEvents.forEach(e => {
    // 避免完全重复
    if (!events.some(ex => ex.year === e.year && ex.event === e.event)) {
      events.push({ ...e, source: 'world' })
    }
  })

  events.sort((a, b) => a.year - b.year)
  return events
}

export default function Timeline() {
  const events = getAllEvents()
  const grouped = {}
  events.forEach(e => {
    if (!grouped[e.year]) grouped[e.year] = []
    grouped[e.year].push(e)
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">⏳ 魔法时间线</h1>
      <p className="page-subtitle">从1881年到2017年——魔法世界的百年大事记</p>

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div className="timeline">
          {Object.entries(grouped).map(([year, items]) => (
            <div key={year} className="timeline-item" style={{ paddingBottom: 32 }}>
              <div className="timeline-year" style={{ fontSize: '1.2rem', marginBottom: 12 }}>
                {year}年
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {items.map((item, i) => (
                  <div key={i} className="timeline-event-card">
                    <span className="timeline-event-avatar">{item.avatar}</span>
                    <div>
                      {item.character && (
                        <div className="timeline-event-char">{item.character}</div>
                      )}
                      <div className="timeline-event">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
