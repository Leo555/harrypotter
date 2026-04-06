import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import spaFallback from './plugins/spa-fallback.js'

export default defineConfig({
  plugins: [react(), spaFallback()],
  // 独立域名部署，不需要子路径
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    // 提高 chunk 大小警告阈值到 1000 kB
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 手动分割第三方库和应用代码
        manualChunks: {
          // React 生态库单独打包
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
        },
        // 优化 chunk 文件名
        chunkFileNames: (chunkInfo) => {
          // 数据文件使用 data- 前缀
          if (chunkInfo.name.includes('Book') || chunkInfo.name.includes('books')) {
            return 'assets/data-[hash].js'
          }
          return 'assets/[name]-[hash].js'
        }
      }
    },
    // CSS 代码分割
    cssCodeSplit: true,
    // 关闭 source map 减小体积
    sourcemap: false
  }
})

