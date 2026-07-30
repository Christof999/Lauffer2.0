import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { canonicalUrl } from '../seo/siteConfig'
import ProjectModal from '../components/ProjectModal'
import ResponsiveImage from '../components/ResponsiveImage'
import projectsData from '../data/projectsData.json'
import './Projects.css'

/* Interne Verlinkung: Projektkategorie → passende Leistungsseite */
const CATEGORY_TO_SERVICE: Record<string, string | undefined> = {
  Gartenbau: '/gartenbau',
  Erdbau: '/erdbau',
  Natursteinhandel: '/natursteine',
  Bautenschutz: undefined,
}

interface Project {
  id: number
  title: string
  subtitle?: string
  description: string
  category: string
  location: string
  date: string
  images: string[]
  features: string[]
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div className="projects">
      <Helmet>
        <title>Projekte – Lauffer Bau | Referenzen Gartenbau &amp; Erdbau</title>
        <meta name="description" content="Referenzprojekte von Lauffer Bau: Gartengestaltung, Pflasterarbeiten, Erdbau und Natursteinarbeiten in Mittelfranken. Lassen Sie sich von unseren Arbeiten inspirieren." />
        <link rel="canonical" href={canonicalUrl('/projekte')} />
      </Helmet>
      <motion.section
        className="projects-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="projects-hero-inner">

          <motion.h1
            className="projects-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Unsere <span className="projects-title-accent">Projekte</span>
          </motion.h1>

          <motion.p
            className="projects-lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Eine Auswahl unserer erfolgreich realisierten Projekte – präzise, hochwertig und zeitlos.
          </motion.p>
        </div>
      </motion.section>

      <section className="projects-content">
        <div className="projects-container">
          <h2 className="projects-grid-heading">Referenzen aus Gartenbau, Erdbau und Natursteinarbeiten</h2>
          <div className="projects-grid">
            {projectsData.map((project, index) => {
              const servicePath = CATEGORY_TO_SERVICE[project.category]
              return (
                <motion.article
                  key={project.id}
                  className="project-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4) }}
                  whileHover={{ y: -10 }}
                  onClick={() => handleProjectClick(project as Project)}
                >
                  <div className="project-image">
                    {project.images && project.images.length > 0 ? (
                      <ResponsiveImage
                        src={project.images[0]}
                        alt={`${project.title} – ${project.category} von Lauffer Bau in ${project.location}`}
                        sizes="(max-width: 768px) 92vw, (max-width: 1200px) 46vw, 30vw"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="project-placeholder">Bilder folgen</div>
                    )}
                    <div className="project-category">{project.category}</div>
                  </div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
                    <p>{project.description}</p>
                    <div className="project-meta">
                      <span>{project.location}</span>
                      <span>{project.date}</span>
                    </div>
                    <div className="project-card-actions">
                      {/* Echter Button: Karte ist per Tastatur erreichbar, ohne
                          verschachtelte interaktive Elemente in einem role=button */}
                      <button
                        type="button"
                        className="project-link"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleProjectClick(project as Project)
                        }}
                      >
                        Projekt ansehen
                        <span aria-hidden="true">→</span>
                      </button>
                      {servicePath ? (
                        <Link
                          className="project-service-link"
                          to={servicePath}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Leistung: {project.category}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  )
}

export default Projects
