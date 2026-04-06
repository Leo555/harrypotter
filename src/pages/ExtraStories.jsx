import { useState } from 'react'
import { extraStories, storyCollections, storyCategories } from '../data/extraStories'
import { getEnglishText } from '../data/extraStoriesEn'
import { characters } from '../data/characters'
import useDocumentHead from '../hooks/useDocumentHead'

export default function ExtraStories() {
  useDocumentHead({
    title: '📖 隐秘故事集 — The Hidden Tales',
    titleEn: 'The Hidden Tales - Extra Stories by J.K. Rowling',
    description: 'J.K.罗琳笔下的番外传说 — 人物背景故事、魔法世界设定、霍格沃茨创始人传奇，探索隐藏在原著之外的魔法秘辛。',
    descriptionEn: "Hidden tales from J.K. Rowling — character backstories, Wizarding World lore, Hogwarts founders' legends and secrets beyond the original books.",
    keywords: '隐秘故事集,J.K.罗琳番外,哈利波特设定,霍格沃茨历史,Pottermore',
    keywordsEn: 'Hidden Tales,J.K. Rowling extras,Pottermore stories,Harry Potter lore,Hogwarts history',
  })
  const [selectedCollection, setSelectedCollection] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedStory, setExpandedStory] = useState(null)
  const [expandedChapter, setExpandedChapter] = useState(null)
  const [language, setLanguage] = useState('zh') // 'zh' 中文 | 'en' 英文

  // 筛选故事
  const filteredStories = extraStories.filter(story => {
    const matchCollection = selectedCollection === 'all' ||
      storyCollections.find(c => c.id === selectedCollection)?.stories.includes(story.id)
    const matchCategory = selectedCategory === 'all' || story.category === selectedCategory
    return matchCollection && matchCategory
  })

  // 获取角色信息
  const getCharacter = (id) => characters.find(c => c.id === id)

  // 统计
  const totalChapters = extraStories.reduce((sum, s) => sum + s.chapters.length, 0)

  return (
    <div className="container fade-in">
      <h1 className="page-title">📖 The Hidden Tales</h1>
      <p className="page-subtitle">隐秘故事集 — J.K.罗琳笔下的番外传说</p>

      {/* 统计栏 + 语言切换 */}
      <div className="stories-stats">
        <div className="stat-item">
          <span className="stat-number">{storyCollections.length}</span>
          <span className="stat-label">故事合集</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{extraStories.length}</span>
          <span className="stat-label">作品</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{totalChapters}</span>
          <span className="stat-label">故事篇章</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">2007-2016</span>
          <span className="stat-label">创作年份</span>
        </div>
        <div className="stat-item stat-lang-toggle">
          <button
            className={`lang-toggle-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
          >
            <span className="lang-toggle-icon">🌐</span>
            <span className="lang-toggle-label">{language === 'zh' ? 'English' : '中文'}</span>
          </button>
          <span className="stat-label">{language === 'zh' ? '切换英文原文' : 'Switch to Chinese'}</span>
        </div>
      </div>

      {/* 合集选择器 */}
      <div className="filter-bar">
        <button
          className={`filter-btn ${selectedCollection === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCollection('all')}
        >
          ✨ 全部合集
        </button>
        {storyCollections.map(col => (
          <button
            key={col.id}
            className={`filter-btn ${selectedCollection === col.id ? 'active' : ''}`}
            onClick={() => setSelectedCollection(col.id)}
          >
            {col.icon} {col.name}
          </button>
        ))}
      </div>

      {/* 分类筛选 */}
      <div className="filter-bar" style={{ marginTop: '-16px' }}>
        {storyCategories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
            style={{ fontSize: '0.8rem', padding: '6px 14px' }}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* 故事列表 */}
      <div className="stories-list">
        {filteredStories.map(story => (
          <div key={story.id} className="story-card">
            {/* 故事头部 */}
            <div
              className="story-card-header"
              onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
            >
              <div className="story-icon">{story.icon}</div>
              <div className="story-info">
                <div className="story-collection-tag">{story.collection}</div>
                <h3 className="story-title">{language === 'en' ? story.titleEn : story.title}</h3>
                <div className="story-title-en">{language === 'en' ? story.title : story.titleEn}</div>
                <div className="story-meta">
                  <span className="story-year">📅 {story.year}</span>
                  <span className="story-category-tag">{story.category}</span>
                  <span className="story-chapter-count">📄 {story.chapters.length} {language === 'en' ? 'stories' : '篇'}</span>
                </div>
              </div>
              <div className={`story-expand-icon ${expandedStory === story.id ? 'expanded' : ''}`}>
                ▼
              </div>
            </div>

            {/* 故事描述 */}
            <div className="story-description">{language === 'en' ? (story.descriptionEn || story.description) : story.description}</div>

            {/* 展开的章节列表 */}
            {expandedStory === story.id && (
              <div className="story-chapters">
                {story.chapters.map((chapter, idx) => {
                  const chapterId = `${story.id}-${idx}`
                  const isExpanded = expandedChapter === chapterId
                  return (
                    <div key={idx} className="chapter-item">
                      <div
                        className="chapter-header"
                        onClick={() => setExpandedChapter(isExpanded ? null : chapterId)}
                      >
                        <span className="chapter-icon">{chapter.icon}</span>
                        <div className="chapter-titles">
                          <span className="chapter-title">{language === 'en' ? chapter.titleEn : chapter.title}</span>
                          <span className="chapter-title-en">{language === 'en' ? chapter.title : chapter.titleEn}</span>
                        </div>
                        <div className={`chapter-expand ${isExpanded ? 'expanded' : ''}`}>
                          ▼
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="chapter-content">
                          {chapter.source && (
                            <div className="chapter-source">
                              📎 来源：<a href={chapter.source} target="_blank" rel="noopener noreferrer">{chapter.source}</a>
                            </div>
                          )}
                          {/* 语言提示 */}
                          {language === 'en' && !getEnglishText(chapter.source) && (
                            <div className="chapter-lang-notice">
                              ⚠️ 该篇章暂无英文原文，显示中文翻译
                            </div>
                          )}
                          <div className={`chapter-fulltext ${language === 'en' ? 'chapter-fulltext-en' : ''}`}>
                            {(() => {
                              const displayText = language === 'en'
                                ? (getEnglishText(chapter.source) || chapter.fullText || chapter.summary || '')
                                : (chapter.fullText || chapter.summary || '')
                              const isEn = language === 'en' && !!getEnglishText(chapter.source)
                              return displayText.split('\n').map((para, pIdx) => {
                                const trimmed = para.trim()
                                if (!trimmed) return <div key={pIdx} className="chapter-para-spacer" />
                                // 中文 【标题】样式
                                if (/^【.+】$/.test(trimmed)) {
                                  return <h4 key={pIdx} className="chapter-section-title">{trimmed}</h4>
                                }
                                // 英文 ALL CAPS 段落标题（如 CHILDHOOD, AUTHOR'S NOTE 等）
                                if (isEn && /^[A-Z][A-Z\s'''\-—:&,]+$/.test(trimmed) && trimmed.length > 2) {
                                  return <h4 key={pIdx} className="chapter-section-title chapter-section-title-en">{trimmed}</h4>
                                }
                                // 英文 **粗体标题** (ministers-for-magic 等文章用)
                                if (isEn && /^\*\*.+\*\*$/.test(trimmed)) {
                                  const title = trimmed.replace(/^\*\*|\*\*$/g, '')
                                  return <h4 key={pIdx} className="chapter-section-title chapter-section-title-en">{title}</h4>
                                }
                                // ■ · 列表项样式
                                if (trimmed.startsWith('■') || trimmed.startsWith('·')) {
                                  return <p key={pIdx} className="chapter-list-item">{trimmed}</p>
                                }
                                return <p key={pIdx} className={`chapter-paragraph ${isEn ? 'chapter-paragraph-en' : ''}`}>{trimmed}</p>
                              })
                            })()}
                          </div>
                          {chapter.characters && chapter.characters.length > 0 && (
                            <div className="chapter-characters">
                              <span className="chapter-characters-label">相关人物：</span>
                              {chapter.characters.map(charId => {
                                const char = getCharacter(charId)
                                return char ? (
                                  <span key={charId} className="chapter-character-tag" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                                  }}>
                                    {char.image ? (
                                      <img src={char.image} alt={char.name} style={{
                                        width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover',
                                        border: '1px solid rgba(212,168,67,0.3)',
                                      }} />
                                    ) : char.avatar} {char.name}
                                  </span>
                                ) : null
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <div className="stories-empty">
          <span style={{ fontSize: '3rem' }}>🔍</span>
          <p>未找到匹配的故事</p>
        </div>
      )}
    </div>
  )
}
