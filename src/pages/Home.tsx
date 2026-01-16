import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import CounterBox from '../components/CounterBox'
import ProjectModal from '../components/ProjectModal'
import projectsData from '../data/projectsData.json'
import servicesData from '../data/servicesData.json'
import ServiceModal, { type Service } from '../components/ServiceModal'
import './Home.css'

interface Project {
  id: number
  title: string
  subtitle?: string
  description: string
  category: string
  location: string
  date: string
  features: string[]
  images: string[]
}

function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const handleServiceClick = (service: Service) => {
    setSelectedService(service)
    setIsServiceModalOpen(true)
  }

  const handleCloseServiceModal = () => {
    setIsServiceModalOpen(false)
    setTimeout(() => setSelectedService(null), 250)
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section className="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="hero-content">
          <motion.div className="hero-subtitle" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            Gartenbau · Erdbau · Naturstein
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            Lauffer <span className="highlight-text">Bau</span>
          </motion.h1>

          <motion.p className="hero-description" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
            Ihr kompetenter Partner für professionelle Gartengestaltung, zuverlässige Erdbauarbeiten und hochwertigen Natursteinhandel –
            ästhetisch, funktional und zeitlos.
          </motion.p>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}>
            <Link to="/projekte" className="hero-link">
              Unsere Arbeiten
            </Link>
            <Link to="/kontakt" className="hero-link">
              Kontakt
            </Link>
          </motion.div>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <div className="scroll-line" />
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <CounterBox title="Leistung" targetValue={3746} unit="PS" delay={200} />
          <CounterBox title="Erfahrung" targetValue={76} unit="Jahre" delay={400} />
          <CounterBox title="Projekte" targetValue={124} delay={600} />
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <span className="section-label">Was wir tun</span>
          <h2 className="section-title">Unsere Expertise</h2>
        </div>

        <div className="services-list">
          {(servicesData as Service[]).map((service) => (
            (() => {
              const isErdbau = service.id === 'erdbau' || /erdbau/i.test(service.title)
              const isNaturstein = service.id === 'naturstein' || /naturstein/i.test(service.title)
              const accentClass = isErdbau ? ' service-item--erdbau' : isNaturstein ? ' service-item--naturstein' : ''
              return (
            <div
              key={service.id}
              className={`service-item service-item-clickable${accentClass}`}
              role="button"
              tabIndex={0}
              onClick={() => handleServiceClick(service)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleServiceClick(service)
              }}
            >
              <div className="service-item-left">
                <h3>{service.title}</h3>
                <p>{service.subtitle ?? service.description}</p>
              </div>
              <div className="service-item-right" aria-hidden="true">
                <span className="service-item-arrow">→</span>
              </div>
            </div>
              )
            })()
          ))}
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="gallery-preview-section">
        <div className="section-header">
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Ausgewählte Arbeiten</h2>
        </div>

        <div className="gallery-grid">
          {projectsData.slice(0, 3).map((project) => (
            <div
              key={project.id}
              className="gallery-item"
              role="button"
              tabIndex={0}
              onClick={() => handleProjectClick(project as Project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleProjectClick(project as Project)
              }}
              style={{ cursor: 'pointer' }}
            >
              {project.images && project.images.length > 0 ? <img src={project.images[0]} alt={project.title} /> : null}
            </div>
          ))}
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />

      <ServiceModal isOpen={isServiceModalOpen} onClose={handleCloseServiceModal} service={selectedService} />
    </div>
  )
}

export default Home

