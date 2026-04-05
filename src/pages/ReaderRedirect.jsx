import { Navigate, useParams } from 'react-router-dom'
import books from '../data/books'

// 将 /reader/:bookId 和 /reader/:bookId/:chapterId 重定向到 /books/:id
const bookIdMap = {
  1: 'philosophers-stone',
  2: 'chamber-of-secrets',
  3: 'prisoner-of-azkaban',
  4: 'goblet-of-fire',
  5: 'order-of-the-phoenix',
  6: 'half-blood-prince',
  7: 'deathly-hallows',
}

export default function ReaderRedirect() {
  const { bookId } = useParams()
  const bookNum = parseInt(bookId) || 1
  const bookSlug = bookIdMap[bookNum] || books[0]?.id || 'philosophers-stone'
  return <Navigate to={`/books/${bookSlug}`} replace />
}
