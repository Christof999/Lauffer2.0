import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import TeamBlueprint from '../components/TeamBlueprint'
import './Team.css'

interface TeamMember {
  name: string
  position: string
  description: string
  image: string
  email?: string
  phone?: string
}

function Team() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Paul',
      position: 'Geschäftsführer',
      description: 'Als Gründer und Geschäftsführer leitet Paul das Unternehmen seit 2018 mit Leidenschaft und Weitblick. Seine Erfahrung im Gartenbau und sein Auge fürs Detail machen ihn zum Garanten für höchste Qualität bei jedem Projekt.',
      image: '/api/placeholder/400/400',
      email: 'info@lauffer-gartenbau.de',
      phone: '+49 (0) 123 456789'
    },
    {
      name: 'Martin',
      position: 'Facharbeiter Gartenbau',
      description: 'Martin ist unser erfahrener Facharbeiter im Gartenbau. Mit seinem technischen Know-how und handwerklichem Geschick setzt er alle Projekte vom ersten Spatenstich bis zur finalen Bepflanzung präzise um.',
      image: '/api/placeholder/400/400'
    },
    {
      name: 'Michael',
      position: 'Facharbeiter Gartenbau',
      description: 'Michael bringt Kreativität und Präzision in jedes Projekt ein. Seine Expertise im Gartenbau und sein Einsatz für perfekte Ergebnisse machen jeden Garten zu etwas Besonderem.',
      image: '/api/placeholder/400/400'
    },
    {
      name: 'Franky',
      position: 'Bauhelfer',
      description: 'Franky ist unser zuverlässiger Bauhelfer, der mit Tatkraft und Motivation bei jedem Projekt mit anpackt. Seine Unterstützung ist für das Team unverzichtbar.',
      image: '/api/placeholder/400/400'
    },
    {
      name: 'Bailey',
      position: 'Chief Happiness Officer 🐕',
      description: 'Bailey ist der vierbeinige Liebling des Teams und offiziell zuständig für Kundenanfragen, Reklamationen und gute Laune auf der Baustelle. Mit seinem Charme wickelt er jeden Kunden um die Pfote - Leckerlis werden als Bestechung akzeptiert!',
      image: '/api/placeholder/400/400'
    }
  ]

  return (
    <div className="team">
      <motion.section
        className="team-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <TeamBlueprint />
        <motion.div 
          className="hero-decoration"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        />
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Unser Team
        </motion.h1>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Die Menschen hinter unserem Erfolg
        </motion.p>
      </motion.section>

      <section className="team-content">
        <div className="team-container">
          <motion.div
            className="team-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Unser starkes Team</h2>
            <p>
              Unser engagiertes Team arbeitet mit Leidenschaft und Kompetenz an jedem Projekt. 
              Durch kurze Kommunikationswege und persönliche Betreuung garantieren wir höchste Qualität. 
              Vom ersten Beratungsgespräch bis zur finalen Umsetzung sind wir Ihr direkter Ansprechpartner. 
              Und ja - Bailey ist wirklich Teil des Teams! 🐾
            </p>
          </motion.div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                  <div className="team-overlay">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="contact-icon">
                        ✉
                      </a>
                    )}
                    {member.phone && (
                      <a href={`tel:${member.phone}`} className="contact-icon">
                        ☎
                      </a>
                    )}
                  </div>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <div className="team-position">{member.position}</div>
                  <p>{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="team-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Werden Sie Teil unseres Teams!</h2>
            <p>
              Wir sind immer auf der Suche nach motivierten Fachkräften. 
              Interessiert? Dann freuen wir uns auf Ihre Bewerbung!
            </p>
            <Link to="/karriere">
              <motion.button
                className="cta-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Karrieremöglichkeiten
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Team

