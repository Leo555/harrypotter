/**
 * Vite 插件：构建后将 index.html 复制为 404.html
 * 用于 GitHub Pages 的 SPA 路由支持
 * 
 * GitHub Pages 在找不到页面时会加载 404.html，
 * 将其设为与 index.html 相同即可让 React Router 接管路由。
 */
import { resolve } from 'path'
import { copyFileSync } from 'fs'

export default function spaFallback() {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const outDir = resolve(process.cwd(), 'dist')
      copyFileSync(
        resolve(outDir, 'index.html'),
        resolve(outDir, '404.html')
      )
      console.log('✅ 404.html created for GitHub Pages SPA routing')
    }
  }
}
