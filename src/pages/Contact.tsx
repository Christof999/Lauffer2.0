import { motion } from 'framer-motion'
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
        <h1>Kontakt</h1>
        <p>Wir freuen uns auf Ihre Anfrage</p>
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
            <h2>Lauffer Bau</h2>
            <h3>Erdbau · Natursteinhandel</h3>
            
            <div className="info-item">
              <h4>Adresse</h4>
              <p>Waizendorfer Str. 6<br />91639 Wolframs-Eschenbach</p>
            </div>

            <div className="info-item">
              <h4>Telefon</h4>
              <p>09875/8129006</p>
            </div>

            <div className="info-item">
              <h4>E-Mail</h4>
              <p>info@lauffer-bau.de</p>
            </div>

            <div className="info-item">
              <h4>Öffnungszeiten</h4>
              <p>
                Montag - Freitag: 07:00 - 17:00 Uhr<br />
                Samstag: 08:00 - 12:00 Uhr<br />
                Sonntag: Geschlossen
              </p>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Anfrage senden</h2>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Name" required />
              </div>
              
              <div className="form-group">
                <input type="email" placeholder="E-Mail" required />
              </div>
              
              <div className="form-group">
                <input type="tel" placeholder="Telefon" />
              </div>
              
              <div className="form-group">
                <select required>
                  <option value="">Betreff auswählen</option>
                  <option value="gartenbau">Gartenbau</option>
                  <option value="erdbau">Erdbau</option>
                  <option value="naturstein">Natursteinhandel</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>
              
              <div className="form-group">
                <textarea placeholder="Ihre Nachricht" rows={6} required></textarea>
              </div>
              
              <motion.button
                type="submit"
                className="submit-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Nachricht senden
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact

