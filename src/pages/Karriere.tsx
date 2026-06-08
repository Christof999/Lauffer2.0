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

const SITE_URL = 'https://lauffer-bau.de'

const job = {
  title: 'Handwerklicher Allrounder (m/w/d)',
  subtitle: 'Garten- & Landschaftsbau · Vollzeit',
  type: 'Vollzeit',
  location: 'Wolframs-Eschenbach, Mittelfranken',
  intro:
    'Sie sind handwerklich geschickt und haben Lust, sich immer wieder neuen Aufgaben zu stellen? Dann werden Sie unser Allrounder im Garten- und Landschaftsbau. Bei uns erwartet Sie ein abwechslungsreicher Arbeitsalltag rund um Gartenbau, Erdbau und Natursteinarbeiten – an der frischen Luft und in einem eingespielten Team.',
  tasks: [
    'Anlage und Gestaltung von Außenanlagen: Terrassen, Wege und Einfassungen',
    'Pflaster-, Platten- und Natursteinarbeiten, z. B. Mauern und Stufenanlagen',
    'Erdarbeiten wie Aushub, Planierung und Unterbau für Wege und Terrassen',
    'Pflanzarbeiten, Rasenflächen sowie Bewässerung und Entwässerung',
    'Pflege- und Instandhaltungsarbeiten an bestehenden Anlagen',
  ],
  requirements: [
    'Handwerkliches Geschick und Freude an abwechslungsreicher Arbeit im Freien',
    'Idealerweise erste Erfahrung im Garten- und Landschaftsbau, Tiefbau oder Handwerk',
    'Lust, sich in neue Aufgabenbereiche einzuarbeiten',
    'Zuverlässigkeit, Teamfähigkeit und selbstständige Arbeitsweise',
    'Führerschein Klasse B von Vorteil',
  ],
}

const jobApplyHref = `mailto:info@lauffer-bau.de?subject=${encodeURIComponent(
  `Bewerbung: ${job.title}`,
)}`

// JSON-LD für Google for Jobs (Rich Result) – Beschreibung aus denselben Daten erzeugt
const jobDescriptionHtml = [
  `<p>${job.intro}</p>`,
  '<p><strong>Ihre Aufgaben:</strong></p>',
  `<ul>${job.tasks.map((t) => `<li>${t}</li>`).join('')}</ul>`,
  '<p><strong>Das bringen Sie mit:</strong></p>',
  `<ul>${job.requirements.map((r) => `<li>${r}</li>`).join('')}</ul>`,
].join('')

const jobPostingLd = {
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.title,
  description: jobDescriptionHtml,
  datePosted: '2026-06-05',
  validThrough: '2026-12-31',
  employmentType: 'FULL_TIME',
  hiringOrganization: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Lauffer Bau · Erdbau · Natursteinhandel',
    sameAs: SITE_URL,
    logo: `${SITE_URL}/Logo_Lauffer_RGB.png`,
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Waizendorfer Str. 6',
      postalCode: '91639',
      addressLocality: 'Wolframs-Eschenbach',
      addressRegion: 'Bayern',
      addressCountry: 'DE',
    },
  },
  applicantLocationRequirements: {
    '@type': 'Country',
    name: 'Deutschland',
  },
  directApply: true,
  identifier: {
    '@type': 'PropertyValue',
    name: 'Lauffer Bau',
    value: 'allrounder-galabau-2026',
  },
}

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
      Icon: IconVariety,
      title: 'Abwechslung',
      description: 'Vielseitige Projekte von Privatgärten bis Gewerbe',
    },
  ]

  return (
    <div className="karriere">
      <Helmet>
        <title>Karriere – Lauffer Bau | Handwerklicher Allrounder (m/w/d) gesucht</title>
        <meta name="description" content="Jetzt bewerben bei Lauffer Bau in Wolframs-Eschenbach: Wir suchen einen handwerklichen Allrounder (m/w/d) für Gartenbau, Erdbau und Natursteinarbeiten in Mittelfranken." />
        <link rel="canonical" href="https://lauffer-bau.de/karriere" />
        <script type="application/ld+json">{JSON.stringify(jobPostingLd)}</script>
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
            <article className="job-card">
              <div className="job-card-header">
                <div>
                  <h3 className="job-title">{job.title}</h3>
                  <p className="job-subtitle">{job.subtitle}</p>
                </div>
                <ul className="job-tags" aria-label="Eckdaten">
                  <li>{job.type}</li>
                  <li>{job.location}</li>
                </ul>
              </div>

              <p className="job-description">{job.intro}</p>

              <div className="job-columns">
                <div className="job-block">
                  <h4>Ihre Aufgaben</h4>
                  <ul>
                    {job.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </div>
                <div className="job-block">
                  <h4>Das bringen Sie mit</h4>
                  <ul>
                    {job.requirements.map((req) => (
                      <li key={req}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <motion.a
                href={jobApplyHref}
                className="job-apply-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconMail />
                Jetzt bewerben
              </motion.a>
            </article>
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
              Sie passen nicht genau auf die ausgeschriebene Stelle, möchten aber trotzdem Teil
              des Teams werden? Auch über eine Initiativbewerbung freuen wir uns.
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
