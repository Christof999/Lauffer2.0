import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Lauffer Bau</h3>
            <p>Ihr Partner für professionelle Gartengestaltung, Erdbau und Natursteinhandel aus Wolframs-Eschenbach.</p>
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
              <li>📍 Waizendorfer Str. 6</li>
              <li>91639 Wolframs-Eschenbach</li>
              <li>📞 09875/8129006</li>
              <li>✉️ info@lauffer-bau.de</li>
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
          <p>&copy; {new Date().getFullYear()} Lauffer Bau · Erdbau · Natursteinhandel. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

