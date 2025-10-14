import { motion, AnimatePresence } from 'framer-motion'
import './ProjectModal.css'

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    description: string
    category: string
    detailedDescription: string
    specifications: string[]
    images: string[]
  } | null
}

function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!project) return null

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
          >
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>

            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-category">{project.category}</div>
                <h2>{project.title}</h2>
              </div>

              <div className="modal-images">
                {project.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="modal-image"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <img src={image} alt={`${project.title} - Bild ${index + 1}`} />
                  </motion.div>
                ))}
              </div>

              <div className="modal-body">
                <div className="modal-section">
                  <h3>Projektbeschreibung</h3>
                  <p>{project.detailedDescription}</p>
                </div>

                <div className="modal-section">
                  <h3>Leistungen & Details</h3>
                  <ul className="specifications-list">
                    {project.specifications.map((spec, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                      >
                        {spec}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal

