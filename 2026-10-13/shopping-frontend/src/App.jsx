import { useEffect, useMemo, useState } from 'react';
import { Plus, X, ShoppingCart, Minus, Trash2, Check } from 'lucide-react';
import Header from './components/Header.jsx';
import ProductList from './components/ProductList.jsx';
import ProductForm from './components/ProductForm.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import SearchBar from './components/SearchBar.jsx';
import { productService } from './services/productService.js';

const currency = (amount) => `₹${Number(amount).toLocaleString('en-IN')}`;

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sort, setSort] = useState('newest');
  const [editingProduct, setEditingProduct] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState('');

  async function loadProducts() {
    setLoading(true);
    setLoadError(false);
    try {
      setProducts(await productService.getAll());
    } catch {
      setLoadError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadProducts(); }, []);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(''), 2600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const categories = useMemo(() => [...new Set(products.map((product) => product.category))].sort(), [products]);
  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesQuery = !normalizedQuery || `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery);
      const matchesCategory = category === 'all' || product.category === category;
      const matchesMin = minPrice === '' || Number(product.price) >= Number(minPrice);
      const matchesMax = maxPrice === '' || Number(product.price) <= Number(maxPrice);
      return matchesQuery && matchesCategory && matchesMin && matchesMax;
    });
    return filtered.sort((first, second) => {
      if (sort === 'name-asc') return first.name.localeCompare(second.name);
      if (sort === 'name-desc') return second.name.localeCompare(first.name);
      if (sort === 'price-asc') return Number(first.price) - Number(second.price);
      if (sort === 'price-desc') return Number(second.price) - Number(first.price);
      return second.id - first.id;
    });
  }, [products, query, category, minPrice, maxPrice, sort]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  function showForm(product = null) {
    setEditingProduct(product);
    setSelectedProduct(null);
    setFormOpen(true);
  }

  async function saveProduct(productData) {
    setSaving(true);
    try {
      if (editingProduct) {
        const updated = await productService.update(editingProduct.id, productData);
        setProducts((current) => current.map((item) => item.id === updated.id ? updated : item));
        setNotice('Product updated');
      } else {
        const created = await productService.create(productData);
        setProducts((current) => [created, ...current]);
        setNotice('Product added');
      }
      setFormOpen(false);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Could not save this product. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(product) {
    if (!window.confirm(`Delete “${product.name}” from the catalog?`)) return;
    try {
      await productService.remove(product.id);
      setProducts((current) => current.filter((item) => item.id !== product.id));
      setCart((current) => current.filter((item) => item.id !== product.id));
      setSelectedProduct((current) => current?.id === product.id ? null : current);
      setNotice('Product deleted');
    } catch {
      setNotice('Delete failed. Please try again.');
    }
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      return existing
        ? current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { ...product, quantity: 1 }];
    });
    setSelectedProduct(null);
    setNotice(`${product.name} added to cart`);
  }

  function changeQuantity(productId, amount) {
    setCart((current) => current.map((item) => item.id === productId ? { ...item, quantity: item.quantity + amount } : item).filter((item) => item.quantity > 0));
  }

  function clearFilters() {
    setQuery(''); setCategory('all'); setMinPrice(''); setMaxPrice(''); setSort('newest');
  }

  return (
    <div id="top" className="app-shell">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main className="main-content">
        <section className="page-intro">
          <div><span className="eyebrow">YOUR STORE / CATALOG</span><h1>Product <span>library</span></h1><p>A clear view of everything you have in stock.</p></div>
          <button className="button button-lime add-product-button" type="button" onClick={() => showForm()}><Plus size={17} /> Add product</button>
        </section>

        <section className="catalog-section">
          <div className="section-heading"><div><h2>All products <span className="count-badge">{products.length}</span></h2><p>{loading ? 'Syncing your catalog' : `${visibleProducts.length} of ${products.length} products shown`}</p></div><span className="live-indicator"><span /> LIVE CATALOG</span></div>
          <SearchBar query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} categories={categories} minPrice={minPrice} onMinPriceChange={setMinPrice} maxPrice={maxPrice} onMaxPriceChange={setMaxPrice} sort={sort} onSortChange={setSort} onClear={clearFilters} />
          <ProductList products={visibleProducts} loading={loading} error={loadError} onRetry={loadProducts} onEdit={showForm} onDelete={deleteProduct} onDetails={setSelectedProduct} onAddToCart={addToCart} onAddProduct={() => showForm()} />
        </section>
        <footer className="page-footer"><span>GOODS PRODUCT MANAGER</span><span>Assignment 10.1.2 <i>·</i> {new Date().getFullYear()}</span></footer>
      </main>

      {formOpen && <ProductForm product={editingProduct} onSave={saveProduct} onClose={() => setFormOpen(false)} saving={saving} />}
      <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} onEdit={showForm} onAddToCart={addToCart} />

      {cartOpen && <div className="overlay cart-overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setCartOpen(false)}>
        <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
          <div className="cart-heading"><div><span className="eyebrow">YOUR SELECTION</span><h2 id="cart-title">Cart <span>{cartCount}</span></h2></div><button className="icon-button" type="button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={19} /></button></div>
          {cart.length ? <>
            <div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><div className="cart-item-mark"><ShoppingCart size={17} /></div><div className="cart-item-copy"><strong>{item.name}</strong><span>{currency(item.price)} each</span></div><div className="quantity-control"><button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}><Minus size={13} /></button><span>{item.quantity}</span><button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}><Plus size={13} /></button></div><button className="small-icon-button danger-action" type="button" onClick={() => setCart((current) => current.filter((entry) => entry.id !== item.id))} aria-label={`Remove ${item.name}`}><Trash2 size={15} /></button></div>)}</div>
            <div className="cart-total"><span>Subtotal</span><strong>{currency(cartTotal)}</strong></div><button className="button button-dark checkout-button" type="button" onClick={() => { setCart([]); setCartOpen(false); setNotice('Cart checked out'); }}><Check size={17} /> Complete order</button>
          </> : <div className="cart-empty"><ShoppingCart size={26} /><strong>Your cart is empty</strong><span>Add a product from the catalog to get started.</span></div>}
        </aside>
      </div>}
      {notice && <div className="toast" role="status"><Check size={16} />{notice}</div>}
    </div>
  );
}