import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import galleryData from '../data/galleryData.json'
import './Gallery.css'

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
            className="gallery-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Einblicke in unsere Arbeit</h2>
            <p>
              Von weitläufigen Gartenanlagen über präzise Erdbauarbeiten bis hin zu kunstvoll verlegten 
              Natursteinen – lassen Sie sich von unserer Arbeit inspirieren.
            </p>
          </motion.div>

          <div className="gallery-grid">
            {galleryData.map((image, index) => (
              <motion.div
                key={image.id}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="gallery-image">
                  <img src={image.src} alt={image.alt} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox für vergrößerte Ansicht */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setSelectedImage(null)}>
                ✕
              </button>
              <img key={selectedImage} src={selectedImage} alt="Vergrößerte Ansicht" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery

