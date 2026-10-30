import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard.jsx'
import { books, categories } from '../data/books.js'

function Home() {
  return <>
    <section className="hero"><div className="hero-copy"><span className="eyebrow">A small shop for big ideas</span><h1>Find your next <em>chapter.</em></h1><p>Thoughtful books for curious people. Browse practical guides, fresh perspectives, and the ideas worth keeping close.</p><Link className="button button-light" to="/books">Explore the collection <span aria-hidden="true">→</span></Link></div>
      <div className="hero-art" aria-label="Featured book cover artwork" role="img"><div className="hero-book cover" style={{ '--cover': '#d8e66c', '--cover-ink': '#263428' }}><span className="cover-kicker">PAPERTRAIL EDITIONS</span><span className="cover-graphic" aria-hidden="true" /><span className="cover-title">The curious mind</span><span className="cover-author">A FIELD GUIDE</span></div></div>
    </section>
    <section aria-labelledby="featured-heading"><div className="section-heading"><div><span className="eyebrow">Chosen for you</span><h2 id="featured-heading">The good stuff</h2></div><Link className="text-link" to="/books">All books <span aria-hidden="true">→</span></Link></div><div className="book-grid">{books.slice(0, 3).map((book) => <BookCard key={book.id} book={book} />)}</div></section>
    <section aria-labelledby="subjects-heading"><div className="section-heading"><div><span className="eyebrow">Follow a thread</span><h2 id="subjects-heading">Browse by subject</h2></div></div><div className="category-strip">{categories.map((category, index) => <Link className="category-tile" key={category} to={`/categories?subject=${encodeURIComponent(category)}`}><span>{category}</span><span aria-hidden="true">0{index + 1} ↗</span></Link>)}</div></section>
  </>
}

export default Home