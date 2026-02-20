import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import galleryData from '../data/galleryData.json'
import './Gallery.css'

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Escape-Taste schließt Lightbox (WCAG 2.1.1)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && selectedImage) {
      setSelectedImage(null)
    }
  }, [selectedImage])

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown)
      // Focus-Trap: Fokus auf Close-Button setzen
      const closeBtn = document.querySelector('.lightbox-close') as HTMLButtonElement
      closeBtn?.focus()
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, handleKeyDown])

  return (
    <div className="gallery">
      <Helmet>
        <title>Galerie – Lauffer Bau | Gartenbau &amp; Natursteinarbeiten</title>
        <meta name="description" content="Bildergalerie von Lauffer Bau: Gartengestaltung, Pflasterarbeiten, Natursteinprojekte und Erdbau in Mittelfranken. Hochwertige Arbeit aus Wolframs-Eschenbach." />
        <link rel="canonical" href="https://lauffer-bau.de/galerie" />
      </Helmet>
      <motion.section
        className="gallery-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="gallery-hero-inner">
          <motion.p
            className="gallery-kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Galerie
          </motion.p>
          <motion.h1
            className="gallery-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Impressionen <span className="gallery-title-accent">unserer Arbeit</span>
          </motion.h1>
          <motion.p
            className="gallery-lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Von weitläufigen Gartenanlagen bis zu präzisen Erdbauarbeiten – lassen Sie sich inspirieren.
          </motion.p>
        </div>
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
            <h2>Einblicke</h2>
            <p>Eine kleine Auswahl – klicken Sie auf ein Bild, um es vergrößert zu betrachten.</p>
          </motion.div>

          <div className="gallery-grid">
            {galleryData.map((image, index) => (
              <motion.div
                key={image.id}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "100px" }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedImage(image.src)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelectedImage(image.src)
                  }
                }}
                aria-label={`${image.alt} - Klicken zum Vergrößern`}
              >
                <div className="gallery-image">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    decoding="async"
                  />
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
            role="dialog"
            aria-modal="true"
            aria-label="Bildansicht vergrößert"
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="lightbox-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Schließen"
              >
                <span aria-hidden="true">✕</span>
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

