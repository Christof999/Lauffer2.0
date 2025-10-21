import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Team from './pages/Team'
import Gallery from './pages/Gallery'
import MapDemo from './pages/MapDemo'
import MapTest from './pages/MapTest'
import Contact from './pages/Contact'
import Karriere from './pages/Karriere'
import Impressum from './pages/Impressum'
import Datenschutz from './pages/Datenschutz'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uber-uns" element={<About />} />
          <Route path="/projekte" element={<Projects />} />
          <Route path="/team" element={<Team />} />
          <Route path="/galerie" element={<Gallery />} />
          <Route path="/map-demo" element={<MapDemo />} />
          <Route path="/map-test" element={<MapTest />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/karriere" element={<Karriere />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
        </Routes>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  )
}

export default App

