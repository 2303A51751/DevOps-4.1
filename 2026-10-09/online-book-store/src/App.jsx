import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import BookList from './pages/BookList.jsx'
import BookDetails from './pages/BookDetails.jsx'
import Categories from './pages/Categories.jsx'
import Cart from './pages/Cart.jsx'
import Profile from './pages/Profile.jsx'
import NotFound from './pages/NotFound.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <main className="page-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BookList />} />
            <Route path="/books/:bookId" element={<BookDetails />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
