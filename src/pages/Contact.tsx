import { motion } from 'framer-motion'
import AnimatedMap from '../components/AnimatedMap'
import { MAPBOX_CONFIG, LOCATIONS } from '../config/mapbox'
import './Contact.css'

function Contact() {
  return (
    <div className="contact">
      <motion.section
        className="contact-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-background">
          <div className="hero-shapes">
            <motion.div 
              className="hero-shape hero-shape-1"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="hero-shape hero-shape-2"
              animate={{ 
                y: [0, 30, 0],
                rotate: [0, -10, 0]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
        
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
          >
            📞 Direkter Kontakt
          </motion.div>
          
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="highlight-text">Lassen Sie uns</span><br />
            zusammenarbeiten
          </motion.h1>
          
          <motion.p
            className="hero-text"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Haben Sie Fragen zu unseren Leistungen oder möchten Sie ein Projekt besprechen? 
            Wir freuen uns auf Ihre Nachricht und beraten Sie gerne persönlich.
          </motion.p>
          
          <motion.div
            className="hero-stats"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="stat-item">
              <div className="stat-number">24h</div>
              <div className="stat-label">Antwortzeit</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Kundenzufriedenheit</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Jahre Erfahrung</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="contact-content">
        <div className="contact-container">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="info-card">
              <div className="info-header">
                <div className="info-icon">🏢</div>
                <h2>Lauffer Bau</h2>
                <p className="info-subtitle">Erdbau · Natursteinhandel</p>
              </div>
              
              <div className="contact-methods">
                <motion.div 
                  className="contact-method"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="method-icon">📍</div>
                  <div className="method-content">
                    <h4>Adresse</h4>
                    <p>Waizendorfer Str. 6<br />91639 Wolframs-Eschenbach</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="contact-method"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="method-icon">📞</div>
                  <div className="method-content">
                    <h4>Telefon</h4>
                    <p><a href="tel:098758129006">09875/8129006</a></p>
                  </div>
                </motion.div>

                <motion.div 
                  className="contact-method"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="method-icon">✉️</div>
                  <div className="method-content">
                    <h4>E-Mail</h4>
                    <p><a href="mailto:info@lauffer-bau.de">info@lauffer-bau.de</a></p>
                  </div>
                </motion.div>
              </div>
              
              <div className="contact-hours">
                <h4>📅 Öffnungszeiten</h4>
                <div className="hours-list">
                  <div className="hours-item">
                    <span>Mo - Fr:</span>
                    <span>7:00 - 17:00</span>
                  </div>
                  <div className="hours-item">
                    <span>Sa:</span>
                    <span>8:00 - 12:00</span>
                  </div>
                  <div className="hours-item">
                    <span>So:</span>
                    <span>Geschlossen</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-card">
              <div className="form-header">
                <h2>💬 Nachricht senden</h2>
                <p>Senden Sie uns eine Nachricht und wir melden uns schnellstmöglich bei Ihnen zurück.</p>
              </div>
              
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Ihr Name *</label>
                    <input type="text" placeholder="Max Mustermann" required />
                  </div>
                  <div className="form-group">
                    <label>E-Mail Adresse *</label>
                    <input type="email" placeholder="max@example.com" required />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Telefonnummer</label>
                    <input type="tel" placeholder="+49 123 456789" />
                  </div>
                  <div className="form-group">
                    <label>Betreff *</label>
                    <select required>
                      <option value="">Bitte wählen</option>
                      <option value="gartenbau">🌱 Gartenbau</option>
                      <option value="erdbau">🚜 Erdbau</option>
                      <option value="naturstein">🪨 Natursteinhandel</option>
                      <option value="beratung">💡 Beratung</option>
                      <option value="angebot">💰 Angebot anfordern</option>
                      <option value="sonstiges">❓ Sonstiges</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Ihre Nachricht *</label>
                  <textarea 
                    placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..." 
                    rows={5} 
                    required
                  ></textarea>
                </div>
                
                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 8px 25px rgba(122, 181, 29, 0.3)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>📤 Nachricht senden</span>
                  <div className="btn-arrow">→</div>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-section">
        <div className="contact-map-wrapper">
          <motion.div
            className="contact-map-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AnimatedMap
              mapboxToken={MAPBOX_CONFIG.token}
              startLocation={LOCATIONS.start.coordinates}
              endLocation={LOCATIONS.destination.coordinates}
              companyName={LOCATIONS.destination.name}
              containerRef={{ current: null }}
            />
            
            {/* Map overlay info */}
            <motion.div
              className="map-overlay"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="overlay-content">
                <h3>Unser Standort</h3>
                <p><strong>Lauffer Bau</strong><br />
                Waizendorfer Str. 6<br />
                91639 Wolframs-Eschenbach</p>
                <div className="contact-info">
                  <p>📞 {LOCATIONS.destination.phone}</p>
                  <p>✉️ {LOCATIONS.destination.email}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact

