import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { canonicalUrl } from '../seo/siteConfig'
import { CONTACT, RATING } from '../seo/business'
import { IconPhone } from '../components/Icons'
import CounterBox from '../components/CounterBox'
import ProjectModal from '../components/ProjectModal'
import ResponsiveImage from '../components/ResponsiveImage'
import projectsData from '../data/projectsData.json'
import servicesData from '../data/servicesData.json'
import faqData from '../data/faqData.json'
import ServiceModal, { type Service } from '../components/ServiceModal'
import './Home.css'

/** Route der Leistungs-Landingpage je Service-ID (interne Verlinkung für SEO). */
const SERVICE_ROUTES: Record<string, string> = {
  gartenbau: '/gartenbau',
  erdbau: '/erdbau',
  naturstein: '/natursteine',
}

const homeFaq = (faqData as Record<string, { question: string; answer: string }[]>).allgemein ?? []

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
      <Helmet>
        <title>Lauffer Bau – Gartenbau, Erdbau &amp; Natursteinhandel in Mittelfranken</title>
        <meta name="description" content="Lauffer Bau aus Wolframs-Eschenbach: Ihr Spezialist für professionelle Gartengestaltung, Erdbauarbeiten und hochwertigen Natursteinhandel in Mittelfranken." />
        <meta property="og:title" content="Lauffer Bau – Gartenbau, Erdbau &amp; Natursteinhandel" />
        <meta property="og:description" content="Ihr Spezialist für Gartengestaltung, Erdbau und Natursteinhandel in Wolframs-Eschenbach, Mittelfranken." />
        <link rel="canonical" href={canonicalUrl('/')} />
      </Helmet>
      {/* Hero Section */}
      <motion.section className="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <div className="hero-content">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            Lauffer <span className="highlight-text">Bau</span>
            <span className="hero-title-line">
              Gartenbau, Erdbau und Natursteinhandel aus Wolframs-Eschenbach in Mittelfranken
            </span>
          </motion.h1>

          <motion.p className="hero-description" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            Ihr kompetenter Partner für professionelle Gartengestaltung, zuverlässige Erdbauarbeiten und hochwertigen Natursteinhandel –
            ästhetisch, funktional und zeitlos.
          </motion.p>

          <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
            <Link to="/kontakt" className="hero-link hero-link--primary">
              Projekt anfragen
            </Link>
            <a href={`tel:${CONTACT.telephoneHref}`} className="hero-link hero-link--phone">
              <IconPhone />
              {CONTACT.telephoneDisplay}
            </a>
            <Link to="/projekte" className="hero-link">
              Unsere Arbeiten
            </Link>
          </motion.div>

          <motion.a
            className="hero-rating"
            href={CONTACT.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <span className="hero-rating-stars" aria-hidden="true">★★★★★</span>
            <span>
              <span className="hero-rating-value">{RATING.value.toLocaleString('de-DE')} von 5</span>{' '}
              aus {RATING.count} Google-Bewertungen
            </span>
          </motion.a>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <div className="scroll-line" />
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="stats-section" aria-label="Lauffer Bau in Zahlen">
        <div className="stats-grid">
          <CounterBox title="Maschinenpark" targetValue={3746} unit="PS" delay={200} />
          <CounterBox title="Erfahrung" targetValue={76} unit="Jahre" delay={400} />
          <CounterBox title="Projekte" targetValue={124} delay={600} />
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2 className="section-title">Unsere Expertise</h2>
          <p className="section-intro">
            Drei Gewerke aus einer Hand: Gartenbau, Erdbau und Natursteinhandel. Jedes mit eigener
            Landingpage, auf der Leistungsumfang und häufige Fragen im Detail stehen.
          </p>
        </div>

        <div className="services-list">
          {(servicesData as Service[]).map((service) => {
            const isErdbau = service.id === 'erdbau' || /erdbau/i.test(service.title)
            const isNaturstein = service.id === 'naturstein' || /naturstein/i.test(service.title)
            const accentClass = isErdbau ? ' service-item--erdbau' : isNaturstein ? ' service-item--naturstein' : ''
            const route = SERVICE_ROUTES[service.id]
            return (
              <div key={service.id} className={`service-item${accentClass}`}>
                <div className="service-item-left">
                  <h3>{service.title}</h3>
                </div>
                <p>{service.subtitle ?? service.description}</p>
                <div className="service-item-actions">
                  <button
                    type="button"
                    className="service-item-detail"
                    onClick={() => handleServiceClick(service)}
                  >
                    Details ansehen
                  </button>
                  {route ? (
                    <Link className="service-item-link" to={route}>
                      {service.title} im Detail
                      <span className="service-item-arrow" aria-hidden="true">→</span>
                    </Link>
                  ) : null}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="gallery-preview-section">
        <div className="section-header">
          <h2 className="section-title">Ausgewählte Arbeiten</h2>
          <p className="section-intro">
            Ein Ausschnitt aus abgeschlossenen Projekten in Mittelfranken – alle Referenzen finden
            Sie auf der <Link to="/projekte">Projektseite</Link>.
          </p>
        </div>

        <div className="home-gallery-grid">
          {projectsData.slice(0, 3).map((project) => (
            <button
              type="button"
              key={project.id}
              className="home-gallery-item"
              onClick={() => handleProjectClick(project as Project)}
            >
              {project.images && project.images.length > 0 ? (
                <ResponsiveImage
                  src={project.images[0]}
                  alt={`${project.title} – ${project.category} von Lauffer Bau in ${project.location}`}
                  width={800}
                  height={1000}
                  sizes="(max-width: 768px) 92vw, 32vw"
                />
              ) : null}
              <span className="home-gallery-caption">
                {project.title} · {project.location}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* FAQ – sichtbare Antworten für Answer Engines (AEO) */}
      {homeFaq.length > 0 ? (
        <section className="home-faq-section" id="faq">
          <div className="section-header">
            <h2 className="section-title">Häufige Fragen an Lauffer Bau</h2>
          </div>
          <dl className="home-faq-list">
            {homeFaq.map((item) => (
              <div className="home-faq-item" key={item.question}>
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

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

