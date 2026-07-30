/**
 * Nach `vite build`: Für jede Route in crawlOutline eine eigene `dist/.../index.html`
 * mit sichtbarem Hauptinhalt (nicht nur noscript), damit Crawler ohne JS indexierbaren Text erhalten.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const distIndex = join(root, 'dist', 'index.html')
const outlinePath = join(root, 'src', 'seo', 'crawlOutline.json')

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function replaceFirst(html, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`Prerender: Pattern nicht gefunden: ${pattern}`)
  }
  return html.replace(pattern, replacement)
}

const outline = JSON.parse(readFileSync(outlinePath, 'utf8'))
const services = JSON.parse(readFileSync(join(root, 'src', 'data', 'servicesData.json'), 'utf8'))
const faqData = JSON.parse(readFileSync(join(root, 'src', 'data', 'faqData.json'), 'utf8'))
const galleryData = JSON.parse(readFileSync(join(root, 'src', 'data', 'galleryData.json'), 'utf8'))
let template = readFileSync(distIndex, 'utf8')

const { siteOrigin: BASE_URL } = JSON.parse(
  readFileSync(join(root, 'src', 'seo', 'siteConfig.json'), 'utf8'),
)
const AREA_SERVED = [
  'Wolframs-Eschenbach',
  'Ansbach',
  'Gunzenhausen',
  'Merkendorf',
  'Windsbach',
  'Heilsbronn',
  'Mittelfranken',
]

/* urlPath -> Verknüpfung zu servicesData (serviceId) und faqData (faqKey) */
const SERVICE_BY_PATH = {
  '/gartenbau': { serviceId: 'gartenbau', faqKey: 'gartenbau' },
  '/erdbau': { serviceId: 'erdbau', faqKey: 'erdbau' },
  '/natursteine': { serviceId: 'naturstein', faqKey: 'natursteine' },
}

/* Team-Daten für Person-Schema (E-E-A-T-Signale). */
const TEAM = [
  {
    name: 'Paul Lauffer',
    jobTitle: 'Geschäftsführer',
    description:
      'Gründer und Geschäftsführer von Lauffer Bau, verantwortlich für Planung, Kalkulation und Ausführung.',
  },
]

const sitemapEntries = []

