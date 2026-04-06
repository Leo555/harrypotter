import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import { preloadNews } from './data/news'

// 路由级代码分割：懒加载所有页面组件
const Home = lazy(() => import('./pages/Home'))
const Books = lazy(() => import('./pages/Books'))
const BookDetail = lazy(() => import('./pages/BookDetail'))
const Movies = lazy(() => import('./pages/Movies'))
const MovieDetail = lazy(() => import('./pages/MovieDetail'))
const Characters = lazy(() => import('./pages/Characters'))
const CharacterDetail = lazy(() => import('./pages/CharacterDetail'))
const Spells = lazy(() => import('./pages/Spells'))
const Creatures = lazy(() => import('./pages/Creatures'))
const MagicItems = lazy(() => import('./pages/MagicItems'))
const Places = lazy(() => import('./pages/Places'))
const Potions = lazy(() => import('./pages/Potions'))
const News = lazy(() => import('./pages/News'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
const SortingHat = lazy(() => import('./pages/SortingHat'))
const Patronus = lazy(() => import('./pages/Patronus'))
const WandMatch = lazy(() => import('./pages/WandMatch'))
const Timeline = lazy(() => import('./pages/Timeline'))
const ExtraStories = lazy(() => import('./pages/ExtraStories'))
const ReaderShelf = lazy(() => import('./pages/ReaderShelf'))
const BookReader = lazy(() => import('./pages/BookReader'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const NotFound = lazy(() => import('./pages/NotFound'))

// 页面加载占位符组件
function PageLoader() {
  return (
    <div className="page-loader">
      <div className="page-loader-spinner"></div>
      <p className="page-loader-text">加载中...</p>
    </div>
  )
}

// 预加载新闻数据（越早越好，不阻塞渲染）
preloadNews()

/* 带 Header/Footer 的主布局 */
function MainLayout() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* 首页 */}
            <Route path="/" element={<Home />} />

            {/* 百科模块 */}
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieDetail />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/characters/:id" element={<CharacterDetail />} />

            {/* 魔法世界 */}
            <Route path="/world/spells" element={<Spells />} />
            <Route path="/world/creatures" element={<Creatures />} />
            <Route path="/world/items" element={<MagicItems />} />
            <Route path="/world/places" element={<Places />} />
            <Route path="/world/potions" element={<Potions />} />

            {/* 资讯 */}
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />

            {/* 互动专区 */}
            <Route path="/interactive/sorting" element={<SortingHat />} />
            <Route path="/interactive/patronus" element={<Patronus />} />
            <Route path="/interactive/wand" element={<WandMatch />} />

            {/* 原著书架 */}
            <Route path="/reader" element={<ReaderShelf />} />

            {/* 其他 */}
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/extra-stories" element={<ExtraStories />} />
            <Route path="/search" element={<SearchPage />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* 独立全屏阅读页面 — 无 Header/Footer */}
          <Route path="/reader/:bookId" element={<BookReader />} />
          <Route path="/reader/:bookId/:chapterId" element={<BookReader />} />

          {/* 所有其他页面走主布局 */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
