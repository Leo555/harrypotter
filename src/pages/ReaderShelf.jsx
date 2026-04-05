import { Link } from 'react-router-dom'
import { useState } from 'react'
import useDocumentHead from '../hooks/useDocumentHead'
import { bookTitles, bookTitlesEn, bookCovers, bookColors, chapterNames } from '../data/bookLoader'
import books from '../data/books'

const bookDescriptions = {
  1: '在姨妈家饱受欺凌的哈利·波特，在11岁生日那天踏入了魔法世界...',
  2: '密室被打开了，霍格沃茨的学生接连被石化...',
  3: '杀人犯小天狼星从阿兹卡班越狱，摄魂怪包围了霍格沃茨...',
  4: '三强争霸赛、火焰杯的选择、伏地魔的复活...',
  5: '凤凰社重建、邓布利多军、神秘事务司之战...',
  6: '魂器的秘密、混血王子的课本、天文塔上的悲剧...',
  7: '死亡圣器的传说、霍格沃茨大战、最终的对决...',
}

export default function ReaderShelf() {
  const [lang, setLang] = useState(() => localStorage.getItem('hp-reader-lang') || 'en')

  const toggleLang = (newLang) => {
    setLang(newLang)
    localStorage.setItem('hp-reader-lang', newLang)
  }

  useDocumentHead({
    title: '📖 原著阅读器 — 书架',
    description: '在线阅读哈利波特全系列七部原著，支持中文译本和英文原版，沉浸式阅读体验。',
    keywords: '哈利波特在线阅读,原著阅读器,Harry Potter,英文原版,中文版',
  })

  return (
    <div className="container fade-in">
      <h1 className="page-title">📖 原著阅读器</h1>
      <p className="page-subtitle">翻开羊皮纸，重新走进那个魔法世界</p>

      {/* 语言切换 */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '28px',
      }}>
        <button
          onClick={() => toggleLang('cn')}
          style={{
            padding: '10px 28px',
            borderRadius: '24px',
            border: lang === 'cn' ? '2px solid var(--color-gold)' : '1px solid rgba(212, 168, 67, 0.2)',
            background: lang === 'cn' ? 'rgba(212, 168, 67, 0.15)' : 'rgba(30, 30, 60, 0.5)',
            color: lang === 'cn' ? 'var(--color-gold)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: '0.92rem',
            fontWeight: 700,
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          🇨🇳 中文译本
        </button>
        <button
          onClick={() => toggleLang('en')}
          style={{
            padding: '10px 28px',
            borderRadius: '24px',
            border: lang === 'en' ? '2px solid var(--color-gold)' : '1px solid rgba(212, 168, 67, 0.2)',
            background: lang === 'en' ? 'rgba(212, 168, 67, 0.15)' : 'rgba(30, 30, 60, 0.5)',
            color: lang === 'en' ? 'var(--color-gold)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: '0.92rem',
            fontWeight: 700,
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          🇬🇧 英文原版
        </button>
      </div>

      {/* 统计信息 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '12px',
        marginBottom: '36px',
      }}>
        {[
          { label: '原著总数', value: '7 部', icon: '📚' },
          { label: '总章节数', value: `${Object.values(chapterNames).reduce((a, b) => a + b.length, 0)} 章`, icon: '📑' },
          { label: '出版年份', value: '1997-2007', icon: '📅' },
          { label: '阅读语言', value: lang === 'cn' ? '中文译本' : '英文原版', icon: lang === 'cn' ? '🇨🇳' : '🇬🇧' },
        ].map((stat, i) => (
          <div key={i} style={{
            textAlign: 'center',
            padding: '16px 12px',
            background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.5), rgba(20, 20, 50, 0.7))',
            borderRadius: '10px',
            border: '1px solid rgba(212, 168, 67, 0.1)',
          }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{stat.icon}</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-gold)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 书架 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px',
      }}>
        {[1, 2, 3, 4, 5, 6, 7].map(num => (
          <Link
            key={num}
            to={`/reader/${num}`}
            style={{
              display: 'block',
              textDecoration: 'none',
              color: 'inherit',
              background: 'linear-gradient(135deg, rgba(30, 30, 60, 0.5), rgba(20, 20, 50, 0.7))',
              borderRadius: '14px',
              border: '1px solid rgba(212, 168, 67, 0.12)',
              padding: '24px',
              transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = `${bookColors[num]}88`
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = `0 8px 24px ${bookColors[num]}22`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(212, 168, 67, 0.12)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
              <div style={{
                fontSize: '3rem',
                width: '64px',
                height: '80px',
                borderRadius: '8px',
                background: `${bookColors[num]}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: `2px solid ${bookColors[num]}44`,
                overflow: 'hidden',
              }}>
                {books.find(b => b.number === num)?.coverImage ? (
                  <img src={books.find(b => b.number === num).coverImage} alt={bookTitles[num]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  bookCovers[num]
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: '0.7rem',
                  color: bookColors[num],
                  marginBottom: '4px',
                  fontWeight: 600,
                  opacity: 0.8,
                }}>
                  第{num}部 · {chapterNames[num]?.length || 0} 章
                </div>
                <h3 style={{
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--color-text)',
                  margin: '0 0 4px',
                  lineHeight: 1.3,
                }}>
                  {bookTitles[num]}
                </h3>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-secondary)',
                  marginBottom: '8px',
                  fontStyle: 'italic',
                  opacity: 0.7,
                }}>
                  {bookTitlesEn[num]}
                </div>
                <p style={{
                  fontSize: '0.82rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {bookDescriptions[num]}
                </p>
              </div>
            </div>
            <div style={{
              marginTop: '14px',
              display: 'flex',
              gap: '10px',
            }}>
              <div style={{
                flex: 1,
                padding: '8px 14px',
                background: `${bookColors[num]}15`,
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '0.82rem',
                color: 'var(--color-gold)',
                fontWeight: 500,
              }}>
                📖 {lang === 'cn' ? '开始中文阅读' : '开始英文阅读'}
              </div>
              <Link
                to={`/books/${books.find(b => b.number === num)?.id || ''}`}
                onClick={e => e.stopPropagation()}
                style={{
                  padding: '8px 14px',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '0.82rem',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.3s',
                  flexShrink: 0,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.color = 'var(--color-gold)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
              >
                📚 百科
              </Link>
            </div>
          </Link>
        ))}
      </div>

      {/* 阅读提示 */}
      <div style={{
        marginTop: '40px',
        padding: '20px 24px',
        background: 'rgba(212, 168, 67, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(212, 168, 67, 0.12)',
      }}>
        <h3 style={{ fontSize: '0.9rem', color: 'var(--color-gold)', marginBottom: '10px' }}>
          📝 阅读提示
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px',
          fontSize: '0.82rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
        }}>
          <div>⌨️ 使用方向键 ← → 翻页</div>
          <div>🔤 支持字号 12-24px 调节</div>
          <div>📑 点击章节名打开目录</div>
          <div>🌐 支持中文/英文随时切换</div>
        </div>
      </div>
    </div>
  )
}
