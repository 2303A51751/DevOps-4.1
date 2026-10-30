import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/books', label: 'Books' },
  { to: '/categories', label: 'Subjects' },
  { to: '/profile', label: 'My shelf' },
]

function Navigation() {
  return <nav className="main-nav" aria-label="Main navigation">{links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{link.label}</NavLink>)}</nav>
}

export default Navigation