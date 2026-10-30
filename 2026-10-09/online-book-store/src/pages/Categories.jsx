import { Link, useSearchParams } from 'react-router-dom'
import BookCard from '../components/BookCard.jsx'
import { books, categories } from '../data/books.js'

function Categories() {
  const [searchParams, setSearchParams] = useSearchParams()
  const selected = searchParams.get('subject') || 'All subjects'
  const visibleBooks = selected === 'All subjects' ? books : books.filter((book) => book.category === selected)
  function selectCategory(category) { if (category === 'All subjects') setSearchParams({}); else setSearchParams({ subject: category }) }
  return <>
    <div className="page-intro"><div><span className="eyebrow">A world of ideas</span><h1 className="page-title">Browse subjects</h1></div><p>Choose a subject to find a book that opens the next door.</p></div>
    <div className="category-strip category-filter" role="group" aria-label="Choose a subject">{['All subjects', ...categories].map((category, index) => <button className="category-tile" key={category} type="button" aria-pressed={selected === category} onClick={() => selectCategory(category)}><span>{category}</span><span aria-hidden="true">{selected === category ? 'Selected' : `0${index + 1} ↗`}</span></button>)}</div>
    <div className="section-heading"><div><span className="eyebrow">{selected}</span><h2>{visibleBooks.length} {visibleBooks.length === 1 ? 'book' : 'books'} to explore</h2></div><Link className="text-link" to="/books">View collection →</Link></div>
    <div className="book-grid">{visibleBooks.map((book) => <BookCard key={book.id} book={book} />)}</div>
  </>
}

export default Categories