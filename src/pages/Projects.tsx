import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectModal from '../components/ProjectModal'
import projectsData from '../data/projectsData.json'
import './Projects.css'

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
      <motion.section
        className="projects-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="projects-hero-inner">
          <motion.p
            className="projects-kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Portfolio
          </motion.p>

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
          <div className="projects-grid">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => handleProjectClick(project as Project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleProjectClick(project as Project)
                  }
                }}
                aria-label={`${project.title} - ${project.category} - Klicken für Details`}
              >
                <div className="project-image">
                  {project.images && project.images.length > 0 ? (
                    <img src={project.images[0]} alt={project.title} />
                  ) : (
                    <div className="project-placeholder">Bilder folgen</div>
                  )}
                  <div className="project-category">{project.category}</div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  {project.subtitle && <h4>{project.subtitle}</h4>}
                  <p>{project.description}</p>
                  <div className="project-meta">
                    <span><span aria-hidden="true">📍</span> {project.location}</span>
                    <span><span aria-hidden="true">📅</span> {project.date}</span>
                  </div>
                  <span className="project-link">Mehr erfahren <span aria-hidden="true">→</span></span>
                </div>
              </motion.div>
            ))}
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
