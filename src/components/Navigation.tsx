import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Navigation.css'

function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Startseite' },
    { path: '/uber-uns', label: 'Über Uns' },
    { path: '/projekte', label: 'Unsere Projekte' },
    { path: '/team', label: 'Unser Team' },
    { path: '/galerie', label: 'Galerie' },
    { path: '/map-demo', label: 'Standort' },
    { path: '/kontakt', label: 'Kontakt' },
  ]

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="logo-link">
          <img src="/Logo_Lauffer_RGB.png" alt="Lauffer Bau Logo" className="logo" />
        </Link>
        
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeIndicator"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  )
}

export default Navigation

