function Header({ cartItemCount }) {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Shopping Cart home">
        <span className="brand-mark" aria-hidden="true">SC</span>
        <span>shopping-cart-app</span>
      </a>
      <div className="cart-summary" aria-label={`${cartItemCount} items in cart`}>
        <span className="cart-icon" aria-hidden="true">Bag</span>
        <span className="cart-label">Cart</span>
        <span className="cart-count">{cartItemCount}</span>
      </div>
    </header>
  );
}

export default Header;
