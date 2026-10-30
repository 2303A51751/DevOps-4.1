import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.js'

function Cart() {
  const { items, total, updateQuantity } = useCart()
  return <>
    <div className="page-intro"><div><span className="eyebrow">Your reading list</span><h1 className="page-title">The bag</h1></div></div>
    {items.length === 0 ? <section className="empty-state"><h2>A little room for a good book.</h2><p>Your bag is waiting for its first story.</p><Link className="button" to="/books">Browse books</Link></section> : <div className="cart-layout">
      <div className="cart-list">{items.map(({ book, quantity }) => <article className="cart-row" key={book.id}>
        <div className="cover" style={{ '--cover': book.color, '--cover-ink': book.ink }}><span className="cover-title">{book.title}</span></div><div><h3>{book.title}</h3><p>{book.author}</p></div>
        <div className="quantity-control" aria-label={`Quantity for ${book.title}`}><button type="button" aria-label="Decrease quantity" onClick={() => updateQuantity(book.id, quantity - 1)}>−</button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => updateQuantity(book.id, quantity + 1)}>+</button></div><strong>${(book.price * quantity).toFixed(2)}</strong>
      </article>)}</div>
      <aside className="cart-summary"><h2>Order summary</h2><div className="summary-line"><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div><div className="summary-line"><span>Shipping</span><span>Calculated at checkout</span></div><div className="summary-line"><strong>Total</strong><strong>${total.toFixed(2)}</strong></div><button className="button" type="button" onClick={() => window.alert('Thanks for your interest. Checkout is a demo.')}>Continue to checkout</button></aside>
    </div>}
  </>
}

export default Cart