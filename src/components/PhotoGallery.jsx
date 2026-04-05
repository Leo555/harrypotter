import { useState } from 'react'

export default function PhotoGallery({ photos, characterName }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  if (!photos || photos.length === 0) return null

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '12px',
      }}>
        {photos.map((photo, i) => (
          <div
            key={photo.id || i}
            onClick={() => setSelectedPhoto(photo)}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              cursor: 'pointer',
              aspectRatio: '16/10',
              background: `linear-gradient(135deg, ${photo.colors?.[0] || '#2d3436'}, ${photo.colors?.[1] || '#636e72'})`,
              border: '1px solid rgba(212,175,55,0.15)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)'
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)'
            }}
          >
            {/* 场景装饰 */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.08) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />

            {/* 电影胶片边框效果 */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'repeating-linear-gradient(90deg, rgba(255,215,0,0.3) 0px, rgba(255,215,0,0.3) 8px, transparent 8px, transparent 14px)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'repeating-linear-gradient(90deg, rgba(255,215,0,0.3) 0px, rgba(255,215,0,0.3) 8px, transparent 8px, transparent 14px)',
            }} />

            {/* 场景信息 */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '24px 12px 10px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            }}>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--color-gold)',
                marginBottom: '3px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                🎬 《{photo.movie}》{photo.year && ` · ${photo.year}`}
              </div>
              <div style={{
                fontSize: '0.78rem',
                color: '#fff',
                lineHeight: '1.3',
                fontWeight: '500',
              }}>
                {photo.scene}
              </div>
            </div>

            {/* 氛围标签 */}
            {photo.mood && (
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                padding: '2px 8px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                fontSize: '0.65rem',
                color: 'var(--color-gold)',
                border: '1px solid rgba(212,175,55,0.3)',
              }}>
                {photo.mood}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 灯箱 */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: '800px',
              width: '90%',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid rgba(212,175,55,0.3)',
            }}
          >
            {/* 大图展示 */}
            <div style={{
              aspectRatio: '16/9',
              background: `linear-gradient(135deg, ${selectedPhoto.colors?.[0] || '#2d3436'}, ${selectedPhoto.colors?.[1] || '#636e72'})`,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.1) 0%, transparent 60%)',
              }} />

              {/* 中央场景文字 */}
              <div style={{
                textAlign: 'center',
                padding: '40px',
                zIndex: 1,
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎬</div>
                <div style={{
                  fontSize: '1.3rem',
                  color: '#fff',
                  fontWeight: '600',
                  lineHeight: '1.5',
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                }}>
                  {selectedPhoto.scene}
                </div>
              </div>
            </div>

            {/* 详情栏 */}
            <div style={{
              padding: '16px 20px',
              background: 'var(--color-dark)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              <div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-parchment)', fontWeight: '600' }}>
                  {characterName}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-gold)', marginTop: '2px' }}>
                  《哈利·波特与{selectedPhoto.movie}》· {selectedPhoto.year}
                </div>
              </div>
              {selectedPhoto.mood && (
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  background: 'rgba(212,175,55,0.15)',
                  color: 'var(--color-gold)',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(212,175,55,0.3)',
                }}>
                  {selectedPhoto.mood}
                </span>
              )}
            </div>
          </div>

          {/* 关闭按钮 */}
          <button
            onClick={() => setSelectedPhoto(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid rgba(212,175,55,0.3)',
              background: 'rgba(0,0,0,0.5)',
              color: 'var(--color-gold)',
              fontSize: '1.2rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          >
            ✕
          </button>

          {/* 导航按钮 */}
          {photos.length > 1 && (
            <>
              <button
                onClick={e => {
                  e.stopPropagation()
                  const idx = photos.findIndex(p => p.id === selectedPhoto.id)
                  setSelectedPhoto(photos[(idx - 1 + photos.length) % photos.length])
                }}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid rgba(212,175,55,0.3)',
                  background: 'rgba(0,0,0,0.5)',
                  color: 'var(--color-gold)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ←
              </button>
              <button
                onClick={e => {
                  e.stopPropagation()
                  const idx = photos.findIndex(p => p.id === selectedPhoto.id)
                  setSelectedPhoto(photos[(idx + 1) % photos.length])
                }}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  border: '1px solid rgba(212,175,55,0.3)',
                  background: 'rgba(0,0,0,0.5)',
                  color: 'var(--color-gold)',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                →
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
