import { useMemo, useState } from 'react'
import BookCard from '../components/BookCard.jsx'
import { books, categories } from '../data/books.js'

function BookList() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All subjects')
  const filteredBooks = useMemo(() => books.filter((book) => {
    const matchesQuery = `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (category === 'All subjects' || book.category === category)
  }), [query, category])
  return <>
    <div className="page-intro"><div><span className="eyebrow">The collection</span><h1 className="page-title">Books for the curious</h1></div><p>Good ideas have a way of finding their people. Find yours among our hand-picked guides and field notes.</p></div>
    <div className="catalog-tools"><input aria-label="Search books" type="search" placeholder="Search title, author, subject" value={query} onChange={(event) => setQuery(event.target.value)} /><select aria-label="Filter by subject" value={category} onChange={(event) => setCategory(event.target.value)}><option>All subjects</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></div>
    {filteredBooks.length ? <div className="book-grid">{filteredBooks.map((book) => <BookCard key={book.id} book={book} />)}</div> : <p className="status-message">No books match that search. Try another title or subject.</p>}
  </>
}

export default BookList