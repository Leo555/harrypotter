// 全站搜索引擎 — 统一检索所有数据源
import { characters, houses } from '../data/characters'
import { getNewsSync } from '../data/news'
import books from '../data/books'
import movies from '../data/movies'
import { spells } from '../data/spells'
import potions from '../data/potions'
import { extraStories } from '../data/extraStories'
import creatures from '../data/creatures'
import magicItems from '../data/magicItems'
import places from '../data/places'

// 搜索分类定义
const CATEGORIES = {
  characters: { label: '🧙 人物', path: id => `/characters/${id}` },
  books: { label: '📚 书籍', path: id => `/books/${id}` },
  movies: { label: '🎬 电影', path: id => `/movies/${id}` },
  spells: { label: '✨ 咒语', path: () => '/world/spells' },
  creatures: { label: '🐉 生物', path: () => '/world/creatures' },
  items: { label: '⚗️ 物品', path: () => '/world/items' },
  places: { label: '🗺️ 地点', path: () => '/world/places' },
  potions: { label: '🧪 魔药', path: () => '/world/potions' },
  news: { label: '📰 新闻', path: id => `/news/${id}` },
  stories: { label: '📖 故事', path: () => '/extra-stories' },
}

/**
 * 全站联合搜索
 * @param {string} query - 搜索关键词
 * @returns {Object} 按分类分组的搜索结果
 */
