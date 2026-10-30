import { ShoppingBag, ShoppingCart } from 'lucide-react';

export default function Header({ cartCount, onCartClick }) {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Goods product manager home">
        <span className="brand-mark"><ShoppingBag size={19} strokeWidth={2.2} /></span>
        <span>goods<span className="brand-period">.</span></span>
      </a>
      <div className="topbar-right">
        <span className="workspace-label">PRODUCT WORKSPACE</span>
        <button className="icon-button cart-button" type="button" onClick={onCartClick} aria-label={`Open cart, ${cartCount} items`} title="Open cart">
          <ShoppingCart size={19} />
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
}