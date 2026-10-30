import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import Navigation from './Navigation.jsx'
import './Header.css'

function Header() {
  const { itemCount } = useCart()
  return <header className="site-header"><div className="header-inner">
    <Link className="wordmark" to="/" aria-label="Papertrail home"><span className="wordmark-mark">P.</span><span>papertrail<span className="wordmark-period">.</span></span></Link>
    <Navigation />
    <Link className="cart-link" to="/cart" aria-label={`Shopping bag, ${itemCount} items`}><span className="bag-icon" aria-hidden="true" /><span>Bag</span><span className="cart-count">{itemCount}</span></Link>
  </div></header>
}

export default Header