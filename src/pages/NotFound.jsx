import { Link } from 'react-router-dom'
import useDocumentHead from '../hooks/useDocumentHead'

export default function NotFound() {
  useDocumentHead({
    title: '404 — 页面未找到',
    titleEn: '404 — Page Not Found',
    description: '你要找的页面不存在，也许它像消失柜一样去了另一个地方。回到首页重新开始你的魔法之旅。',
    descriptionEn: 'The page you are looking for does not exist. Perhaps it vanished like a Vanishing Cabinet. Return to the homepage to restart your magical journey.',
    keywords: '404,页面未找到,哈利波特',
    keywordsEn: '404,page not found,Harry Potter',
  })
  return (
    <div className="container fade-in not-found-wrapper">
      <div className="not-found-icon">🧹</div>
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">这条走廊似乎被移动楼梯带去了别处...</h2>
      <p className="not-found-desc">
        你要找的页面不存在，也许它像消失柜一样去了另一个地方。
        不如回到首页，重新开始你的魔法之旅吧。
      </p>
      <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
        ⚡ 回到魔法世界
      </Link>
    </div>
  )
}
