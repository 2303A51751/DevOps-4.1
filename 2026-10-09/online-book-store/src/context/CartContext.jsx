import { useEffect, useState } from 'react'
import { CartContext } from './cartContext.js'
const storageKey = 'papertrail-cart'

function readCart() {
  try { return JSON.parse(localStorage.getItem(storageKey) || '[]') } catch { return [] }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readCart)

  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(items)) }, [items])

  function addToCart(book) {
    setItems((current) => {
      const existing = current.find((item) => item.book.id === book.id)
      return existing
        ? current.map((item) => item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { book, quantity: 1 }]
    })
  }

  function updateQuantity(bookId, quantity) {
    setItems((current) => quantity < 1
      ? current.filter((item) => item.book.id !== bookId)
      : current.map((item) => item.book.id === bookId ? { ...item, quantity } : item))
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0)
  return <CartContext.Provider value={{ items, itemCount, total, addToCart, updateQuantity }}>{children}</CartContext.Provider>
}
