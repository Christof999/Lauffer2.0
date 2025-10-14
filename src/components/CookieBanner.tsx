import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CookieBanner.css'

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', 'all')
    setIsVisible(false)
  }

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookieConsent', 'necessary')
    setIsVisible(false)
  }

  const handleSaveSettings = () => {
    localStorage.setItem('cookieConsent', 'custom')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="cookie-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="cookie-content">
            <div className="cookie-header">
              <h3>🍪 Cookie-Einstellungen</h3>
            </div>

            {!showSettings ? (
              <>
                <p>
                  Wir verwenden Cookies, um Ihnen ein optimales Website-Erlebnis zu bieten. 
                  Dazu gehören notwendige Cookies für den Betrieb der Website sowie optionale 
                  Cookies für statistische Zwecke und zur Verbesserung unserer Dienste.
                </p>
                <div className="cookie-buttons">
                  <button 
                    className="cookie-btn cookie-btn-primary"
                    onClick={handleAcceptAll}
                  >
                    Alle akzeptieren
                  </button>
                  <button 
                    className="cookie-btn cookie-btn-secondary"
                    onClick={handleAcceptNecessary}
                  >
                    Nur notwendige
                  </button>
                  <button 
                    className="cookie-btn cookie-btn-text"
                    onClick={() => setShowSettings(true)}
                  >
                    Einstellungen
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="cookie-settings">
                  <div className="cookie-option">
                    <label>
                      <input type="checkbox" checked disabled />
                      <div>
                        <strong>Notwendige Cookies (erforderlich)</strong>
                        <p>Diese Cookies sind für die grundlegende Funktionalität der Website erforderlich.</p>
                      </div>
                    </label>
                  </div>
                  <div className="cookie-option">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <div>
                        <strong>Statistische Cookies</strong>
                        <p>Helfen uns zu verstehen, wie Besucher mit der Website interagieren.</p>
                      </div>
                    </label>
                  </div>
                  <div className="cookie-option">
                    <label>
                      <input type="checkbox" defaultChecked />
                      <div>
                        <strong>Marketing Cookies</strong>
                        <p>Werden verwendet, um Besuchern relevante Anzeigen zu zeigen.</p>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="cookie-buttons">
                  <button 
                    className="cookie-btn cookie-btn-primary"
                    onClick={handleSaveSettings}
                  >
                    Einstellungen speichern
                  </button>
                  <button 
                    className="cookie-btn cookie-btn-text"
                    onClick={() => setShowSettings(false)}
                  >
                    Zurück
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner

