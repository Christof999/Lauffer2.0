import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectModal from '../components/ProjectModal'
import ProjectsBlueprint from '../components/ProjectsBlueprint'
import './Projects.css'

interface Project {
  title: string
  description: string
  category: string
  image: string
  detailedDescription: string
  specifications: string[]
  images: string[]
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const projects: Project[] = [
    {
      title: 'Moderne Terrassenanlage',
      description: 'Komplette Neugestaltung einer 200m² Terrasse mit Natursteinplatten und integrierter Beleuchtung.',
      category: 'Gartenbau',
      image: '/api/placeholder/400/300',
      detailedDescription: 'Für dieses Projekt haben wir eine großzügige Terrassenfläche von 200m² komplett neu gestaltet. Die Verwendung hochwertiger Natursteinplatten in Kombination mit einer maßgeschneiderten LED-Beleuchtung schafft eine einladende Atmosphäre für gesellige Abende. Die integrierte Drainage sorgt für optimale Wasserableitung auch bei starken Regenfällen.',
      specifications: [
        '200m² Terrassenfläche',
        'Hochwertige Granit-Natursteinplatten',
        'LED-Beleuchtungssystem mit Dämmerungssensor',
        'Integrierte Drainage-Lösung',
        'Randgestaltung mit Pflanzkübeln',
        'Projektdauer: 3 Wochen'
      ],
      images: [
        '/api/placeholder/600/400',
        '/api/placeholder/600/400',
        '/api/placeholder/600/400'
      ]
    },
    {
      title: 'Grundstückserschließung Wohngebiet',
      description: 'Erdbauarbeiten für 15 Baugrundstücke inkl. Kanalisation und Wegebau.',
      category: 'Erdbau',
      image: '/api/placeholder/400/300',
      detailedDescription: 'Umfassende Erdbauarbeiten für ein neues Wohngebiet mit 15 Parzellen. Von der ersten Vermessung über den Aushub bis zur Verlegung der kompletten Infrastruktur haben wir alle Gewerke koordiniert und fachgerecht ausgeführt. Das Projekt wurde termingerecht und im Budgetrahmen abgeschlossen.',
      specifications: [
        '15 Baugrundstücke à 500-800m²',
        'Komplette Kanalisation inkl. Regenwasser',
        'Wegebau mit Asphaltierung',
        'Verlegung von Strom- und Wasserleitungen',
        'Höhenausgleich und Planierung',
        'Projektdauer: 4 Monate'
      ],
      images: [
        '/api/placeholder/600/400',
        '/api/placeholder/600/400'
      ]
    },
    {
      title: 'Natursteinmauer & Hangsicherung',
      description: 'Errichtung einer 25m langen Natursteinmauer zur Hangsicherung mit Drainage.',
      category: 'Naturstein',
      image: '/api/placeholder/400/300',
      detailedDescription: 'Diese beeindruckende Natursteinmauer dient nicht nur der Hangsicherung, sondern ist auch ein optisches Highlight. Die Verwendung von regionalem Sandstein fügt sich perfekt in die Umgebung ein. Ein ausgeklügeltes Drainagesystem verhindert Staunässe und erhöht die Langlebigkeit der Konstruktion erheblich.',
      specifications: [
        '25 Meter Länge, bis zu 2,5m Höhe',
        'Regionaler Sandstein',
        'Hinterlüftete Drainage-Konstruktion',
        'Fundament mit Frostschutz',
        'Integrierte Hangbepflanzung',
        'Projektdauer: 5 Wochen'
      ],
      images: [
        '/api/placeholder/600/400',
        '/api/placeholder/600/400',
        '/api/placeholder/600/400'
      ]
    },
    {
      title: 'Japangarten mit Teichanlage',
      description: 'Gestaltung eines asiatisch inspirierten Gartens mit Koiteich und Bambuspflanzungen.',
      category: 'Gartenbau',
      image: '/api/placeholder/400/300',
      detailedDescription: 'Ein Ort der Ruhe und Meditation – dieser Japangarten wurde nach traditionellen Prinzipien gestaltet. Der zentrale Koiteich mit hochwertiger Filtertechnik bietet den Fischen optimale Lebensbedingungen. Sorgfältig ausgewählte Pflanzen, Steine und ein authentischer Bambushain schaffen eine harmonische Atmosphäre.',
      specifications: [
        'Koiteich mit 15.000 Liter Volumen',
        'Mehrkammer-Filtersystem',
        'Traditionelle Steinlaterne',
        'Bambus- und Ahornpflanzungen',
        'Kieswege im Zen-Stil',
        'Projektdauer: 6 Wochen'
      ],
      images: [
        '/api/placeholder/600/400',
        '/api/placeholder/600/400'
      ]
    },
    {
      title: 'Gewerbepark Außenanlage',
      description: 'Komplette Außengestaltung eines Gewerbeparks mit Parkplätzen und Grünflächen.',
      category: 'Erdbau',
      image: '/api/placeholder/400/300',
      detailedDescription: 'Für diesen Gewerbepark haben wir eine funktionale und zugleich repräsentative Außenanlage geschaffen. Großzügige Parkplätze, gepflegte Grünflächen und eine durchdachte Wegeführung sorgen für einen professionellen ersten Eindruck. Die Drainage wurde so konzipiert, dass Regenwasser versickern kann.',
      specifications: [
        '120 Parkplätze mit Markierung',
        '2.500m² Grünflächen mit Bewässerung',
        'Barrierefreie Wegeführung',
        'LED-Außenbeleuchtung',
        'Versickerungsfähige Pflasterung',
        'Projektdauer: 3 Monate'
      ],
      images: [
        '/api/placeholder/600/400',
        '/api/placeholder/600/400',
        '/api/placeholder/600/400'
      ]
    },
    {
      title: 'Poolumrandung Premium',
      description: 'Hochwertige Poolumrandung mit rutschfesten Natursteinplatten und Poolhaus.',
      category: 'Naturstein',
      image: '/api/placeholder/400/300',
      detailedDescription: 'Diese Premium-Poolanlage vereint Ästhetik und Funktionalität. Die rutschfesten Travertin-Platten bieten auch bei Nässe sicheren Halt. Das dazugehörige Poolhaus wurde im gleichen Stil gestaltet und bietet Platz für Technik und Lounge-Bereich. Eine integrierte Außendusche rundet das Gesamtkonzept ab.',
      specifications: [
        'Travertin-Natursteinplatten rutschfest',
        'Pool: 4x8 Meter mit Überlaufrinne',
        'Poolhaus mit Technikraum und Lounge',
        'Integrierte Außendusche',
        'Indirekte LED-Beleuchtung',
        'Projektdauer: 8 Wochen'
      ],
      images: [
        '/api/placeholder/600/400',
        '/api/placeholder/600/400'
      ]
    }
  ]

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
        <ProjectsBlueprint />
        <h1>Unsere Projekte</h1>
        <p>Eine Auswahl unserer erfolgreich realisierten Projekte</p>
      </motion.section>

      <section className="projects-content">
        <div className="projects-container">
          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className="project-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-category">{project.category}</div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className="project-link">Mehr erfahren →</span>
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
