import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Contact from './pages/Contact'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import UnderConstruction from './pages/UnderConstruction'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        {/* Skip-Link für Barrierefreiheit (WCAG 2.4.1) */}
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        <main id="main-content">
          <Routes>
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="*" element={<UnderConstruction />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  )
}

export default App

