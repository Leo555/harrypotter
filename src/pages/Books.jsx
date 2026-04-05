import { Link } from 'react-router-dom'
import books from '../data/books'

export default function Books() {
  return (
    <div className="container fade-in">
      <h1 className="page-title">📚 原著百科</h1>
      <p className="page-subtitle">J.K.罗琳创作的七部哈利·波特小说，构建了一个完整而迷人的魔法世界</p>

      <div className="books-grid">
        {books.map(book => (
          <Link to={`/books/${book.id}`} key={book.id} className="book-card">
            <div className="book-card-cover" style={{ background: `linear-gradient(135deg, ${book.color}, ${book.color}88)` }}>
              <span className="book-card-emoji">{book.cover}</span>
              <span className="book-card-number">第{book.number}部</span>
            </div>
            <div className="book-card-body">
              <h3 className="book-card-title">{book.title}</h3>
              <div className="book-card-title-en">{book.titleEn}</div>
              <div className="book-card-meta">
                <span>📅 {book.year}年</span>
                <span>📄 {book.pages}页</span>
                <span>📑 {book.chapters.length}章</span>
              </div>
              <p className="book-card-summary">{book.summary.slice(0, 80)}...</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="section-info-box">
        <p>📖 七部小说共计 <strong>4195页</strong>，被翻译成 <strong>80多种语言</strong>，全球销量超过 <strong>5亿册</strong></p>
      </div>
    </div>
  )
}
