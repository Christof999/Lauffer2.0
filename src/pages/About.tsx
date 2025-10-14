import { motion } from 'framer-motion'
import AboutBlueprint from '../components/AboutBlueprint'
import './About.css'

function About() {
  return (
    <div className="about">
      <motion.section
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <AboutBlueprint />
        <h1>Über Uns</h1>
      </motion.section>

      <section className="about-content">
        <div className="content-container">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Willkommen bei Lauffer Gartenbau</h2>
            <p>
              Seit 2018 steht der Name Lauffer für Qualität, Zuverlässigkeit und 
              Kompetenz im Bereich Gartenbau, Erdbau und Natursteinhandel. Mit frischem Elan und 
              modernster Technik haben wir uns in der Region als zuverlässiger Partner etabliert.
            </p>
            <p>
              Unser Erfolgsrezept ist einfach: Leidenschaft für unsere Arbeit, höchste Qualitätsansprüche 
              und die Zufriedenheit unserer Kunden stehen bei uns an erster Stelle. Mit unserem 
              engagierten Team und modernster Maschinenausstattung setzen wir Projekte 
              jeder Größenordnung professionell um.
            </p>
          </motion.div>

          <motion.div
            className="about-values"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2>Unsere Werte</h2>
            <div className="values-grid">
              <div className="value-item">
                <h3>Qualität</h3>
                <p>Höchste Standards bei Material und Ausführung</p>
              </div>
              <div className="value-item">
                <h3>Innovation</h3>
                <p>Moderne Technik und frische Ideen seit 2018</p>
              </div>
              <div className="value-item">
                <h3>Zuverlässigkeit</h3>
                <p>Pünktliche und professionelle Projektabwicklung</p>
              </div>
              <div className="value-item">
                <h3>Kundenzufriedenheit</h3>
                <p>Ihre Wünsche sind unsere Motivation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About

