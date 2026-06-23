import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import servicesData from '../data/servicesData.json'
import faqData from '../data/faqData.json'
import type { Service } from '../components/ServiceModal'
import { canonicalUrl } from '../seo/siteConfig'
import './ServiceLanding.css'

type Faq = { question: string; answer: string }

const slugToId: Record<string, string> = {
  gartenbau: 'gartenbau',
  erdbau: 'erdbau',
  natursteine: 'naturstein',
}

function pathToSlug(pathname: string): string | undefined {
  const p = pathname.replace(/\/$/, '') || '/'
  if (p === '/gartenbau') return 'gartenbau'
  if (p === '/erdbau') return 'erdbau'
  if (p === '/natursteine') return 'natursteine'
  return undefined
}

function ServiceLanding() {
  const { pathname } = useLocation()
  const slug = pathToSlug(pathname)
  const serviceId = slug ? slugToId[slug] : undefined
  const service = (servicesData as Service[]).find((s) => s.id === serviceId)

  if (!service) {
    return (
      <div className="service-landing service-landing--missing">
        <Helmet>
          <title>Leistung nicht gefunden – Lauffer Bau</title>
          <meta name="robots" content="noindex,follow" />
        </Helmet>
        <p>Diese Seite existiert nicht.</p>
        <Link to="/">Zur Startseite</Link>
      </div>
    )
  }

  const faqs: Faq[] = slug ? ((faqData as Record<string, Faq[]>)[slug] ?? []) : []
  const path = slug === 'natursteine' ? '/natursteine' : `/${slug}`
  const canonical = canonicalUrl(path)
  const title =
    service.id === 'gartenbau'
      ? 'Gartenbau – Lauffer Bau | Planung & Gartengestaltung Mittelfranken'
      : service.id === 'erdbau'
        ? 'Erdbau – Lauffer Bau | Aushub & Fundament Mittelfranken'
        : 'Natursteinhandel – Lauffer Bau | Naturstein & Pflaster Mittelfranken'
  const description =
    service.id === 'gartenbau'
      ? 'Gartenbau von Lauffer Bau: Planung, Gestaltung und Pflege in Wolframs-Eschenbach und Mittelfranken. Terrassen, Wege, Pflanzarbeiten und Bewässerung.'
      : service.id === 'erdbau'
        ? 'Erdbau von Lauffer Bau in Mittelfranken: Aushub, Planierung, Unterbau für Wege und Terrassen, Drainage und Materiallogistik.'
        : 'Natursteinhandel Lauffer Bau: Beratung, Lieferung und fachgerechte Verarbeitung von Naturstein in Wolframs-Eschenbach und Mittelfranken.'

  return (
    <div className="service-landing">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
      </Helmet>

      <motion.section
        className="service-landing-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="service-landing-kicker">Leistung</p>
        <h1>{service.title}</h1>
        {service.subtitle ? <p className="service-landing-sub">{service.subtitle}</p> : null}
      </motion.section>

      <section className="service-landing-body">
        <div className="service-landing-inner">
          <p className="service-landing-lead">{service.description}</p>
          {service.scope?.length ? (
            <>
              <h2>Leistungsumfang</h2>
              <ul>
                {service.scope.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </>
          ) : null}
          <p className="service-landing-cta">
            <Link to="/kontakt" className="service-landing-link">
              Jetzt anfragen
            </Link>
            <Link to="/" className="service-landing-link service-landing-link--muted">
              Zur Startseite
            </Link>
          </p>
        </div>
      </section>

      {faqs.length ? (
        <section className="service-landing-faq" aria-labelledby="faq-heading">
          <div className="service-landing-inner">
            <h2 id="faq-heading">Häufige Fragen</h2>
            <dl className="service-faq-list">
              {faqs.map((faq) => (
                <div key={faq.question} className="service-faq-item">
                  <dt>{faq.question}</dt>
                  <dd>{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}
    </div>
  )
}

export default ServiceLanding
