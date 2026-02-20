import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Team from './pages/Team'
import Gallery from './pages/Gallery'
import Karriere from './pages/Karriere'
import Contact from './pages/Contact'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import './App.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        {/* Skip-Link für Barrierefreiheit (WCAG 2.4.1) */}
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        <Navigation />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/uber-uns" element={<About />} />
            <Route path="/projekte" element={<Projects />} />
            <Route path="/team" element={<Team />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/karriere" element={<Karriere />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  )
}

export default App

