import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import AnimatedMap from '../components/AnimatedMap'
import { MAPBOX_CONFIG, LOCATIONS } from '../config/mapbox'
import './MapDemo.css'

const MapDemo: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)

  // Konfiguration für Lauffer Bau
  const mapboxToken = MAPBOX_CONFIG.token
  const startLocation = LOCATIONS.start.coordinates
  const endLocation = LOCATIONS.destination.coordinates
  const companyName = LOCATIONS.destination.name

  return (
    <div className="map-demo">
      {/* Hero Section */}
      <motion.section
        className="map-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Finden Sie uns
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Scrollen Sie nach unten, um unseren Standort in Wolframs-Eschenbach zu sehen
          </motion.p>
        </div>
      </motion.section>

      {/* Spacer for scroll effect */}
      <div className="scroll-spacer" />

      {/* Map Section */}
      <motion.section
        ref={containerRef}
        className="map-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="map-wrapper">
          <AnimatedMap
            mapboxToken={mapboxToken}
            startLocation={startLocation}
            endLocation={endLocation}
            companyName={companyName}
            containerRef={containerRef}
          />
        </div>
        
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
      </motion.section>

      {/* Additional content for scroll effect */}
      <section className="additional-content">
        <div className="content-container">
          <motion.div
            className="content-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Wir sind für Sie da</h2>
            <p>
            Unser Standort in Wolframs-Eschenbach ist strategisch günstig gelegen und 
            ermöglicht es uns, Kunden in der gesamten Region Mittelfranken zu betreuen. 
            Besuchen Sie uns gerne vor Ort!
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default MapDemo
