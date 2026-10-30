export const books = [
  { id: 'B101', title: 'Python Programming', author: 'Maya Patel', category: 'Programming', price: 42, color: '#c9d985', ink: '#263428', label: 'LEARN BY MAKING', description: 'A practical, project-led guide to writing clear Python, from your first functions to confident application design.' },
  { id: 'B102', title: 'Web Development', author: 'Noah Williams', category: 'Web Design', price: 48, color: '#e78362', ink: '#381f1d', label: 'THE OPEN WEB', description: 'Build modern web experiences with a thoughtful introduction to the browser, HTML, CSS, and JavaScript.' },
  { id: 'B103', title: 'Machine Learning', author: 'Ari Chen', category: 'Data Science', price: 56, color: '#a8bed0', ink: '#1e303b', label: 'PATTERNS IN DATA', description: 'Understand the ideas behind machine learning and put them to work with approachable, hands-on examples.' },
  { id: 'B104', title: 'Designing Interfaces', author: 'Leila Okafor', category: 'Web Design', price: 39, color: '#e4bc73', ink: '#42301d', label: 'FORM & FUNCTION', description: 'A visual field guide to creating interfaces that feel coherent, useful, and unmistakably human.' },
]

export const categories = [...new Set(books.map((book) => book.category))]

export function getBook(bookId) {
  return books.find((book) => book.id.toLowerCase() === bookId.toLowerCase())
}