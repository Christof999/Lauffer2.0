import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Team.css'

function Team() {
  return (
    <div className="team">
      <motion.section
        className="team-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="team-hero-inner">
          <motion.p
            className="team-kicker"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Team
          </motion.p>
          <motion.h1
            className="team-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Menschen, die <span className="team-title-accent">Qualität</span> möglich machen
          </motion.h1>
          <motion.p
            className="team-lead"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Kurze Wege, klare Kommunikation und Liebe zum Detail – von der Beratung bis zur Umsetzung.
          </motion.p>
        </div>
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
            </p>
          </motion.div>

          {/* Hauptpersonen - Paul und Baily */}
          <div className="team-leaders">
            {/* Paul */}
            <motion.div
              className="leader-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="leader-image">
                <img src="/images/team/Paul_Headshot.JPG" alt="Paul - Geschäftsführer" />
              </div>
              <div className="leader-info">
                <h3>Paul</h3>
                <div className="leader-position">Geschäftsführer</div>
                <p>
                  Als Gründer und Geschäftsführer leitet Paul das Unternehmen mit Leidenschaft und Weitblick. 
                  Seine jahrelange Erfahrung im Gartenbau und sein Auge fürs Detail machen ihn zum Garanten 
                  für höchste Qualität bei jedem Projekt. Paul ist Ihr direkter Ansprechpartner für alle 
                  Fragen rund um Planung und Umsetzung.
                </p>
                <div className="leader-contact">
                  <a href="mailto:info@lauffer-bau.de" className="contact-link">
                    <span className="contact-icon">✉️</span>
                    info@lauffer-bau.de
                  </a>
                  <a href="tel:098758129006" className="contact-link">
                    <span className="contact-icon">📞</span>
                    09875/8129006
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Baily */}
            <motion.div
              className="leader-card"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="leader-image">
                <img src="/images/team/Baily_Headshot.PNG" alt="Bailey - Chief Happiness Officer" />
              </div>
              <div className="leader-info">
                <h3>Bailey</h3>
                <div className="leader-position">Chief Happiness Officer 🐕</div>
                <p>
                  Bailey ist der vierbeinige Liebling des Teams und offiziell zuständig für gute Laune 
                  auf der Baustelle. Mit seinem Charme wickelt er jeden Kunden um die Pfote und sorgt 
                  dafür, dass die Arbeitsatmosphäre immer perfekt ist. Leckerlis werden als Bestechung 
                  gerne akzeptiert! 🐾
                </p>
                <div className="leader-contact">
                  <div className="contact-note">
                    💚 Zuständig für Kundenanfragen und Reklamationen
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Teambild */}
          <motion.div
            className="team-photo-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Unser gesamtes Team</h2>
            <p className="team-photo-subtitle">
              Gemeinsam stark - Unser eingespieltes Team bei der Arbeit
            </p>
            <div className="team-photo">
              <img src="/images/team/Team_fav.JPG" alt="Das gesamte Lauffer Bau Team" />
            </div>
          </motion.div>

          {/* Call to Action */}
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

