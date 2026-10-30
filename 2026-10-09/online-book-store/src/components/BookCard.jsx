import { Link } from 'react-router-dom'

function BookCard({ book }) {
  return <article className="book-card"><Link className="book-card-link" to={`/books/${book.id}`} aria-label={`View ${book.title}`}>
    <div className="cover" style={{ '--cover': book.color, '--cover-ink': book.ink }}><span className="cover-kicker">{book.label}</span><span className="cover-graphic" aria-hidden="true" /><span className="cover-title">{book.title}</span><span className="cover-author">{book.author}</span></div>
    <div className="book-meta"><div><h3>{book.title}</h3><p>{book.author}</p></div><span className="book-price">${book.price}</span></div>
  </Link></article>
}

export default BookCard