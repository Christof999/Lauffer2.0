import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import './ProjectModal.css'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    subtitle?: string
    description: string
    category: string
    location: string
    date: string
    features: string[]
    images: string[]
  } | null
}

function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Escape-Taste und Pfeiltasten für Slideshow (WCAG 2.1.1)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowLeft' && project && project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
    } else if (e.key === 'ArrowRight' && project && project.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
    }
  }, [onClose, project])

  // Focus-Trap und Keyboard-Handler
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Fokus auf Close-Button beim Öffnen
      setTimeout(() => closeButtonRef.current?.focus(), 100)
      // Body-Scroll verhindern
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [project])

  if (!project) return null

  // Helper function to check if file is a video
  const isVideo = (filename: string) => {
    return filename.toLowerCase().endsWith('.mp4') || 
           filename.toLowerCase().endsWith('.mov') || 
           filename.toLowerCase().endsWith('.webm')
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const currentMedia = project.images[currentImageIndex]
  const isCurrentVideo = isVideo(currentMedia)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            ref={modalRef}
          >
            <button
              className="modal-close"
              onClick={onClose}
              ref={closeButtonRef}
              aria-label="Modal schließen"
            >
              <span aria-hidden="true">✕</span>
            </button>

            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-category">{project.category}</div>
                <h2 id="modal-title">{project.title}</h2>
                {project.subtitle && <h3 className="modal-subtitle">{project.subtitle}</h3>}
                <div className="modal-meta">
                  <span><span aria-hidden="true">📍</span> {project.location}</span>
                  <span><span aria-hidden="true">📅</span> {project.date}</span>
                </div>
              </div>

              {/* Slideshow */}
              <div className="modal-slideshow">
                <div className="slideshow-container">
                  <AnimatePresence initial={false}>
                    {isCurrentVideo ? (
                      <motion.video
                        key={currentMedia}
                        src={currentMedia}
                        controls
                        autoPlay
                        loop
                        muted
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="slideshow-image slideshow-video"
                      />
                    ) : (
                      <motion.img
                        key={currentMedia}
                        src={currentMedia}
                        alt={`${project.title} - Bild ${currentImageIndex + 1}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="slideshow-image"
                      />
                    )}
                  </AnimatePresence>
                  
                  {project.images.length > 1 && (
                    <>
                      <button
                        className="slideshow-btn prev"
                        onClick={prevImage}
                        aria-label="Vorheriges Bild"
                      >
                        <span aria-hidden="true">‹</span>
                      </button>
                      <button
                        className="slideshow-btn next"
                        onClick={nextImage}
                        aria-label="Nächstes Bild"
                      >
                        <span aria-hidden="true">›</span>
                      </button>
                      <div className="slideshow-counter" aria-live="polite">
                        Bild {currentImageIndex + 1} von {project.images.length}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {project.images.length > 1 && (
                  <div className="slideshow-thumbnails" role="tablist" aria-label="Bildauswahl">
                    {project.images.map((image, index) => (
                      <motion.div
                        key={index}
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        role="tab"
                        tabIndex={0}
                        aria-selected={index === currentImageIndex}
                        aria-label={`Bild ${index + 1} von ${project.images.length}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            setCurrentImageIndex(index)
                          }
                        }}
                      >
                        {isVideo(image) ? (
                          <div className="video-thumbnail">
                            <video src={image} muted aria-hidden="true" />
                            <div className="video-play-icon" aria-hidden="true">▶</div>
                          </div>
                        ) : (
                          <img src={image} alt="" aria-hidden="true" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="modal-body">
                <div className="modal-section">
                  <h3>Projektbeschreibung</h3>
                  <p>{project.description}</p>
                </div>

                {project.features && project.features.length > 0 && (
                  <div className="modal-section">
                    <h3>Leistungen</h3>
                    <div className="features-grid">
                      {project.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="feature-tag"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + index * 0.05 }}
                        >
                          {feature}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal

