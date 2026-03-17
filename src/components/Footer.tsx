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
            <h4>Kontakt</h4>
            <ul>
              <li><span aria-hidden="true">📞</span> <a href="tel:+4998758129006">09875/8129006</a></li>
              <li><span aria-hidden="true">✉️</span> <a href="mailto:info@lauffer-bau.de">info@lauffer-bau.de</a></li>
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

