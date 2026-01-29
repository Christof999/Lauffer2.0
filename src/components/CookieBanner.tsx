import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CookieBanner.css'

function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [, setLocationPermission] = useState<boolean | null>(null)

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = async () => {
    localStorage.setItem('cookieConsent', 'all')
    
    // Request location permission
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName })
      if (permission.state === 'granted') {
        setLocationPermission(true)
        localStorage.setItem('locationPermission', 'granted')
      } else {
        // Fallback for browsers that don't support permissions API
        navigator.geolocation.getCurrentPosition(
          () => {
            setLocationPermission(true)
            localStorage.setItem('locationPermission', 'granted')
          },
          () => {
            setLocationPermission(false)
            localStorage.setItem('locationPermission', 'denied')
          }
        )
      }
    } catch {
      console.log('Location permission not supported')
    }
    
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
                <p className="location-notice">
                  📍 <strong>Standort-Berechtigung:</strong> Für eine personalisierte Route zu unserem Standort 
                  benötigen wir Ihre Erlaubnis, Ihren aktuellen Standort zu ermitteln. Dies hilft uns, 
                  Ihnen die beste Anfahrtsroute zu zeigen.
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

