import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import { preloadNews } from './data/news'
import Home from './pages/Home'
import Books from './pages/Books'
import BookDetail from './pages/BookDetail'
import Movies from './pages/Movies'
import MovieDetail from './pages/MovieDetail'
import Characters from './pages/Characters'
import CharacterDetail from './pages/CharacterDetail'
import Spells from './pages/Spells'
import Creatures from './pages/Creatures'
import MagicItems from './pages/MagicItems'
import Places from './pages/Places'
import Potions from './pages/Potions'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import SortingHat from './pages/SortingHat'
import Patronus from './pages/Patronus'
import WandMatch from './pages/WandMatch'
import Timeline from './pages/Timeline'
import ExtraStories from './pages/ExtraStories'
import ReaderShelf from './pages/ReaderShelf'
import BookReader from './pages/BookReader'
import SearchPage from './pages/SearchPage'
import NotFound from './pages/NotFound'

// 预加载新闻数据（越早越好，不阻塞渲染）
preloadNews()

/* 带 Header/Footer 的主布局 */
function MainLayout() {
  return (
    <>
      <Header />
      <main className="main-content">
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
      </main>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* 独立全屏阅读页面 — 无 Header/Footer */}
        <Route path="/reader/:bookId" element={<BookReader />} />
        <Route path="/reader/:bookId/:chapterId" element={<BookReader />} />

        {/* 所有其他页面走主布局 */}
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  )
}
