import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Lauffer Gartenbau</h3>
            <p>Ihr Partner für professionelle Gartengestaltung, Erdbau und Natursteinhandel seit 2018.</p>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Startseite</Link></li>
              <li><Link to="/uber-uns">Über Uns</Link></li>
              <li><Link to="/projekte">Unsere Projekte</Link></li>
              <li><Link to="/team">Unser Team</Link></li>
              <li><Link to="/galerie">Galerie</Link></li>
              <li><Link to="/karriere">Karriere</Link></li>
              <li><Link to="/kontakt">Kontakt</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Kontakt</h4>
            <ul>
              <li>📍 Musterstraße 123</li>
              <li>12345 Musterstadt</li>
              <li>📞 +49 (0) 123 456789</li>
              <li>✉️ info@lauffer-gartenbau.de</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Rechtliches</h4>
            <ul>
              <li><Link to="/impressum">Impressum</Link></li>
              <li><Link to="/datenschutz">Datenschutz</Link></li>
              <li><button className="cookie-settings-btn">Cookie-Einstellungen</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Lauffer Gartenbau · Erdbau · Natursteinhandel. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

