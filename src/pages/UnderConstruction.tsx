import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './UnderConstruction.css'

function UnderConstruction() {
  return (
    <div className="under-construction">
      <motion.section
        className="under-construction-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="under-construction-inner">
          <motion.img
            className="under-construction-logo"
            src="/Logo_Lauffer_RGB.png"
            alt="Lauffer Bau"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />

          <motion.p
            className="under-construction-kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Webseite im Aufbau
          </motion.p>

          <motion.h1
            className="under-construction-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Hier entsteht gerade unsere neue Seite.
          </motion.h1>

          <motion.p
            className="under-construction-lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            In der Zwischenzeit sind wir natürlich weiterhin für Sie erreichbar.
          </motion.p>

          <motion.div
            className="under-construction-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link className="under-construction-cta" to="/kontakt">
              Kontaktieren Sie uns
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default UnderConstruction
