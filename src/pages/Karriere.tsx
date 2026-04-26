import type { FC } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import './Karriere.css'

const IconPayment: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </svg>
)

const IconVehicle: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 17h14v-5l-2-4H7L5 12v5z" />
    <circle cx="7.5" cy="17" r="1.5" />
    <circle cx="16.5" cy="17" r="1.5" />
  </svg>
)

const IconEducation: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)

const IconTeam: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const IconCalendar: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

const IconVariety: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </svg>
)

const IconMail: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

function Karriere() {
  const benefits: { title: string; description: string; Icon: FC }[] = [
    {
      Icon: IconPayment,
      title: 'Faire Bezahlung',
      description: 'Leistungsgerechte Vergütung und pünktliche Gehaltszahlungen',
    },
    {
      Icon: IconVehicle,
      title: 'Firmenwagen',
      description: 'Moderne Fahrzeugflotte und hochwertige Arbeitsgeräte',
    },
    {
      Icon: IconEducation,
      title: 'Weiterbildung',
      description: 'Regelmäßige Schulungen und Fortbildungsmöglichkeiten',
    },
    {
      Icon: IconTeam,
      title: 'Starkes Team',
      description: 'Kollegiales Miteinander und flache Hierarchien',
    },
    {
      Icon: IconCalendar,
      title: 'Urlaubsgeld',
      description: 'Attraktive Zusatzleistungen und Urlaubsregelungen',
    },
    {
      Icon: IconVariety,
      title: 'Abwechslung',
      description: 'Vielseitige Projekte von Privatgärten bis Gewerbe',
    },
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
          <motion.p
            className="karriere-kicker"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Karriere
          </motion.p>
          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Karriere bei Lauffer Bau
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Werden Sie Teil unseres Teams und gestalten Sie mit uns hochwertige Außenanlagen in Mittelfranken.
          </motion.p>
        </div>
      </motion.section>

      <section className="karriere-content">
        <div className="karriere-container">

          <motion.div
            className="karriere-intro"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Warum Lauffer Bau?</h2>
            <p>
              Wir schaffen grüne Oasen und beeindruckende Außenanlagen. Als wachsendes
              Unternehmen bieten wir nicht nur einen Arbeitsplatz, sondern eine echte Perspektive.
              Sie arbeiten in einem motivierten Team an abwechslungsreichen Projekten mit
              moderner Technik. Kurze Entscheidungswege und ein familiäres Arbeitsklima sind
              bei uns selbstverständlich.
            </p>
          </motion.div>

          <div className="benefits-section">
            <h2>Ihre Vorteile</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => {
                const { Icon } = benefit
                return (
                  <motion.div
                    key={benefit.title}
                    className="benefit-card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="benefit-icon" aria-hidden>
                      <Icon />
                    </div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <motion.div
            className="jobs-section"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Offene Stellen</h2>
            <div className="jobs-coming-soon">
              <p className="jobs-coming-soon-text">
                Aktuell sind keine Stellen ausgeschrieben – bleiben Sie gespannt.
                Wir wachsen kontinuierlich und veröffentlichen neue Positionen, sobald sie feststehen.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="application-section"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Initiativbewerbung</h2>
            <p className="application-intro">
              Auch wenn gerade keine Stelle ausgeschrieben ist, freuen wir uns über eine Initiativbewerbung.
              Senden Sie uns Ihre Unterlagen per E-Mail – wir melden uns bei Ihnen.
            </p>
            <motion.a
              href="mailto:info@lauffer-bau.de?subject=Initiativbewerbung bei Lauffer Bau"
              className="email-apply-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <IconMail />
              Initiativbewerbung senden
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
