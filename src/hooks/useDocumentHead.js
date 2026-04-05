import { useEffect } from 'react'

/**
 * 轻量级文档头管理 Hook
 * 用于设置页面的 title 和 meta 标签
 */
export default function useDocumentHead({ title, description, keywords }) {
  useEffect(() => {
    // 设置页面标题
    const fullTitle = title
      ? `${title} | 哈利波特的魔法世界`
      : '哈利波特的魔法世界 | Harry Potter\'s Wizarding World'
    document.title = fullTitle

    // 设置 meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]')
      if (!metaDesc) {
        metaDesc = document.createElement('meta')
        metaDesc.name = 'description'
        document.head.appendChild(metaDesc)
      }
      metaDesc.content = description
    }

    // 设置 meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.name = 'keywords'
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.content = keywords
    }

    // 设置 Open Graph 标签
    const ogTags = {
      'og:title': fullTitle,
      'og:description': description || '中文互联网最全面的哈利波特百科全书网站 — 原著、电影、人物、咒语、互动测试',
      'og:type': 'website',
      'og:site_name': '哈利波特的魔法世界',
    }

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('property', property)
        document.head.appendChild(tag)
      }
      tag.content = content
    })
  }, [title, description, keywords])
}
