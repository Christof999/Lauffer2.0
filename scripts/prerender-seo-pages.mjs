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
let template = readFileSync(distIndex, 'utf8')

for (const route of outline.routes) {
  const { urlPath, title, description, sections } = route
  const baseUrl = 'https://lauffer-bau.de'
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
    '@type': 'WebPage',
    name: title,
    description,
    url: canonical,
    isPartOf: { '@id': `${baseUrl}/#website` },
    inLanguage: 'de-DE',
  }

  const extraLd = `\n    <script type="application/ld+json">\n    ${JSON.stringify(webPageLd, null, 2)}\n    </script>\n    <script type="application/ld+json">\n    ${JSON.stringify(breadcrumbLd, null, 2)}\n    </script>`

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

  const crawlArticle = `
    <article id="crawl-content" class="crawl-fallback" data-for="search-engines">
      <header>
        <h1>${escapeHtml(title)}</h1>
        <p class="crawl-lead">${escapeHtml(description)}</p>
      </header>
      ${sectionHtml}
      <nav class="crawl-nav" aria-label="Wichtige Seiten">
        <p><a href="/">Zur Startseite</a> · <a href="/kontakt">Kontakt</a> · <a href="/gartenbau">Gartenbau</a> · <a href="/erdbau">Erdbau</a> · <a href="/natursteine">Natursteinhandel</a></p>
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
}

console.log(`Prerender: ${outline.routes.length} HTML-Dateien mit Crawl-Inhalt geschrieben.`)
