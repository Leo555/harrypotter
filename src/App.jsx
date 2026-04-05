import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
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
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
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

          {/* 原著阅读器 */}
          <Route path="/reader" element={<ReaderShelf />} />
          <Route path="/reader/:bookId" element={<BookReader />} />
          <Route path="/reader/:bookId/:chapterId" element={<BookReader />} />

          {/* 其他 */}
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/extra-stories" element={<ExtraStories />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
