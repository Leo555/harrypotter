// 根据场景关键词匹配装饰emoji
function getSceneEmoji(scene, mood) {
  const keywords = [
    [/飞行|扫帚|魁地奇|飞贼|火弩箭/, '🧹'],
    [/决斗|战斗|战争|对决|大战|攻击/, '⚔️'],
    [/魔杖|施咒|咒语|守护神/, '🪄'],
    [/死|牺牲|坠落|永别|告别|墓|帷幕/, '🕯️'],
    [/龙|诺伯特/, '🐉'],
    [/蛇|密室|蛇怪/, '🐍'],
    [/变身|狼人|阿尼马格斯/, '🐺'],
    [/舞会|美丽|惊艳/, '💃'],
    [/列车|火车|特快/, '🚂'],
    [/水下|湖|人鱼/, '🌊'],
    [/禁林|森林/, '🌲'],
    [/记忆|冥想盆/, '💭'],
    [/药水|药剂|魔药|毒液/, '🧪'],
    [/书|课堂|教|学/, '📖'],
    [/剑|格兰芬多之剑/, '🗡️'],
    [/棋/, '♟️'],
    [/自由|逃|飞出|越狱/, '🕊️'],
    [/烟花|恶作剧|把戏/, '🎆'],
    [/送|礼物|蛋糕/, '🎁'],
    [/吻|爱|甜蜜/, '💕'],
    [/眼镜|修好/, '👓'],
    [/摄魂怪/, '👤'],
    [/古灵阁|金库/, '🏦'],
    [/魔法石|石头/, '💎'],
    [/审讯|拷问/, '⛓️'],
    [/袜子/, '🧦'],
  ]
  for (const [re, emoji] of keywords) {
    if (re.test(scene)) return emoji
  }
  const moodMap = {
    '勇气': '⚡', '勇敢': '⚡', '英雄': '⚡',
    '悲痛': '💧', '悲壮': '💧', '心碎': '💧',
    '温暖': '✨', '快乐': '✨', '欢乐': '✨',
    '恐怖': '💀', '邪恶': '💀', '疯狂': '💀',
    '智慧': '🌟', '深邃': '🌟', '超脱': '🌟',
    '搞笑': '😄', '尴尬': '😅',
  }
  return moodMap[mood] || '🎬'
}

export default function PhotoGallery({ photos }) {
  if (!photos || photos.length === 0) return null

  return (
    <div className="gallery-grid">
      {photos.map((photo, i) => (
        <div
          key={photo.id || i}
          className="gallery-card hover-lift"
          style={{
            background: `linear-gradient(135deg, ${photo.colors?.[0] || '#2d3436'}, ${photo.colors?.[1] || '#636e72'})`,
          }}
        >
          <div className="gallery-card-light" />
          <div className="gallery-scene-emoji">
            {getSceneEmoji(photo.scene, photo.mood)}
          </div>
          <div className="gallery-filmstrip-top" />
          <div className="gallery-filmstrip-bottom" />
          <div className="gallery-scene-info">
            <div className="gallery-scene-movie">
              🎬 《{photo.movie}》{photo.year && ` · ${photo.year}`}
            </div>
            <div className="gallery-scene-title">{photo.scene}</div>
          </div>
          {photo.mood && (
            <div className="gallery-mood-tag">{photo.mood}</div>
          )}
        </div>
      ))}
    </div>
  )
}
