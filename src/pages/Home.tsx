import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CounterBox from '../components/CounterBox'
import AnimatedBlueprint from '../components/AnimatedBlueprint'
import './Home.css'

function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Blueprint Background */}
        <AnimatedBlueprint />
        
        {/* Animated Background Elements */}
        <motion.div 
          className="hero-shape hero-shape-1"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="hero-shape hero-shape-2"
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="hero-shape hero-shape-3"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="hero-particle"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
          />
        ))}

        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
          >
            Seit 2018
          </motion.div>
          
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="highlight-text">Lauffer</span> Gartenbau
          </motion.h1>
          
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="separator-line">Erdbau</span>
            <span className="separator-dot">·</span>
            <span className="separator-line">Natursteinhandel</span>
          </motion.h2>
          
          <motion.p
            className="hero-text"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Ihr kompetenter Partner für professionelle Gartengestaltung, zuverlässige Erdbauarbeiten 
            und hochwertigen Natursteinhandel. Seit 2018 verwirklichen wir mit Leidenschaft und 
            Fachkompetenz Ihre Träume von der perfekten Außenanlage.
          </motion.p>
          
          <motion.div
            className="hero-buttons"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link to="/kontakt">
              <motion.button
                className="cta-button cta-primary"
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(122, 181, 29, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                Jetzt Kontakt aufnehmen
              </motion.button>
            </Link>
            <Link to="/projekte">
              <motion.button
                className="cta-button cta-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Unsere Projekte ansehen
              </motion.button>
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="scroll-arrow"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="stats-section">
        <motion.div
          className="stats-container"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Unsere Leistung in Zahlen</h2>
          <div className="stats-grid">
            <CounterBox 
              title="Gesamte Leistung" 
              targetValue={4600} 
              unit="PS"
              delay={200}
            />
            <CounterBox 
              title="Zufriedene Kunden" 
              targetValue={75}
              delay={400}
            />
            <CounterBox 
              title="Realisierte Projekte" 
              targetValue={120}
              delay={600}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Unsere Leistungen
          </motion.h2>
          
          <div className="services-grid">
            <motion.div
              className="service-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>Gartenbau</h3>
              <p>
                Von der ersten Planung bis zur finalen Umsetzung gestalten wir Ihren Traumgarten. 
                Rasenflächen, Bepflanzungen, Bewässerungssysteme – wir kümmern uns um jedes Detail 
                mit höchster Präzision und Fachwissen.
              </p>
            </motion.div>

            <motion.div
              className="service-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3>Erdbau</h3>
              <p>
                Mit modernster Maschinenausstattung führen wir sämtliche Erdbauarbeiten durch. 
                Aushub, Planierung, Fundamente – unsere erfahrenen Fachkräfte arbeiten effizient 
                und zuverlässig für Ihr Bauprojekt.
              </p>
            </motion.div>

            <motion.div
              className="service-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3>Natursteinhandel</h3>
              <p>
                Entdecken Sie unser vielfältiges Sortiment an hochwertigen Natursteinen. 
                Ob Granit, Sandstein oder Basalt – wir beraten Sie kompetent bei der Auswahl 
                des perfekten Materials für Ihre Außengestaltung.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="gallery-preview-section">
        <div className="gallery-preview-container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Einblicke in unsere Arbeit
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Lassen Sie sich von unseren realisierten Projekten inspirieren
          </motion.p>

          <div className="gallery-preview-grid">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <motion.div
                key={item}
                className="gallery-preview-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="gallery-preview-placeholder">
                  <span>Projekt {item}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="gallery-preview-cta"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link to="/galerie">
              <motion.button
                className="cta-button cta-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Zur kompletten Galerie
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

