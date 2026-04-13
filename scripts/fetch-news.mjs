#!/usr/bin/env node

/**
 * 🦉 预言家日报 — 自动新闻获取脚本
 *
 * 此脚本由 GitHub Actions 每 3 小时调用一次，从公开 RSS 源获取
 * 最新的哈利波特相关新闻，生成静态 JSON 文件供前端使用。
 *
 * 数据源：Google News RSS (无需 API Key，适合 GitHub Pages)
 * 输出：public/data/news.json
 */

import { writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const NEWS_JSON_PATH = resolve(__dirname, '../public/data/news.json')
const MAX_NEWS_COUNT = 20 // 保留最多 20 条新闻

// ======== 新闻分类映射 ========
const CATEGORY_KEYWORDS = {
  影视动态: ['电视剧', 'TV', '电影', 'movie', 'film', 'HBO', '华纳', 'Warner', '选角', 'cast', '拍摄', '预告', 'trailer', '剧集', 'series'],
  游戏资讯: ['游戏', 'game', '霍格沃茨之遗', 'Hogwarts Legacy', 'Quidditch', '魁地奇'],
  主题乐园: ['乐园', 'park', 'theme park', '环球影城', 'Universal', '东京', '奥兰多', 'Orlando'],
  出版物: ['书', 'book', '出版', '有声书', 'audiobook', '插画', 'illustration', '版本'],
  社区活动: ['粉丝', 'fan', '活动', 'event', '庆典', '展览', 'exhibition', 'cosplay'],
  周边商品: ['周边', 'merchandise', '联名', 'collaboration', '手办', 'figure', 'LEGO', '乐高'],
}

// ======== emoji 图标映射 ========
const CATEGORY_ICONS = {
  影视动态: '📺',
  游戏资讯: '🎮',
  主题乐园: '🏰',
  出版物: '📚',
  社区活动: '🎉',
  周边商品: '🛍️',
  综合资讯: '📰',
}

// ======== 站内关联链接映射 ========
const RELATED_LINKS_MAP = {
  影视动态: [
    { label: '📚 原著百科', path: '/books' },
    { label: '🧙 人物百科', path: '/characters' },
  ],
  游戏资讯: [
    { label: '🎩 分院帽测试', path: '/interactive/sorting' },
    { label: '✨ 咒语大全', path: '/world/spells' },
  ],
  主题乐园: [
    { label: '🗺️ 地点百科', path: '/world/places' },
    { label: '🎬 电影百科', path: '/movies' },
  ],
  出版物: [
    { label: '📚 原著百科', path: '/books' },
    { label: '📖 在线阅读', path: '/reader' },
  ],
  社区活动: [
    { label: '🧪 魔药百科', path: '/world/potions' },
    { label: '🪄 魔杖匹配', path: '/interactive/wand' },
  ],
  周边商品: [
    { label: '⚗️ 魔法物品', path: '/world/items' },
    { label: '🐉 魔法生物', path: '/world/creatures' },
  ],
  综合资讯: [
    { label: '📚 原著百科', path: '/books' },
    { label: '🧙 人物百科', path: '/characters' },
  ],
}

/**
 * 根据标题和描述自动分类新闻
 */
function categorizeNews(title, description = '') {
  const text = `${title} ${description}`.toLowerCase()
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw.toLowerCase()))) {
      return category
    }
  }
  return '综合资讯'
}

/**
 * 简单 XML 解析 — 从 RSS XML 中提取 <item> 列表
 * 不依赖第三方库，适合 GitHub Actions 环境
 */
function parseRSSItems(xml) {
  const items = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1]
    const getTag = (tag) => {
      const r = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?(.*?)(?:\\]\\]>)?<\\/${tag}>`, 's')
      const m = itemXml.match(r)
      return m ? m[1].trim() : ''
    }

    items.push({
      title: getTag('title'),
      link: getTag('link'),
      pubDate: getTag('pubDate'),
      description: getTag('description'),
      source: getTag('source'),
    })
  }

  return items
}

/**
 * 从 Google News RSS 获取哈利波特新闻
 */
async function fetchGoogleNewsRSS() {
  const queries = [
    'Harry+Potter+news',
    '哈利波特+新闻',
    'Wizarding+World+news',
    'Hogwarts+Legacy',
    'Fantastic+Beasts',
  ]

  const allItems = []

  for (const query of queries) {
    const url = `https://news.google.com/rss/search?q=${query}&hl=zh-CN&gl=CN&ceid=CN:zh-Hans`
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; DailyProphetBot/1.0)',
        },
        signal: AbortSignal.timeout(15000),
      })

      if (!response.ok) {
        console.warn(`⚠️  RSS 请求失败 [${query}]: ${response.status}`)
        continue
      }

      const xml = await response.text()
      const items = parseRSSItems(xml)
      allItems.push(...items)
      console.log(`✅ [${query}] 获取到 ${items.length} 条`)
    } catch (err) {
      console.warn(`⚠️  RSS 获取异常 [${query}]: ${err.message}`)
    }
  }

  return allItems
}

