import { motion } from 'framer-motion'
import './Gallery.css'

function Gallery() {
  return (
    <div className="gallery">
      <motion.section
        className="gallery-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Galerie</h1>
        <p>Impressionen unserer Arbeit</p>
      </motion.section>

      <section className="gallery-content">
        <div className="gallery-container">
          <motion.div
            className="gallery-placeholder"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Bildergalerie folgt in Kürze</h2>
            <p>
              Hier werden wir Ihnen bald beeindruckende Bilder unserer realisierten Projekte präsentieren. 
              Von weitläufigen Gartenanlagen über präzise Erdbauarbeiten bis hin zu kunstvoll verlegten 
              Natursteinen – lassen Sie sich von unserer Arbeit inspirieren.
            </p>
            <div className="gallery-grid-placeholder">
              {[...Array(6)].map((_, index) => (
                <motion.div
                  key={index}
                  className="gallery-item-placeholder"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="placeholder-content">
                    <span>Bild {index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Gallery

