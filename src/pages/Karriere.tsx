import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import './Karriere.css'

function Karriere() {
  const benefits = [
    {
      icon: '💰',
      title: 'Faire Bezahlung',
      description: 'Leistungsgerechte Vergütung und pünktliche Gehaltszahlungen'
    },
    {
      icon: '🚗',
      title: 'Firmenwagen',
      description: 'Moderne Fahrzeugflotte und hochwertige Arbeitsgeräte'
    },
    {
      icon: '📚',
      title: 'Weiterbildung',
      description: 'Regelmäßige Schulungen und Fortbildungsmöglichkeiten'
    },
    {
      icon: '👥',
      title: 'Starkes Team',
      description: 'Kollegiales Miteinander und flache Hierarchien'
    },
    {
      icon: '🌴',
      title: 'Urlaubsgeld',
      description: 'Attraktive Zusatzleistungen und Urlaubsregelungen'
    },
    {
      icon: '🎯',
      title: 'Abwechslung',
      description: 'Vielseitige Projekte von Privatgärten bis Gewerbe'
    }
  ]

  return (
    <div className="karriere">
      <Helmet>
        <title>Karriere – Lauffer Bau | Gartenbau &amp; Erdbau in Mittelfranken</title>
        <meta name="description" content="Karriere bei Lauffer Bau in Wolframs-Eschenbach. Werden Sie Teil unseres Teams – wir freuen uns auf Ihre Initiativbewerbung." />
        <link rel="canonical" href="https://lauffer-bau.de/karriere" />
      </Helmet>

      <motion.section
        className="karriere-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="karriere-hero-content">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Karriere bei Lauffer
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Werde Teil unseres Teams und gestalte die Zukunft mit uns!
          </motion.p>
        </div>
      </motion.section>

      <section className="karriere-content">
        <div className="karriere-container">

          {/* Warum Lauffer Bau */}
          <motion.div
            className="karriere-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Warum Lauffer Bau?</h2>
            <p>
              Wir schaffen grüne Oasen und beeindruckende Außenanlagen. Als wachsendes
              Unternehmen bieten wir dir nicht nur einen Job, sondern eine echte Perspektive.
              Bei uns arbeitest du in einem motivierten Team, an spannenden Projekten und mit
              modernster Technik. Kurze Entscheidungswege und ein familiäres Arbeitsklima sind
              bei uns selbstverständlich – auch Bailey freut sich auf dich! <span aria-hidden="true">🐕</span>
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="benefits-section">
            <h2>Deine Vorteile</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="benefit-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="benefit-icon" aria-hidden="true">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Offene Stellen – Platzhalter */}
          <motion.div
            className="jobs-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Offene Stellen</h2>
            <div className="jobs-coming-soon">
              <p className="jobs-coming-soon-text">
                Aktuell sind keine Stellen ausgeschrieben – bleiben Sie gespannt!
                Wir wachsen kontinuierlich und werden neue Positionen in Kürze veröffentlichen.
              </p>
            </div>
          </motion.div>

          {/* Initiativbewerbung */}
          <motion.div
            className="application-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Initiativbewerbung</h2>
            <p className="application-intro">
              Auch wenn gerade keine Stelle ausgeschrieben ist – wir freuen uns jederzeit
              über eine Initiativbewerbung! Schicken Sie uns einfach Ihre Unterlagen per E-Mail
              und wir melden uns bei Ihnen.
            </p>
            <motion.a
              href="mailto:info@lauffer-bau.de?subject=Initiativbewerbung bei Lauffer Bau"
              className="email-apply-btn"
              whileHover={{ scale: 1.03, boxShadow: '0 8px 25px rgba(140, 198, 63, 0.3)' }}
              whileTap={{ scale: 0.97 }}
            >
              <span aria-hidden="true">✉️</span> Initiativbewerbung senden
            </motion.a>
            <p className="application-hint">
              Bitte fügen Sie Ihrer E-Mail einen Lebenslauf und relevante Zeugnisse bei.
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  )
}

export default Karriere