export function searchAll(query) {
  if (!query || query.trim().length === 0) return {}

  const q = query.trim().toLowerCase()
  const results = {}

  // 1. 搜索人物
  const characterResults = characters.filter(c =>
    c.name.includes(q) ||
    c.nameEn.toLowerCase().includes(q) ||
    c.description?.toLowerCase().includes(q) ||
    c.occupation?.includes(q) ||
    c.house?.includes(q) ||
    c.actor?.includes(q) ||
    c.actorEn?.toLowerCase().includes(q) ||
    c.skills?.some(s => s.includes(q))
  ).map(c => ({
    id: c.id,
    title: c.name,
    subtitle: c.nameEn,
    desc: c.description,
    icon: c.avatar,
    path: CATEGORIES.characters.path(c.id),
    tags: [c.occupation, houses[c.house]?.name].filter(Boolean),
  }))
  if (characterResults.length) results.characters = characterResults

  // 2. 搜索书籍
  const bookResults = books.filter(b =>
    b.title.includes(q) ||
    b.titleEn.toLowerCase().includes(q) ||
    b.summary?.toLowerCase().includes(q) ||
    b.themes?.some(t => t.includes(q)) ||
    b.chapters?.some(ch => ch.includes(q))
  ).map(b => ({
    id: b.id,
    title: b.title,
    subtitle: b.titleEn,
    desc: b.summary,
    icon: b.cover,
    path: CATEGORIES.books.path(b.id),
    tags: [`${b.year}年`, `第${b.number}部`],
  }))
  if (bookResults.length) results.books = bookResults

  // 3. 搜索电影
  const movieResults = movies.filter(m =>
    m.title.includes(q) ||
    m.titleEn.toLowerCase().includes(q) ||
    m.summary?.toLowerCase().includes(q) ||
    m.director?.includes(q) ||
    m.directorEn?.toLowerCase().includes(q) ||
    m.cast?.some(c => c.actor.includes(q) || c.role.includes(q) || c.actorEn.toLowerCase().includes(q))
  ).map(m => ({
    id: m.id,
    title: m.title,
    subtitle: m.titleEn,
    desc: m.summary,
    icon: '🎬',
    path: CATEGORIES.movies.path(m.id),
    tags: [`${m.year}年`, m.director],
  }))
  if (movieResults.length) results.movies = movieResults

  // 4. 搜索咒语
  const spellResults = spells.filter(s =>
    s.name.includes(q) ||
    s.nameEn.toLowerCase().includes(q) ||
    s.effect?.includes(q) ||
    s.description?.toLowerCase().includes(q) ||
    s.category?.includes(q)
  ).map(s => ({
    id: s.id,
    title: s.name,
    subtitle: s.nameEn,
    desc: s.effect,
    icon: s.icon,
    path: CATEGORIES.spells.path(),
    tags: [s.type, s.category],
  }))
  if (spellResults.length) results.spells = spellResults

  // 5. 搜索生物
  const creatureResults = creatures.filter(c =>
    c.name.includes(q) ||
    c.nameEn.toLowerCase().includes(q) ||
    c.desc?.toLowerCase().includes(q) ||
    c.danger?.includes(q) ||
    c.habitat?.includes(q)
  ).map(c => ({
    id: c.nameEn,
    title: c.name,
    subtitle: c.nameEn,
    desc: c.desc,
    icon: c.emoji,
    path: CATEGORIES.creatures.path(),
    tags: [c.danger, `分级 ${c.classification}`],
  }))
  if (creatureResults.length) results.creatures = creatureResults

  // 6. 搜索物品
  const itemResults = magicItems.filter(i =>
    i.name.includes(q) ||
    i.nameEn.toLowerCase().includes(q) ||
    i.desc?.toLowerCase().includes(q) ||
    i.type?.includes(q)
  ).map(i => ({
    id: i.nameEn,
    title: i.name,
    subtitle: i.nameEn,
    desc: i.desc,
    icon: i.emoji,
    path: CATEGORIES.items.path(),
    tags: [i.type],
  }))
  if (itemResults.length) results.items = itemResults

  // 7. 搜索地点
  const placeResults = places.filter(p =>
    p.name.includes(q) ||
    p.nameEn.toLowerCase().includes(q) ||
    p.desc?.toLowerCase().includes(q) ||
    p.location?.includes(q) ||
    p.type?.includes(q)
  ).map(p => ({
    id: p.nameEn,
    title: p.name,
    subtitle: p.nameEn,
    desc: p.desc,
    icon: p.emoji,
    path: CATEGORIES.places.path(),
    tags: [p.type, `📍 ${p.location}`],
  }))
  if (placeResults.length) results.places = placeResults

  // 8. 搜索魔药
  const potionResults = potions.filter(p =>
    p.name.includes(q) ||
    p.nameEn.toLowerCase().includes(q) ||
    p.effect?.includes(q) ||
    p.description?.toLowerCase().includes(q) ||
    p.difficulty?.includes(q)
  ).map(p => ({
    id: p.id,
    title: p.name,
    subtitle: p.nameEn,
    desc: p.effect,
    icon: p.icon,
    path: CATEGORIES.potions.path(),
    tags: [p.difficulty, p.brewTime],
  }))
  if (potionResults.length) results.potions = potionResults

  // 9. 搜索新闻（从动态缓存获取）
  const newsData = getNewsSync()
  const newsResults = newsData.filter(n =>
    n.title.includes(q) ||
    n.summary?.includes(q) ||
    n.content?.toLowerCase().includes(q) ||
    n.category?.includes(q)
  ).map(n => ({
    id: n.id,
    title: n.title,
    subtitle: n.category,
    desc: n.summary,
    icon: n.image,
    path: CATEGORIES.news.path(n.id),
    tags: [n.category, n.date],
  }))
  if (newsResults.length) results.news = newsResults

  // 10. 搜索隐秘故事集
  const storyResults = extraStories.filter(s =>
    s.title.includes(q) ||
    s.titleEn?.toLowerCase().includes(q) ||
    s.description?.toLowerCase().includes(q) ||
    s.category?.includes(q) ||
    s.chapters?.some(ch => ch.title.includes(q) || ch.titleEn?.toLowerCase().includes(q))
  ).map(s => ({
    id: s.id,
    title: s.title,
    subtitle: s.titleEn,
    desc: s.description,
    icon: s.icon,
    path: CATEGORIES.stories.path(),
    tags: [s.category, s.collection],
  }))
  if (storyResults.length) results.stories = storyResults

  return results
}

/**
 * 获取搜索结果总数
 */
export function getResultCount(results) {
  return Object.values(results).reduce((sum, arr) => sum + arr.length, 0)
}

/**
 * 高亮文本中的关键词
 */
export function highlightText(text, query) {
  if (!text || !query) return text
  const q = query.trim()
  if (!q) return text
  // 转义正则特殊字符
  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return text.split(regex)
}

export { CATEGORIES }
