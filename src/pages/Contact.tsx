import { motion } from 'framer-motion'
import { useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import './Contact.css'

function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      // EmailJS Konfiguration aus Umgebungsvariablen
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      // Template Parameter mit aktueller Zeit
      const templateParams = {
        ...formData,
        time: new Date().toLocaleString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      
      setFormStatus('success')
      // Formular zurücksetzen nach 3 Sekunden
      setTimeout(() => {
        setFormData({
          from_name: '',
          reply_to: '',
          phone: '',
          subject: '',
          message: ''
        })
        setFormStatus('idle')
      }, 3000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setFormStatus('error')
      // Fehler nach 5 Sekunden zurücksetzen
      setTimeout(() => setFormStatus('idle'), 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
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
              <div className="stat-number">8+</div>
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
                <p className="info-subtitle">Gartenbau · Erdbau · Natursteinhandel</p>
              </div>
              
              <div className="contact-methods">
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
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Ihr Name *</label>
                    <input 
                      type="text" 
                      name="from_name"
                      placeholder="Max Mustermann" 
                      value={formData.from_name}
                      onChange={handleChange}
                      required 
                      disabled={formStatus === 'sending'}
                    />
                  </div>
                  <div className="form-group">
                    <label>E-Mail Adresse *</label>
                    <input 
                      type="email" 
                      name="reply_to"
                      placeholder="max@example.com" 
                      value={formData.reply_to}
                      onChange={handleChange}
                      required 
                      disabled={formStatus === 'sending'}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Telefonnummer</label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="+49 123 456789" 
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={formStatus === 'sending'}
                    />
                  </div>
                  <div className="form-group">
                    <label>Betreff *</label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={formStatus === 'sending'}
                    >
                      <option value="">Bitte wählen</option>
                      <option value="🌱 Gartenbau">🌱 Gartenbau</option>
                      <option value="🚜 Erdbau">🚜 Erdbau</option>
                      <option value="🪨 Natursteinhandel">🪨 Natursteinhandel</option>
                      <option value="💡 Beratung">💡 Beratung</option>
                      <option value="💰 Angebot anfordern">💰 Angebot anfordern</option>
                      <option value="❓ Sonstiges">❓ Sonstiges</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Ihre Nachricht *</label>
                  <textarea 
                    name="message"
                    placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..." 
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={formStatus === 'sending'}
                  ></textarea>
                </div>
                
                {/* Status Messages */}
                {formStatus === 'success' && (
                  <motion.div 
                    className="form-message success"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✅ Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.
                  </motion.div>
                )}
                
                {formStatus === 'error' && (
                  <motion.div 
                    className="form-message error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ❌ Entschuldigung, es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.
                  </motion.div>
                )}
                
                <motion.button
                  type="submit"
                  className="submit-btn"
                  whileHover={{ 
                    scale: formStatus === 'sending' ? 1 : 1.02,
                    boxShadow: formStatus === 'sending' ? undefined : "0 8px 25px rgba(122, 181, 29, 0.3)"
                  }}
                  whileTap={{ scale: formStatus === 'sending' ? 1 : 0.98 }}
                  disabled={formStatus === 'sending'}
                >
                  <span>
                    {formStatus === 'sending' ? '⏳ Wird gesendet...' : '📤 Nachricht senden'}
                  </span>
                  {formStatus === 'idle' && <div className="btn-arrow">→</div>}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact

