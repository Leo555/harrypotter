import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchAll, getResultCount, highlightText, CATEGORIES } from '../utils/searchEngine'
import useDocumentHead from '../hooks/useDocumentHead'

// 热门搜索标签
const hotTags = [
  { label: '哈利·波特', icon: '⚡' },
  { label: '邓布利多', icon: '🧙' },
  { label: '伏地魔', icon: '💀' },
  { label: '魔法石', icon: '📕' },
  { label: '守护神', icon: '🦌' },
  { label: '霍格沃茨', icon: '🏰' },
  { label: '隐形衣', icon: '🧥' },
  { label: '凤凰', icon: '🐦' },
  { label: '赫敏', icon: '📚' },
  { label: '斯内普', icon: '🖤' },
  { label: '死亡圣器', icon: '△' },
  { label: '魔药', icon: '🧪' },
]

// 分类标签顺序
const categoryOrder = ['characters', 'books', 'movies', 'spells', 'creatures', 'items', 'places', 'potions', 'news', 'stories']

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQ = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQ)
  const [results, setResults] = useState({})
  const [activeCategory, setActiveCategory] = useState('all')
  const [hasSearched, setHasSearched] = useState(!!initialQ)
  const inputRef = useRef(null)

  useDocumentHead({
    title: query ? `🔍 搜索「${query}」` : '🔍 全站搜索',
    description: '搜索哈利波特百科全书 — 人物、书籍、电影、咒语、生物、物品、地点、魔药等全站内容检索。',
    keywords: '哈利波特搜索,魔法世界搜索,哈利波特百科搜索',
  })

  // 执行搜索
  const doSearch = useCallback((q) => {
    const r = searchAll(q)
    setResults(r)
    setHasSearched(true)
    setActiveCategory('all')
    if (q.trim()) {
      setSearchParams({ q: q.trim() }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }, [setSearchParams])

  // URL 参数变化时同步搜索
  useEffect(() => {
    if (initialQ) {
      setQuery(initialQ)
      doSearch(initialQ)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 自动聚焦输入框
  useEffect(() => {
    if (inputRef.current && !initialQ) {
      inputRef.current.focus()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e) => {
    e.preventDefault()
    doSearch(query)
  }

  const handleTagClick = (tag) => {
    setQuery(tag)
    doSearch(tag)
  }

  const totalCount = getResultCount(results)
  const availableCategories = categoryOrder.filter(cat => results[cat]?.length > 0)

  // 过滤当前活跃分类的结果
  const filteredResults = activeCategory === 'all'
    ? results
    : { [activeCategory]: results[activeCategory] }

  // 渲染高亮文本
  const renderHighlight = (text, q) => {
    if (!text || !q) return text
    const parts = highlightText(text, q)
    if (typeof parts === 'string') return parts
    return parts.map((part, i) =>
      part.toLowerCase() === q.trim().toLowerCase()
        ? <mark key={i} className="search-highlight">{part}</mark>
        : part
    )
  }

  return (
    <div className="container fade-in">
      <div className="search-page">
        {/* 搜索头部 */}
        <div className="search-page-header">
          <h1 className="search-page-title">🔍 全站搜索</h1>
          <p className="search-page-subtitle">探索魔法世界的每一个角落 — 搜索人物、书籍、电影、咒语、生物、魔药等</p>
        </div>

        {/* 搜索框 */}
        <form className="search-page-form" onSubmit={handleSubmit}>
          <div className="search-page-input-wrapper">
            <span className="search-page-input-icon">🔮</span>
            <input
              ref={inputRef}
              type="text"
              className="search-page-input"
              placeholder="输入关键词搜索魔法世界..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="search-page-clear"
                onClick={() => { setQuery(''); setResults({}); setHasSearched(false); setSearchParams({}, { replace: true }) }}
              >
                ✕
              </button>
            )}
            <button type="submit" className="search-page-submit">
              搜索
            </button>
          </div>
        </form>

        {/* 热门搜索标签 */}
        {!hasSearched && (
          <div className="search-page-hot">
            <div className="search-page-hot-label">✨ 热门搜索</div>
            <div className="search-page-hot-tags">
              {hotTags.map(tag => (
                <button
                  key={tag.label}
                  className="search-page-hot-tag"
                  onClick={() => handleTagClick(tag.label)}
                >
                  <span>{tag.icon}</span> {tag.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 搜索结果 */}
        {hasSearched && (
          <div className="search-results">
            {/* 结果摘要 */}
            <div className="search-results-summary">
              {totalCount > 0 ? (
                <span>找到 <strong className="search-results-count">{totalCount}</strong> 个与「<strong className="search-results-query">{query}</strong>」相关的结果</span>
              ) : query.trim() ? (
                <span>没有找到与「<strong className="search-results-query">{query}</strong>」相关的结果</span>
              ) : (
                <span>请输入搜索关键词</span>
              )}
            </div>

            {/* 分类过滤标签 */}
            {totalCount > 0 && (
              <div className="search-category-tabs">
                <button
                  className={`search-category-tab ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  🌟 全部 <span className="search-category-count">{totalCount}</span>
                </button>
                {availableCategories.map(cat => (
                  <button
                    key={cat}
                    className={`search-category-tab ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {CATEGORIES[cat].label} <span className="search-category-count">{results[cat].length}</span>
                  </button>
                ))}
              </div>
            )}

            {/* 分组结果列表 */}
            {totalCount > 0 && categoryOrder.map(cat => {
              const items = filteredResults[cat]
              if (!items?.length) return null
              return (
                <div key={cat} className="search-result-group">
                  <h2 className="search-result-group-title">
                    {CATEGORIES[cat].label}
                    <span className="search-result-group-count">{items.length} 个结果</span>
                  </h2>
                  <div className="search-result-list">
                    {items.map((item, idx) => (
                      <Link
                        key={`${cat}-${item.id}-${idx}`}
                        to={item.path}
                        className="search-result-card"
                      >
                        <div className="search-result-icon">{item.icon}</div>
                        <div className="search-result-content">
                          <div className="search-result-title">
                            {renderHighlight(item.title, query)}
                          </div>
                          {item.subtitle && (
                            <div className="search-result-subtitle">
                              {renderHighlight(item.subtitle, query)}
                            </div>
                          )}
                          {item.desc && (
                            <div className="search-result-desc">
                              {renderHighlight(
                                item.desc.length > 120 ? item.desc.slice(0, 120) + '...' : item.desc,
                                query
                              )}
                            </div>
                          )}
                          {item.tags?.length > 0 && (
                            <div className="search-result-tags">
                              {item.tags.map((tag, i) => (
                                <span key={i} className="search-result-tag">{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                        <span className="search-result-arrow">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* 空结果提示 */}
            {totalCount === 0 && query.trim() && (
              <div className="search-empty">
                <div className="search-empty-icon">🔮</div>
                <h3 className="search-empty-title">魔法镜中未找到匹配...</h3>
                <p className="search-empty-text">试试换个关键词，或从热门搜索中选择：</p>
                <div className="search-page-hot-tags" style={{ justifyContent: 'center', marginTop: 16 }}>
                  {hotTags.slice(0, 6).map(tag => (
                    <button
                      key={tag.label}
                      className="search-page-hot-tag"
                      onClick={() => handleTagClick(tag.label)}
                    >
                      <span>{tag.icon}</span> {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
