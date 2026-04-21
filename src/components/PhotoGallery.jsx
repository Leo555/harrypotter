import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

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

export default function PhotoGallery({ photos, characterName }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selected])

  if (!photos || photos.length === 0) return null

  return (
    <>
      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <div
            key={photo.id || i}
            className={`gallery-card hover-lift ${photo.image ? 'gallery-card--has-img' : ''}`}
            onClick={() => setSelected(photo)}
            style={photo.image ? {} : {
              background: `linear-gradient(135deg, ${photo.colors?.[0] || '#2d3436'}, ${photo.colors?.[1] || '#636e72'})`,
            }}
          >
            {photo.image ? (
              <>
                <img loading="lazy" src={photo.image} alt={photo.scene} className="gallery-card-real-img" />
                <div className="gallery-card-overlay" style={{
                  background: `linear-gradient(135deg, ${photo.colors?.[0] || '#2d3436'}cc, ${photo.colors?.[1] || '#636e72'}99)`,
                }} />
                <div className="gallery-scene-emoji">
                  {getSceneEmoji(photo.scene, photo.mood)}
                </div>
              </>
            ) : (
              <>
                <div className="gallery-card-light" />
                <div className="gallery-scene-emoji">
                  {getSceneEmoji(photo.scene, photo.mood)}
                </div>
                <div className="gallery-filmstrip-top" />
                <div className="gallery-filmstrip-bottom" />
              </>
            )}
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

      {/* 点击放大遮罩 - portal 到 body */}
      {selected && createPortal(
        <div className="gallery-overlay" onClick={() => setSelected(null)}>
          <div
            className="gallery-overlay-card"
            style={selected.image ? {} : {
              background: `linear-gradient(135deg, ${selected.colors?.[0] || '#2d3436'}, ${selected.colors?.[1] || '#636e72'})`,
            }}
          >
            {selected.image ? (
              <>
                <img src={selected.image} alt={selected.scene} className="gallery-overlay-real-img" />
                <div className="gallery-card-overlay" style={{
                  background: `linear-gradient(135deg, ${selected.colors?.[0] || '#2d3436'}bb, ${selected.colors?.[1] || '#636e72'}88)`,
                  borderRadius: '16px',
                }} />
                <div className="gallery-overlay-emoji">
                  {getSceneEmoji(selected.scene, selected.mood)}
                </div>
              </>
            ) : (
              <>
                <div className="gallery-card-light" />
                <div className="gallery-overlay-emoji">
                  {getSceneEmoji(selected.scene, selected.mood)}
                </div>
              </>
            )}
            <div className="gallery-overlay-info">
              {selected.mood && <span className="gallery-mood-tag">{selected.mood}</span>}
              <div className="gallery-overlay-movie">
                🎬 {characterName && `${characterName} · `}《{selected.movie}》· {selected.year}
              </div>
              <div className="gallery-overlay-scene">{selected.scene}</div>
            </div>
          </div>
          <div className="gallery-overlay-hint">点击任意处关闭</div>
        </div>,
        document.body
      )}
    </>
  )
}
