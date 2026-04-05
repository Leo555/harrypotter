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
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import SortingHat from './pages/SortingHat'
import Patronus from './pages/Patronus'
import WandMatch from './pages/WandMatch'
import Timeline from './pages/Timeline'
import ExtraStories from './pages/ExtraStories'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetail />} />
          <Route path="/world/spells" element={<Spells />} />
          <Route path="/world/creatures" element={<Spells />} />
          <Route path="/world/items" element={<Spells />} />
          <Route path="/world/places" element={<Spells />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/interactive/sorting" element={<SortingHat />} />
          <Route path="/interactive/patronus" element={<Patronus />} />
          <Route path="/interactive/wand" element={<WandMatch />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/extra-stories" element={<ExtraStories />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
