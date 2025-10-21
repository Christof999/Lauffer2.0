import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import './Navigation.css'

function Navigation() {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/', label: 'Startseite' },
    { path: '/uber-uns', label: 'Über Uns' },
    { path: '/projekte', label: 'Unsere Projekte' },
    { path: '/team', label: 'Unser Team' },
    { path: '/galerie', label: 'Galerie' },
    { path: '/kontakt', label: 'Kontakt' },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      className="navigation"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          <img src="/Logo_Lauffer_RGB.png" alt="Lauffer Bau Logo" className="logo" />
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav">
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

        {/* Mobile Burger Button */}
        <motion.button
          className="burger-button"
          onClick={toggleMobileMenu}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle mobile menu"
        >
          <motion.span
            className="burger-line"
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="burger-line"
            animate={{
              opacity: isMobileMenuOpen ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="burger-line"
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobileMenu}
            />
            
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring',
                stiffness: 300,
                damping: 30
              }}
            >
              <div className="mobile-menu-header">
                <img src="/Logo_Lauffer_RGB.png" alt="Lauffer Bau Logo" className="mobile-logo" />
                <motion.button
                  className="close-button"
                  onClick={closeMobileMenu}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close mobile menu"
                >
                  ✕
                </motion.button>
              </div>

              <ul className="mobile-nav-links">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.1
                    }}
                  >
                    <Link
                      to={item.path}
                      className={location.pathname === item.path ? 'active' : ''}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                      {location.pathname === item.path && (
                        <motion.div
                          className="mobile-active-indicator"
                          layoutId="mobileActiveIndicator"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mobile-menu-footer">
                <p>📞 09875/8129006</p>
                <p>✉️ info@lauffer-bau.de</p>
                <p>📍 Wolframs-Eschenbach</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation