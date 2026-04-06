import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SITE_NAME = '哈利波特的魔法世界'
const SITE_NAME_EN = "Harry Potter's Wizarding World"
const SITE_URL = 'https://harrypotter.lz5z.com'
const DEFAULT_IMAGE = '/images/movies/philosophers-stone.jpg'
const DEFAULT_DESC = '中文互联网最全面的哈利波特百科全书网站 — 原著百科、电影百科、人物百科、咒语大全、魔法生物、互动测试，探索魔法世界的每一个角落。'
const DEFAULT_DESC_EN = "The most comprehensive Harry Potter encyclopedia in Chinese — books, movies, characters, spells, creatures, interactive quizzes, and everything about the Wizarding World."

/**
 * 全功能 SEO 文档头管理 Hook
 * 支持：title / description / keywords / canonical / og / twitter / hreflang / JSON-LD
 *
 * @param {Object} options
 * @param {string|null} options.title - 中文页面标题（拼入站名后缀）
 * @param {string|null} options.titleEn - 英文页面标题
 * @param {string} options.description - 中文描述
 * @param {string} options.descriptionEn - 英文描述
 * @param {string} options.keywords - 中文关键词（逗号分隔）
 * @param {string} options.keywordsEn - 英文关键词（逗号分隔）
 * @param {string} options.image - OG 图片路径
 * @param {string} options.type - OG 类型，默认 website
 * @param {Object|null} options.jsonLd - JSON-LD 结构化数据对象
 */
export default function useDocumentHead({
  title,
  titleEn,
  description,
  descriptionEn,
  keywords,
  keywordsEn,
  image,
  type = 'website',
  jsonLd,
} = {}) {
  const location = useLocation()

  useEffect(() => {
    const currentPath = location.pathname
    const canonicalUrl = `${SITE_URL}${currentPath}`

    // ========== 1. 页面标题 ==========
    const cnTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} | ${SITE_NAME_EN}`
    const enTitle = titleEn
      ? `${titleEn} | ${SITE_NAME_EN}`
      : cnTitle
    document.title = cnTitle

    // ========== 2. Meta Description ==========
    setMeta('name', 'description', description || DEFAULT_DESC)

    // ========== 3. Meta Keywords ==========
    const allKeywords = [
      keywords || '哈利波特,Harry Potter,魔法世界,霍格沃茨',
      keywordsEn || 'Harry Potter,Wizarding World,Hogwarts',
    ].join(',')
    setMeta('name', 'keywords', allKeywords)
    setLink('canonical', canonicalUrl)

    // ========== 5. Alternate Hreflang 标签 ==========
    setLink('alternate', canonicalUrl, { hreflang: 'zh-CN' })
    setLink('alternate', canonicalUrl, { hreflang: 'en' })
    setLink('alternate', canonicalUrl, { hreflang: 'x-default' })

    // ========== 6. Open Graph 标签 ==========
    const ogImage = image ? `${SITE_URL}${image}` : `${SITE_URL}${DEFAULT_IMAGE}`
    const ogMap = {
      'og:title': cnTitle,
      'og:description': description || DEFAULT_DESC,
      'og:type': type,
      'og:url': canonicalUrl,
      'og:site_name': SITE_NAME,
      'og:locale': 'zh_CN',
      'og:locale:alternate': 'en_US',
      'og:image': ogImage,
      'og:image:alt': title || SITE_NAME,
    }
    Object.entries(ogMap).forEach(([property, content]) => {
      setMeta('property', property, content)
    })

    // ========== 7. Twitter Card 标签 ==========
    const twitterMap = {
      'twitter:card': 'summary_large_image',
      'twitter:title': enTitle,
      'twitter:description': (descriptionEn || description || DEFAULT_DESC_EN).slice(0, 200),
      'twitter:image': ogImage,
      'twitter:image:alt': titleEn || title || SITE_NAME_EN,
    }
    Object.entries(twitterMap).forEach(([name, content]) => {
      setMeta('name', name, content)
    })

    // ========== 8. 英文描述辅助 meta（供英文搜索引擎使用） ==========
    if (descriptionEn) {
      setMeta('name', 'description:en', descriptionEn)
    }

    // ========== 9. JSON-LD 结构化数据 ==========
    // 清理旧的 JSON-LD
    const oldScripts = document.querySelectorAll('script[data-seo-jsonld]')
    oldScripts.forEach(s => s.remove())

    // 基础 WebSite schema（所有页面都注入）
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      alternateName: SITE_NAME_EN,
      url: SITE_URL,
      description: DEFAULT_DESC,
      inLanguage: ['zh-CN', 'en'],
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }
    injectJsonLd(websiteSchema)

    // 当前页面 BreadcrumbList
    const breadcrumbs = buildBreadcrumbs(currentPath, title)
    if (breadcrumbs.length > 1) {
      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${SITE_URL}${crumb.path}`,
        })),
      }
      injectJsonLd(breadcrumbSchema)
    }

    // 自定义 JSON-LD（页面级传入）
    if (jsonLd) {
      injectJsonLd(jsonLd)
    }

    // 清理函数
    return () => {
      const scripts = document.querySelectorAll('script[data-seo-jsonld]')
      scripts.forEach(s => s.remove())
    }
  }, [title, titleEn, description, descriptionEn, keywords, keywordsEn, image, type, jsonLd, location.pathname])
}

/* ========== 工具函数 ========== */

function setMeta(attr, key, content) {
  const selector = attr === 'property'
    ? `meta[property="${key}"]`
    : `meta[name="${key}"]`
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setLink(rel, href, attrs = {}) {
  // 构建唯一选择器
  const attrSelector = Object.entries(attrs)
    .map(([k, v]) => `[${k}="${v}"]`)
    .join('')
  const selector = `link[rel="${rel}"]${attrSelector}`
  let link = document.querySelector(selector)
  if (!link) {
    link = document.createElement('link')
    link.rel = rel
    Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v))
    document.head.appendChild(link)
  }
  link.href = href
}

function injectJsonLd(data) {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-seo-jsonld', 'true')
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

/** 基于路径生成面包屑 */
function buildBreadcrumbs(path, pageTitle) {
  const crumbs = [{ name: '首页', path: '/' }]
  const segments = path.split('/').filter(Boolean)

  const pathMap = {
    books: '原著百科',
    movies: '电影百科',
    characters: '人物百科',
    world: '魔法世界',
    spells: '咒语大全',
    creatures: '魔法生物',
    items: '魔法物品',
    places: '地点百科',
    potions: '魔药百科',
    news: '预言家日报',
    interactive: '互动专区',
    sorting: '分院帽测试',
    patronus: '守护神测试',
    wand: '魔杖匹配',
    timeline: '魔法时间线',
    'extra-stories': '隐秘故事集',
    reader: '原著阅读',
  }

  let currentPath = ''
  segments.forEach((seg, i) => {
    currentPath += `/${seg}`
    const name = (i === segments.length - 1 && pageTitle)
      ? pageTitle.replace(/^[\p{Emoji}\s]+/u, '') // 去掉 emoji 前缀
      : (pathMap[seg] || seg)
    crumbs.push({ name, path: currentPath })
  })

  return crumbs
}