/**
 * 生成去重 key：去掉来源后缀、标点、空格，转小写，取前 40 字符
 */
function dedupeKey(title) {
  return title
    .replace(/\s*[-—|·]\s*[^\s\-—|·]+$/, '')   // 去掉 "- 来源" 后缀
    .replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '')  // 只留中英文和数字
    .toLowerCase()
    .slice(0, 40)
}

/**
 * 对新闻列表去重（按标题相似度）
 */
function deduplicateNews(items) {
  const seen = new Set()
  return items.filter(item => {
    const key = dedupeKey(item.title)
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/**
 * 将 RSS 条目转换为预言家日报新闻格式
 */
function transformToNews(items, startId = 1) {
  return items.map((item, index) => {
    const category = categorizeNews(item.title, item.description)
    const date = item.pubDate
      ? new Date(item.pubDate).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10)

    // 清理 HTML 标签和特殊字符
    let cleanDescription = item.description
      // 先解码 HTML 实体
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      // 然后删除所有 HTML 标签
      .replace(/<[^>]+>/g, '')
      // 清理多余的空白
      .replace(/\s+/g, ' ')
      .trim()

    // 如果 description 只是 "标题 来源" 的格式（Google News 常见格式）
    // 则从标题中提取更有意义的内容
    const titleWithoutSource = item.title.split(/\s+-\s+/)[0]
    const descriptionWithoutSource = cleanDescription.split(/\s{2,}|\s+-\s+/)[0]

    // 如果清理后的description基本等同于标题，使用标题（去掉来源）
    if (cleanDescription.length < 30 ||
        cleanDescription === item.title ||
        cleanDescription.includes(item.title.split(' - ')[0])) {
      cleanDescription = titleWithoutSource
    } else {
      // 否则使用description，但也去掉可能的来源标记
      cleanDescription = descriptionWithoutSource
    }

    // 生成摘要（最多120字）
    const summary = cleanDescription.length > 120
      ? cleanDescription.slice(0, 120) + '...'
      : cleanDescription

    return {
      id: startId + index,
      title: item.title
        .replace(/<[^>]+>/g, '')
        .trim(),
      date,
      category,
      summary: summary || item.title,
      content: cleanDescription || item.title,
      image: CATEGORY_ICONS[category] || '📰',
      relatedLinks: RELATED_LINKS_MAP[category] || RELATED_LINKS_MAP['综合资讯'],
      source: item.link || '',
    }
  })
}

/**
 * 主流程
 */
async function main() {
  console.log('🦉 预言家日报 — 开始获取最新新闻...\n')

  // 1. 读取现有新闻
  let existingData = { lastUpdated: '', source: 'Daily Prophet Auto-Update', news: [] }
  try {
    const raw = readFileSync(NEWS_JSON_PATH, 'utf-8')
    existingData = JSON.parse(raw)
    console.log(`📂 现有新闻 ${existingData.news.length} 条`)
  } catch {
    console.log('📂 未找到现有新闻文件，将创建新文件')
  }

  // 2. 从 RSS 获取新闻
  const rssItems = await fetchGoogleNewsRSS()
  console.log(`\n📡 共获取到 ${rssItems.length} 条原始新闻`)

  if (rssItems.length === 0) {
    console.log('⚠️  未获取到新的新闻，保留现有数据')
    // 即使没有新数据也更新时间戳
    existingData.lastUpdated = new Date().toISOString()
    writeFileSync(NEWS_JSON_PATH, JSON.stringify(existingData, null, 2), 'utf-8')
    console.log('✅ 时间戳已更新')
    return
  }

  // 3. 去重
  const uniqueItems = deduplicateNews(rssItems)
  console.log(`🔍 去重后 ${uniqueItems.length} 条`)

  // 4. 转换格式
  const maxExistingId = existingData.news.reduce((max, n) => Math.max(max, n.id), 0)
  const newNews = transformToNews(uniqueItems, maxExistingId + 1)

  // 5. 合并：新新闻在前，旧新闻在后（按日期排序），并对合并结果二次去重
  const allNews = [...newNews, ...existingData.news]
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  // 合并后再去重：同标题的只保留最新的一条
  const seenKeys = new Set()
  const mergedNews = allNews.filter(item => {
    const key = dedupeKey(item.title)
    if (!key || seenKeys.has(key)) return false
    seenKeys.add(key)
    return true
  }).slice(0, MAX_NEWS_COUNT)

  // 6. 重新编号（确保 ID 从 1 开始连续）
  mergedNews.forEach((item, i) => {
    item.id = i + 1
  })

  // 7. 写入文件
  const output = {
    lastUpdated: new Date().toISOString(),
    source: 'Daily Prophet Auto-Update',
    news: mergedNews,
  }

  writeFileSync(NEWS_JSON_PATH, JSON.stringify(output, null, 2), 'utf-8')
  console.log(`\n✅ 新闻更新完成！共 ${mergedNews.length} 条新闻`)
  console.log(`📄 文件已写入: ${NEWS_JSON_PATH}`)
}

main().catch(err => {
  console.error('❌ 新闻更新失败:', err)
  process.exit(1)
})
