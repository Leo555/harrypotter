import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import spaFallback from './plugins/spa-fallback.js'

export default defineConfig({
  plugins: [react(), spaFallback()],
  // GitHub Pages 部署路径（仓库名）
  base: '/harrypotter/',
  server: {
    host: '0.0.0.0',
    port: 3000
  }
})
