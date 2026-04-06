/**
 * Vite 插件：构建后将 index.html 复制为 404.html
 * 用于 GitHub Pages 的 SPA 路由支持
 * 
 * GitHub Pages 在找不到页面时会加载 404.html，
 * 将其设为与 index.html 相同即可让 React Router 接管路由。
 */
import { resolve } from 'path'
import { copyFileSync, existsSync } from 'fs'

export default function spaFallback() {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const outDir = resolve(process.cwd(), 'dist')
      const indexHtml = resolve(outDir, 'index.html')
      const notFoundHtml = resolve(outDir, '404.html')
      
      // 确保 index.html 存在后再复制
      if (existsSync(indexHtml)) {
        try {
          copyFileSync(indexHtml, notFoundHtml)
          console.log('✅ 404.html created for GitHub Pages SPA routing')
        } catch (err) {
          console.warn('⚠️  Failed to create 404.html:', err.message)
        }
      }
    }
  }
}
