/**
 * Erzeugt zur Marke passende QR-Codes (Startseite + Karriere) für Rechnungen & Angebote.
 * Ausgabe: SVG (vektoriell, ideal für Druck/PDF) und PNG (für Office-Vorlagen) nach public/qr/.
 *
 * Aufruf: node scripts/generate-qr.mjs
 */
import QRCode from 'qrcode'
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'public', 'qr')
mkdirSync(outDir, { recursive: true })

// Markenfarben (siehe src/index.css)
const BRAND_BROWN = '#7b4833' // QR-Module: dunkel genug für sicheres Scannen im Druck
const BRAND_GREEN = '#8cc63f'
const TEXT_DARK = '#2a2018'
const WHITE = '#ffffff'

// Logo als Base64 für die SVG-Mitte
const logoData = readFileSync(join(root, 'public', 'Logo_Lauffer_RGB.png'))
const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`

const targets = [
  {
    file: 'lauffer-bau-website',
    url: 'https://www.lauffer-bau.de/',
    label: 'Unsere Website',
    caption: 'lauffer-bau.de',
  },
  {
    file: 'lauffer-bau-karriere',
    url: 'https://www.lauffer-bau.de/karriere',
    label: 'Jobs & Karriere',
    caption: 'lauffer-bau.de/karriere',
  },
  {
    file: 'lauffer-bau-google-bewertung',
    url: 'https://g.page/r/CTwsfx9MwTifEBM/review',
    label: 'Bewerten Sie uns auf Google',
    caption: 'Ihre Bewertung hilft uns',
  },
]

const MARGIN = 4 // Quiet Zone in Modulen (QR-Mindestmaß)
const RADIUS = 0.18 // abgerundete Modul-Ecken (dezent, scan-sicher)

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Layout-Maße in Modul-Einheiten
const PAD = 3 // Innenabstand zum Rahmen
const LOGO_H = 7 // Höhe des Logo-Bereichs
const GAP = 2.5 // Abstand Logo ↔ QR
const CAP_H = 7.5 // Höhe Beschriftungsbereich

function buildSvg({ url, label, caption }) {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'H' })
  const count = qr.modules.size
  const data = qr.modules.data
  const dim = count + MARGIN * 2 // QR-Block inkl. weißer Quiet Zone

  const totalW = dim + PAD * 2
  const qrY = PAD + LOGO_H + GAP
  const totalH = qrY + dim + CAP_H

  const labelX = escapeXml(label)
  const captionX = escapeXml(caption)

  // QR-Module: abgerundete Quadrate im Marken-Braun (QR bleibt vollständig intakt)
  let modulesSvg = ''
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (data[r * count + c]) {
        modulesSvg += `<rect x="${MARGIN + c}" y="${MARGIN + r}" width="1" height="1" rx="${RADIUS}" ry="${RADIUS}"/>`
      }
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" width="${totalW * 16}" height="${totalH * 16}" role="img" aria-label="QR-Code: ${captionX}">
  <defs>
    <style>
      .qr-mod { fill: ${BRAND_BROWN}; }
      .qr-label { font-family: 'Manrope', 'Segoe UI', Arial, sans-serif; fill: ${TEXT_DARK}; }
      .qr-cap   { font-family: 'Manrope', 'Segoe UI', Arial, sans-serif; fill: ${BRAND_BROWN}; font-weight: 600; }
    </style>
  </defs>

  <!-- Karte mit dezentem Rahmen im Markenstil -->
  <rect x="0.5" y="0.5" width="${totalW - 1}" height="${totalH - 1}" rx="2.5" ry="2.5"
        fill="${WHITE}" stroke="${BRAND_GREEN}" stroke-width="0.4"/>

  <!-- Logo (Schriftzug) oben, mittig -->
  <image href="${logoBase64}" x="${PAD + 2}" y="${PAD}" width="${dim - 4}" height="${LOGO_H}"
         preserveAspectRatio="xMidYMid meet"/>

  <!-- QR-Code (vollständig, ungestört) -->
  <g class="qr-mod" transform="translate(${PAD}, ${qrY})">
    ${modulesSvg}
  </g>

  <!-- Beschriftung -->
  <text x="${totalW / 2}" y="${qrY + dim + 3}" text-anchor="middle" class="qr-label"
        font-size="2.1" font-weight="500">${labelX}</text>
  <text x="${totalW / 2}" y="${qrY + dim + 5.7}" text-anchor="middle" class="qr-cap"
        font-size="1.7">${captionX}</text>
</svg>
`
}

for (const t of targets) {
  // 1) SVG mit Logo & Beschriftung (vektoriell – ideal für Druck/PDF)
  const svg = buildSvg(t)
  writeFileSync(join(outDir, `${t.file}.svg`), svg, 'utf8')

  // 2) Gebrandete Karten-PNG (Logo + QR + Beschriftung) – fertig zum Einfügen
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1400 } }).render().asPng()
  writeFileSync(join(outDir, `${t.file}.png`), png)

  // 3) Schlichte QR-PNG ohne Logo (max. Scan-Sicherheit, Marken-Braun auf Weiß)
  await QRCode.toFile(join(outDir, `${t.file}-plain.png`), t.url, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 1200,
    margin: 4,
    color: { dark: BRAND_BROWN, light: WHITE },
  })

  console.log(`QR erstellt: ${t.file}.svg + ${t.file}.png (+ -plain.png)  →  ${t.url}`)
}

console.log(`\nFertig: ${targets.length} QR-Codes in public/qr/`)