for (const route of outline.routes) {
  const { urlPath, title, description, sections, h1, pageType } = route
  const baseUrl = BASE_URL
  const canonical = `${baseUrl}${urlPath === '/' ? '/' : urlPath}`
  const isLegal = urlPath === '/impressum' || urlPath === '/datenschutz'
  const robotsContent = isLegal ? 'noindex,follow' : 'index,follow'

  let html = template

  html = replaceFirst(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
  html = replaceFirst(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`,
  )
  html = replaceFirst(
    html,
    /<meta name="robots" content="[^"]*" \/>/,
    `<meta name="robots" content="${robotsContent}" />`,
  )
  html = replaceFirst(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
  )
  html = replaceFirst(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
  )
  html = replaceFirst(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
  )
  html = replaceFirst(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
  )
  html = replaceFirst(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
  )
  html = replaceFirst(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  )

  const breadcrumbItems = [
    { name: 'Startseite', path: '/' },
  ]
  if (urlPath !== '/') {
    const segments = urlPath.replace(/^\//, '').split('/').filter(Boolean)
    let acc = ''
    for (const seg of segments) {
      acc += `/${seg}`
      const label =
        seg === 'uber-uns'
          ? 'Über uns'
          : seg === 'projekte'
            ? 'Projekte'
            : seg === 'gartenbau'
              ? 'Gartenbau'
              : seg === 'erdbau'
                ? 'Erdbau'
                : seg === 'natursteine'
                  ? 'Natursteinhandel'
                  : seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ')
      breadcrumbItems.push({ name: label, path: acc })
    }
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${baseUrl}${item.path === '/' ? '/' : item.path}`,
    })),
  }

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': pageType ?? 'WebPage',
    name: h1 ?? title,
    headline: h1 ?? title,
    description,
    url: canonical,
    isPartOf: { '@id': `${baseUrl}/#website` },
    about: { '@id': `${baseUrl}/#organization` },
    inLanguage: 'de-DE',
    /* AEO: markiert die Passagen, die Sprachassistenten vorlesen sollen. */
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.crawl-lead', '.crawl-faq dt', '.crawl-faq dd'],
    },
  }

  /* Service-, FAQPage- und ImageGallery-Schema je nach Route (für SEO/GEO/AEO). */
  const serviceMap = SERVICE_BY_PATH[urlPath]
  const faqList = serviceMap
    ? faqData[serviceMap.faqKey] ?? []
    : urlPath === '/'
      ? faqData.allgemein ?? []
      : []
  const ldBlocks = [webPageLd, breadcrumbLd]

  if (urlPath === '/team') {
    for (const person of TEAM) {
      ldBlocks.push({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: person.name,
        jobTitle: person.jobTitle,
        description: person.description,
        worksFor: { '@id': `${baseUrl}/#organization` },
        url: canonical,
      })
    }
  }

  if (serviceMap) {
    const svc = services.find((s) => s.id === serviceMap.serviceId)
    if (svc) {
      ldBlocks.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: svc.title,
        serviceType: svc.title,
        description: svc.description,
        url: canonical,
        provider: { '@id': `${BASE_URL}/#localbusiness` },
        areaServed: AREA_SERVED.map((name) => ({ '@type': 'Place', name })),
        ...(svc.scope?.length
          ? {
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: `${svc.title} – Leistungen`,
                itemListElement: svc.scope.map((line) => ({
                  '@type': 'Offer',
                  itemOffered: { '@type': 'Service', name: line },
                })),
              },
            }
          : {}),
      })
    }
  }

  if (faqList.length) {
    ldBlocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqList.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    })
  }

  if (urlPath === '/galerie') {
    ldBlocks.push({
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: title,
      description,
      url: canonical,
      image: galleryData.map((img) => ({
        '@type': 'ImageObject',
        contentUrl: `${BASE_URL}${img.src}`,
        caption: img.alt,
      })),
    })
  }

  const extraLd = ldBlocks
    .map((ld) => `\n    <script type="application/ld+json">\n    ${JSON.stringify(ld, null, 2)}\n    </script>`)
    .join('')

  html = replaceFirst(
    html,
    /(<\/script>\s*\n\s*<!-- Schriften -->)/,
    `</script>${extraLd}\n    <!-- Schriften -->`,
  )

  const sectionHtml = sections
    .map(
      (sec) => `
      <section>
        <h2>${escapeHtml(sec.heading)}</h2>
        ${sec.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('\n        ')}
      </section>`,
    )
    .join('')

  /* Frage/Antwort als dl – identische Struktur wie im FAQPage-Schema (AEO). */
  const faqHtml = faqList.length
    ? `
      <section class="crawl-faq">
        <h2>Häufige Fragen</h2>
        <dl>
        ${faqList
          .map(
            (f) => `<dt>${escapeHtml(f.question)}</dt>
        <dd>${escapeHtml(f.answer)}</dd>`,
          )
          .join('\n        ')}
        </dl>
      </section>`
    : ''

  const crawlArticle = `
    <article id="crawl-content" class="crawl-fallback" data-for="search-engines">
      <header>
        <h1>${escapeHtml(h1 ?? title)}</h1>
        <p class="crawl-lead">${escapeHtml(description)}</p>
      </header>
      ${sectionHtml}
      ${faqHtml}
      <nav class="crawl-nav" aria-label="Wichtige Seiten">
        <p><a href="/">Zur Startseite</a> · <a href="/kontakt">Kontakt</a> · <a href="/gartenbau">Gartenbau</a> · <a href="/erdbau">Erdbau</a> · <a href="/natursteine">Natursteinhandel</a> · <a href="/projekte">Projekte</a> · <a href="/galerie">Galerie</a> · <a href="/team">Team</a> · <a href="/karriere">Karriere</a></p>
      </nav>
    </article>`

  /* Innerhalb von #root: Crawler sehen Text; React ersetzt beim Start den gesamten Inhalt von #root. */
  html = replaceFirst(html, /<div id="root"><\/div>/, `<div id="root">${crawlArticle}</div>`)

  const outDir = urlPath === '/' ? join(root, 'dist') : join(root, 'dist', urlPath.replace(/^\//, ''))
  if (urlPath !== '/') {
    mkdirSync(outDir, { recursive: true })
  }
  const outFile = urlPath === '/' ? distIndex : join(outDir, 'index.html')
  writeFileSync(outFile, html, 'utf8')

  if (!isLegal) {
    sitemapEntries.push({ canonical, urlPath })
  }
}

/* Sitemap aus derselben Quelle wie die Seiten – inkl. <lastmod>, damit Crawler
   Änderungen erkennen. noindex-Seiten (Impressum, Datenschutz) bleiben außen. */
const lastmod = new Date().toISOString().slice(0, 10)
const PRIORITY = {
  '/': '1.0',
  '/gartenbau': '0.9',
  '/erdbau': '0.9',
  '/natursteine': '0.9',
  '/kontakt': '0.85',
  '/projekte': '0.85',
  '/galerie': '0.75',
  '/uber-uns': '0.8',
  '/team': '0.7',
  '/karriere': '0.7',
}
const CHANGEFREQ = { '/': 'weekly', '/projekte': 'weekly', '/galerie': 'monthly' }

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    ({ canonical, urlPath }) =>
      `  <url><loc>${canonical}</loc><lastmod>${lastmod}</lastmod>` +
      `<changefreq>${CHANGEFREQ[urlPath] ?? 'monthly'}</changefreq>` +
      `<priority>${PRIORITY[urlPath] ?? '0.7'}</priority></url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(join(root, 'dist', 'sitemap.xml'), sitemap, 'utf8')

console.log(
  `Prerender: ${outline.routes.length} HTML-Dateien mit Crawl-Inhalt, ` +
    `sitemap.xml mit ${sitemapEntries.length} URLs (lastmod ${lastmod}) geschrieben.`,
)
