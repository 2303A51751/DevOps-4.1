import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBook } from '../data/books.js'
import { useCart } from '../context/useCart.js'

function BookDetails() {
  const { bookId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [result, setResult] = useState(null)

  useEffect(() => {
    let active = true
    const timer = window.setTimeout(() => {
      const result = getBook(bookId)
      if (!active) return
      setResult({ bookId, book: result, error: result ? '' : `We couldn't find a book with ID “${bookId}”.` })
    }, 350)
    return () => {
      active = false
      window.clearTimeout(timer)
      console.log('Leaving book details')
    }
  }, [bookId])

  if (!result || result.bookId !== bookId) return <p className="status-message" role="status">Finding your book...</p>
  if (result.error) return <section className="status-message error-message" role="alert"><h1>Book not found</h1><p>{result.error}</p><button className="button" onClick={() => navigate('/books')}>Back to all books</button></section>
  const book = result.book
  if (!book) return null
  return <div className="detail-layout"><div className="detail-cover"><div className="cover" style={{ '--cover': book.color, '--cover-ink': book.ink }}><span className="cover-kicker">{book.label}</span><span className="cover-graphic" aria-hidden="true" /><span className="cover-title">{book.title}</span><span className="cover-author">{book.author}</span></div></div>
    <section className="detail-copy"><span className="eyebrow">{book.category} · {book.id}</span><h1>{book.title}</h1><p className="detail-author">By {book.author}</p><p>{book.description}</p><div className="detail-buy"><strong>${book.price}</strong><button className="button" onClick={() => addToCart(book)}>Add to bag <span aria-hidden="true">+</span></button></div><button className="button button-quiet" style={{ marginTop: 16 }} onClick={() => navigate('/')}>Back home</button></section>
  </div>
}

export default BookDetails