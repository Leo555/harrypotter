import { useState } from 'react'

export default function PhotoGallery({ photos, characterName }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  if (!photos || photos.length === 0) return null

  return (
    <>
      <div className="gallery-grid">
        {photos.map((photo, i) => (
          <div
            key={photo.id || i}
            onClick={() => setSelectedPhoto(photo)}
            className="gallery-card hover-lift"
            style={{
              background: `linear-gradient(135deg, ${photo.colors?.[0] || '#2d3436'}, ${photo.colors?.[1] || '#636e72'})`,
            }}
          >
            {/* 场景装饰 */}
            <div className="gallery-card-light" />

            {/* 电影胶片边框效果 */}
            <div className="gallery-filmstrip-top" />
            <div className="gallery-filmstrip-bottom" />

            {/* 场景信息 */}
            <div className="gallery-scene-info">
              <div className="gallery-scene-movie">
                🎬 《{photo.movie}》{photo.year && ` · ${photo.year}`}
              </div>
              <div className="gallery-scene-title">{photo.scene}</div>
            </div>

            {/* 氛围标签 */}
            {photo.mood && (
              <div className="gallery-mood-tag">{photo.mood}</div>
            )}
          </div>
        ))}
      </div>

      {/* 灯箱 */}
      {selectedPhoto && (
        <div className="gallery-lightbox" onClick={() => setSelectedPhoto(null)}>
          <div className="gallery-lightbox-panel" onClick={e => e.stopPropagation()}>
            {/* 大图展示 */}
            <div
              className="gallery-lightbox-hero"
              style={{
                background: `linear-gradient(135deg, ${selectedPhoto.colors?.[0] || '#2d3436'}, ${selectedPhoto.colors?.[1] || '#636e72'})`,
              }}
            >
              <div className="gallery-lightbox-light" />
              <div className="gallery-lightbox-center">
                <div className="gallery-lightbox-emoji">🎬</div>
                <div className="gallery-lightbox-scene">{selectedPhoto.scene}</div>
              </div>
            </div>

            {/* 详情栏 */}
            <div className="gallery-lightbox-bar">
              <div>
                <div className="gallery-lightbox-char">{characterName}</div>
                <div className="gallery-lightbox-movie">
                  《哈利·波特与{selectedPhoto.movie}》· {selectedPhoto.year}
                </div>
              </div>
              {selectedPhoto.mood && (
                <span className="gallery-lightbox-mood">{selectedPhoto.mood}</span>
              )}
            </div>
          </div>

          {/* 关闭按钮 */}
          <button
            onClick={() => setSelectedPhoto(null)}
            className="gallery-close-btn"
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
                className="gallery-nav-btn gallery-nav-prev"
              >
                ←
              </button>
              <button
                onClick={e => {
                  e.stopPropagation()
                  const idx = photos.findIndex(p => p.id === selectedPhoto.id)
                  setSelectedPhoto(photos[(idx + 1) % photos.length])
                }}
                className="gallery-nav-btn gallery-nav-next"
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
