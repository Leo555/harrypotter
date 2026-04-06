import { Link } from 'react-router-dom'
import { useState } from 'react'
import useDocumentHead from '../hooks/useDocumentHead'
import StatsPanel from '../components/StatsPanel'
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

const bookYears = {
  1: '1997', 2: '1998', 3: '1999', 4: '2000',
  5: '2003', 6: '2005', 7: '2007',
}

export default function ReaderShelf() {
  const [lang, setLang] = useState(() => localStorage.getItem('hp-reader-lang') || 'en')

  const toggleLang = (newLang) => {
    setLang(newLang)
    localStorage.setItem('hp-reader-lang', newLang)
  }

  useDocumentHead({
    title: '📖 原著阅读器 — 书架',
    titleEn: 'Online Reader — Harry Potter Book Shelf',
    description: '在线阅读哈利波特全系列七部原著，支持中文译本和英文原版，沉浸式阅读体验。',
    descriptionEn: 'Read all 7 Harry Potter books online — Chinese translation & English original available. Immersive reading experience with chapter navigation.',
    keywords: '哈利波特在线阅读,原著阅读器,Harry Potter,英文原版,中文版',
    keywordsEn: 'read Harry Potter online,Harry Potter books,English original,Chinese translation,online reader',
  })

  return (
    <div className="container fade-in">
      {/* 页面头部 */}
      <div className="reader-shelf-hero">
        <div className="reader-shelf-hero-icon">📖</div>
        <h1 className="reader-shelf-title">原著阅读器</h1>
        <p className="reader-shelf-subtitle">翻开羊皮纸，重新走进那个魔法世界</p>

        {/* 语言切换 */}
        <div className="reader-lang-switcher">
          <button
            className={`reader-lang-btn ${lang === 'cn' ? 'active' : ''}`}
            onClick={() => toggleLang('cn')}
          >
            🇨🇳 中文译本
          </button>
          <button
            className={`reader-lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => toggleLang('en')}
          >
            🇬🇧 英文原版
          </button>
        </div>
      </div>

      {/* 统计信息 */}
      <StatsPanel compact stats={[
        { label: '原著总数', value: '7 部', icon: '📚' },
        { label: '总章节数', value: `${Object.values(chapterNames).reduce((a, b) => a + b.length, 0)} 章`, icon: '📑' },
        { label: '出版年份', value: '1997-2007', icon: '📅' },
        { label: '阅读语言', value: lang === 'cn' ? '中文译本' : '英文原版', icon: lang === 'cn' ? '🇨🇳' : '🇬🇧' },
      ]} />

      {/* 书架 */}
      <div className="reader-shelf-grid">
        {[1, 2, 3, 4, 5, 6, 7].map(num => {
          const bookInfo = books.find(b => b.number === num)
          return (
            <div
              key={num}
              className="reader-book-card"
              style={{ '--book-color': bookColors[num] }}
            >
              {/* 书籍封面区域 */}
              <div className="reader-book-cover-section">
                <div className="reader-book-spine" />
                <div className="reader-book-cover">
                  {bookInfo?.coverImage ? (
                    <img loading="lazy" src={bookInfo.coverImage} alt={bookTitles[num]} className="reader-book-cover-img" />
                  ) : (
                    <span className="reader-book-cover-emoji">{bookCovers[num]}</span>
                  )}
                </div>
                <div className="reader-book-number">第{num}部</div>
              </div>

              {/* 书籍信息区域 */}
              <div className="reader-book-info">
                <h3 className="reader-book-title">{bookTitles[num]}</h3>
                <div className="reader-book-title-en">{bookTitlesEn[num]}</div>
                <p className="reader-book-desc">{bookDescriptions[num]}</p>

                <div className="reader-book-meta">
                  <span className="reader-book-meta-item">
                    📑 {chapterNames[num]?.length || 0} 章
                  </span>
                  <span className="reader-book-meta-item">
                    📅 {bookYears[num]}
                  </span>
                </div>

                {/* 操作按钮 */}
                <div className="reader-book-actions">
                  <Link
                    to={`/reader/${num}`}
                    className="reader-book-read-btn"
                  >
                    <span className="reader-book-read-btn-icon">📖</span>
                    {lang === 'cn' ? '开始中文阅读' : '开始英文阅读'}
                    <span className="reader-book-read-arrow">→</span>
                  </Link>
                  <Link
                    to={`/books/${bookInfo?.id || ''}`}
                    className="reader-book-wiki-btn"
                  >
                    📚 百科
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* 阅读提示 */}
      <div className="reader-tips-card">
        <h3 className="reader-tips-title">📝 阅读提示</h3>
        <div className="reader-tips-grid">
          <div className="reader-tip-item">
            <span className="reader-tip-icon">⌨️</span>
            <span>使用方向键 ← → 翻页</span>
          </div>
          <div className="reader-tip-item">
            <span className="reader-tip-icon">🔤</span>
            <span>支持字号 12-24px 调节</span>
          </div>
          <div className="reader-tip-item">
            <span className="reader-tip-icon">📑</span>
            <span>点击章节名打开目录</span>
          </div>
          <div className="reader-tip-item">
            <span className="reader-tip-icon">🌐</span>
            <span>支持中文/英文随时切换</span>
          </div>
        </div>
      </div>
    </div>
  )
}
