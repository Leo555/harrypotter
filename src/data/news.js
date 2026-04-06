/**
 * 🦉 预言家日报 — 新闻数据加载模块
 *
 * 从 /data/news.json 动态加载新闻数据（由 GitHub Actions 定时更新）
 * 提供 React Hook 和静态备用数据
 */

import { useState, useEffect } from 'react'

// 备用静态数据（当 JSON 加载失败时使用）
const FALLBACK_NEWS = [
  {
    id: 1,
    title: '《哈利·波特》系列电视剧正式宣布开拍',
    date: '2025-04-01',
    category: '影视动态',
    summary: 'HBO Max 正式宣布《哈利·波特》系列电视剧进入拍摄阶段，预计将忠实还原原著七部小说的完整故事线。',
    content: 'HBO Max 正式确认《哈利·波特》系列电视剧已进入前期制作阶段。该系列将对 J.K.罗琳的七部小说进行忠实改编，每一部小说将对应一季电视剧。制作方承诺将深入探索原著中因电影时长限制而被省略的情节和角色。新系列将进行全球选角，为每个标志性角色寻找最合适的演员。',
    image: '📺',
    relatedLinks: [
      { label: '📚 原著百科', path: '/books' },
      { label: '🧙 人物百科', path: '/characters' },
    ],
    source: 'https://www.hbo.com/harry-potter',
  },
  {
    id: 2,
    title: '哈利波特主题乐园东京园区盛大开业',
    date: '2025-03-15',
    category: '主题乐园',
    summary: '华纳兄弟哈利波特主题乐园东京园区正式开业，完美还原了对角巷和霍格沃茨城堡。',
    content: '位于东京的华纳兄弟哈利波特主题乐园正式向公众开放。园区完美还原了对角巷、霍格沃茨城堡、禁林等经典场景，游客可以体验飞行扫帚模拟器、魔药课互动体验等多个沉浸式项目。开业当天吸引了超过两万名魔法世界的粉丝前来体验。',
    image: '🏰',
    relatedLinks: [
      { label: '🗺️ 地点百科', path: '/world/places' },
      { label: '🎬 电影百科', path: '/movies' },
    ],
  },
  {
    id: 3,
    title: '《神奇动物在哪里》第四部剧本完成',
    date: '2025-02-28',
    category: '影视动态',
    summary: 'J.K.罗琳确认《神奇动物在哪里》系列第四部电影剧本已经完成，故事将聚焦邓布利多与格林德沃的最终决战。',
    content: 'J.K.罗琳通过社交媒体宣布《神奇动物在哪里》第四部电影的剧本已经完成。据悉，新一部将聚焦于1945年邓布利多与格林德沃之间那场传说中的决战。制作方透露，这将是整个系列中最具史诗感的一部作品。',
    image: '🎬',
    relatedLinks: [
      { label: '🧙 邓布利多', path: '/characters/albus-dumbledore' },
      { label: '🐉 魔法生物', path: '/world/creatures' },
    ],
  },
]

// 缓存：避免多个组件重复请求
let _newsCache = null
let _fetchPromise = null

/**
 * 从 JSON 文件加载新闻数据
 */
async function fetchNewsData() {
  if (_newsCache) return _newsCache

  if (_fetchPromise) return _fetchPromise

  _fetchPromise = (async () => {
    try {
      // 添加时间戳防止浏览器缓存过久
      const cacheBuster = Math.floor(Date.now() / (1000 * 60 * 30)) // 每 30 分钟换一次
      const res = await fetch(`${import.meta.env.BASE_URL}data/news.json?v=${cacheBuster}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      _newsCache = data.news || []
      return _newsCache
    } catch (err) {
      console.warn('📰 新闻数据加载失败，使用备用数据:', err.message)
      _newsCache = FALLBACK_NEWS
      return _newsCache
    } finally {
      _fetchPromise = null
    }
  })()

  return _fetchPromise
}

/**
 * React Hook：使用新闻数据
 *
 * @returns {{ news: Array, loading: boolean, error: string|null, lastUpdated: string|null }}
 */
export function useNews() {
  const [news, setNews] = useState(_newsCache || [])
  const [loading, setLoading] = useState(!_newsCache)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (_newsCache) {
      setNews(_newsCache)
      setLoading(false)
      return
    }

    let cancelled = false

    fetchNewsData()
      .then(data => {
        if (!cancelled) {
          setNews(data)
          setLoading(false)
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setNews(FALLBACK_NEWS)
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [])

  return { news, loading, error }
}

/**
 * 供需要同步数据的场景使用（如已预加载后）
 * 注意：首次调用可能返回 FALLBACK_NEWS
 */
export function getNewsSync() {
  return _newsCache || FALLBACK_NEWS
}

/**
 * 预加载新闻数据（可在 App 入口调用）
 */
export function preloadNews() {
  return fetchNewsData()
}

export default useNews
