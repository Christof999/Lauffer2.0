import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './ServiceModal.css'

export interface Service {
  id: string
  title: string
  subtitle?: string
  description: string
  scope: string[]
  images: string[]
}

type Props = {
  isOpen: boolean
  onClose: () => void
  service: Service | null
}

export default function ServiceModal({ isOpen, onClose, service }: Props) {
  const images = useMemo(() => service?.images ?? [], [service])
  const hasImages = images.length > 0
  const [activeIndex, setActiveIndex] = useState(0)
  const isErdbau = service?.id === 'erdbau' || (service?.title ? /erdbau/i.test(service.title) : false)
  const isNaturstein = service?.id === 'naturstein' || (service?.title ? /naturstein/i.test(service.title) : false)

  useEffect(() => {
    if (!isOpen) return
    setActiveIndex(0)
  }, [isOpen, service?.id])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (!hasImages) return
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % images.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose, hasImages, images.length])

  const activeSrc = hasImages ? images[activeIndex] : null

  return (
    <AnimatePresence>
      {isOpen && service && (
        <>
          <motion.div
            className="service-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            className={`service-modal${isErdbau ? ' service-modal--erdbau' : isNaturstein ? ' service-modal--naturstein' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={service.title}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <button className="service-modal-close" onClick={onClose} aria-label="Schließen">
              ✕
            </button>

            <div className="service-modal-header">
              <p className="service-modal-kicker">Leistung</p>
              <h2 className="service-modal-title">
                {service.title} {service.subtitle ? <span className="service-modal-subtitle">— {service.subtitle}</span> : null}
              </h2>
            </div>

            <div className="service-modal-body">
              <div className="service-modal-left">
                <p className="service-modal-description">{service.description}</p>

                <h3 className="service-modal-section-title">Leistungsumfang</h3>
                <ul className="service-modal-scope">
                  {service.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="service-modal-right">
                <div className="service-modal-media">
                  {activeSrc ? (
                    <>
                      <img className="service-modal-image" src={activeSrc} alt={service.title} />
                      {images.length > 1 && (
                        <>
                          <button
                            className="service-modal-nav service-modal-prev"
                            onClick={() => setActiveIndex((i) => (i - 1 + images.length) % images.length)}
                            aria-label="Vorheriges Bild"
                          >
                            ‹
                          </button>
                          <button
                            className="service-modal-nav service-modal-next"
                            onClick={() => setActiveIndex((i) => (i + 1) % images.length)}
                            aria-label="Nächstes Bild"
                          >
                            ›
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="service-modal-placeholder">
                      <p>Hier kannst du Bilder hinterlegen.</p>
                      <p className="service-modal-placeholder-hint">In `src/data/servicesData.json` → `images: [\"/images/...jpg\"]`</p>
                    </div>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="service-modal-thumbs" aria-label="Bildauswahl">
                    {images.map((src, idx) => (
                      <button
                        key={src}
                        className={`service-modal-thumb ${idx === activeIndex ? 'active' : ''}`}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Bild ${idx + 1}`}
                      >
                        <img src={src} alt="" />
                      </button>
                    ))}
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

