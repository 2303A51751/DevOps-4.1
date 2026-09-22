import { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Footer from './components/Footer';

const products = [
  {
    id: 1,
    name: 'Canvas Weekender',
    price: 68,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    name: 'Everyday Sneakers',
    price: 94,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 3,
    name: 'Studio Headphones',
    price: 129,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 4,
    name: 'Ceramic Travel Mug',
    price: 32,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 5,
    name: 'Linen Overshirt',
    price: 76,
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 6,
    name: 'Desk Light',
    price: 58,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80',
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.product.id === product.id);

      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { product, quantity: 1 }];
    });

    setNotification(`${product.name} added to your cart`);
    window.setTimeout(() => setNotification(''), 2400);
  }

  function updateQuantity(productId, change) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.product.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <div className="app-shell">
      <Header cartItemCount={cartItemCount} />
      {notification && (
        <div className="notification" role="status">
          <span aria-hidden="true">+</span>
          {notification}
        </div>
      )}
      <main>
        <section className="hero" aria-labelledby="page-title">
          <p className="eyebrow">Curated essentials, delivered</p>
          <h1 id="page-title">Welcome to Online Shopping</h1>
          <p className="hero-copy">
            Thoughtful goods for everyday rituals, selected to make your day a little better.
          </p>
        </section>
        <div className="shop-layout">
          <ProductList products={products} onAddToCart={addToCart} />
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onClearCart={clearCart}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
