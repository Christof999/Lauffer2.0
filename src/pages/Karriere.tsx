import { motion } from 'framer-motion'
import './Karriere.css'

function Karriere() {
  const jobOpenings = [
    {
      title: 'Facharbeiter Gartenbau (m/w/d)',
      type: 'Vollzeit',
      description: 'Wir suchen einen erfahrenen Facharbeiter für Gartenbau, der unser Team bei der Realisierung anspruchsvoller Projekte unterstützt.',
      requirements: [
        'Abgeschlossene Ausbildung zum Gärtner oder vergleichbare Qualifikation',
        'Mehrjährige Berufserfahrung im Garten- und Landschaftsbau',
        'Führerschein Klasse B, idealerweise auch BE',
        'Teamfähigkeit und selbstständige Arbeitsweise'
      ]
    },
    {
      title: 'Auszubildender Garten- und Landschaftsbau (m/w/d)',
      type: 'Ausbildung',
      description: 'Starte deine Karriere im Grünen! Wir bieten eine fundierte Ausbildung in einem modernen Betrieb mit vielseitigen Projekten.',
      requirements: [
        'Guter Schulabschluss',
        'Interesse an Pflanzen und Natursteinen',
        'Handwerkliches Geschick',
        'Motivation und Lernbereitschaft',
        'Körperliche Belastbarkeit'
      ]
    },
    {
      title: 'Maschinenführer Erdbau (m/w/d)',
      type: 'Vollzeit',
      description: 'Für unsere Erdbau-Projekte suchen wir einen erfahrenen Maschinenführer mit Expertise im Umgang mit Baggern und anderen Baumaschinen.',
      requirements: [
        'Erfahrung im Führen von Baumaschinen (Bagger, Radlader, etc.)',
        'Idealerweise Ausbildung im Tiefbau oder vergleichbare Qualifikation',
        'Führerschein Klasse C/CE wünschenswert',
        'Zuverlässigkeit und Verantwortungsbewusstsein'
      ]
    }
  ]

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
          {/* Why Work With Us */}
          <motion.div
            className="karriere-intro"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Warum Lauffer Gartenbau?</h2>
            <p>
              Seit 2018 schaffen wir grüne Oasen und beeindruckende Außenanlagen. Als wachsendes 
              Unternehmen bieten wir dir nicht nur einen Job, sondern eine echte Perspektive. 
              Bei uns arbeitest du in einem motivierten Team, an spannenden Projekten und mit 
              modernster Technik. Kurze Entscheidungswege und ein familiäres Arbeitsklima sind 
              bei uns selbstverständlich – auch Bailey freut sich auf dich! 🐕
            </p>
          </motion.div>

          {/* Benefits Grid */}
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
                  <div className="benefit-icon">{benefit.icon}</div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Job Openings */}
          <div className="jobs-section">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Offene Stellen
            </motion.h2>
            <div className="jobs-list">
              {jobOpenings.map((job, index) => (
                <motion.div
                  key={index}
                  className="job-card"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="job-header">
                    <h3>{job.title}</h3>
                    <span className="job-type">{job.type}</span>
                  </div>
                  <p className="job-description">{job.description}</p>
                  <div className="job-requirements">
                    <strong>Das bringst du mit:</strong>
                    <ul>
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <motion.div
            className="application-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Bewirb dich jetzt!</h2>
            <p className="application-intro">
              Du findest dich in einer der Stellen wieder oder möchtest dich initiativ bewerben? 
              Schick uns deine Unterlagen – wir freuen uns auf dich!
            </p>

            <form className="application-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
                  <input type="text" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">E-Mail *</label>
                  <input type="email" id="email" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Telefon</label>
                  <input type="tel" id="phone" />
                </div>
                <div className="form-group">
                  <label htmlFor="position">Gewünschte Position *</label>
                  <select id="position" required>
                    <option value="">Bitte wählen...</option>
                    <option value="facharbeiter-gartenbau">Facharbeiter Gartenbau</option>
                    <option value="azubi">Auszubildender</option>
                    <option value="maschinenfuehrer">Maschinenführer Erdbau</option>
                    <option value="initiativ">Initiativbewerbung</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Deine Nachricht *</label>
                <textarea id="message" rows={6} required placeholder="Erzähl uns etwas über dich und warum du zu Lauffer Gartenbau möchtest..."></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="cv" className="file-label">
                  <span>📎 Lebenslauf & Zeugnisse hochladen</span>
                  <input type="file" id="cv" multiple accept=".pdf,.doc,.docx" />
                </label>
                <small>Erlaubte Formate: PDF, DOC, DOCX (max. 10 MB pro Datei)</small>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input type="checkbox" required />
                  <span>Ich habe die <a href="/datenschutz">Datenschutzerklärung</a> gelesen und akzeptiere diese. *</span>
                </label>
              </div>

              <motion.button
                type="submit"
                className="submit-button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Bewerbung absenden
              </motion.button>
            </form>
          </motion.div>

          {/* Alternative Contact */}
          <motion.div
            className="alternative-contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Oder schick uns deine Bewerbung per E-Mail:</h3>
            <a href="mailto:jobs@lauffer-gartenbau.de" className="email-link">
              jobs@lauffer-gartenbau.de
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Karriere

