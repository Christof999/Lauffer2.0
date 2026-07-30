import { Link } from 'react-router-dom'
import { CONTACT, OPENING_HOURS } from '../seo/business'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Lauffer Bau</h3>
            <p>Ihr Partner für professionelle Gartengestaltung, Erdbau und Natursteinhandel aus Wolframs-Eschenbach.</p>
            {/* Vollständige NAP-Angabe – identisch mit JSON-LD und Google-Profil */}
            <address className="footer-address">
              {CONTACT.street}
              <br />
              {CONTACT.postalCode} {CONTACT.city}
            </address>
          </div>

          <div className="footer-section">
            <h4>Kontakt</h4>
            <ul>
              <li>
                <a href={`tel:${CONTACT.telephoneHref}`}>{CONTACT.telephoneDisplay}</a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </li>
              <li>
                <Link to="/kontakt">Kontaktformular</Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Leistungen</h4>
            <ul>
              <li><Link to="/gartenbau">Gartenbau</Link></li>
              <li><Link to="/erdbau">Erdbau</Link></li>
              <li><Link to="/natursteine">Natursteinhandel</Link></li>
              <li><Link to="/projekte">Projekte</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Öffnungszeiten</h4>
            <ul className="footer-hours">
              {OPENING_HOURS.map((slot) => (
                <li key={slot.label}>
                  <span>{slot.label}</span>
                  <span>{slot.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4>Rechtliches</h4>
            <ul>
              <li><Link to="/impressum">Impressum</Link></li>
              <li><Link to="/datenschutz">Datenschutz</Link></li>
              <li><Link to="/karriere">Karriere</Link></li>
              <li><button type="button" className="cookie-settings-btn">Cookie-Einstellungen</button></li>
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
