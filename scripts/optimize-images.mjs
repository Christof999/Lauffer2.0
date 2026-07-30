/**
 * Bild-Pipeline: erzeugt aus den Originalfotos in `public/images` responsive
 * WebP-Varianten in `public/images-opt` und schreibt ein Manifest, das
 * `ResponsiveImage` für `srcset`/`sizes` und die intrinsischen Maße nutzt.
 *
 * - Originale bleiben unangetastet (bewusste Entscheidung).
 * - Nur Bilder, die im Code oder in `src/data/*.json` referenziert werden.
 * - Inkrementell: bereits erzeugte Varianten werden übersprungen, solange die
 *   Quelle nicht neuer ist.
 *
 * Aufruf: `node scripts/optimize-images.mjs [--force]`
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync, readdirSync } from 'node:fs'
import { dirname, join, extname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const publicDir = join(root, 'public')
const outRoot = join(publicDir, 'images-opt')
const manifestPath = join(root, 'src', 'data', 'imageManifest.json')

const WIDTHS = [400, 800, 1600]
const QUALITY = 72
const FORCE = process.argv.includes('--force')
const RASTER = new Set(['.jpg', '.jpeg', '.png', '.webp'])

/** Alle Dateien unterhalb von dir, rekursiv. */
function walk(dir) {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full))
    else out.push(full)
  }
  return out
}

/** Assets außerhalb von /images, die trotzdem Varianten brauchen (Logo im Header). */
const EXTRA_ASSETS = ['/Logo_Lauffer_RGB.png']

/** Sammelt alle `/images/...`-Referenzen aus Datenfiles und Quellcode. */
function collectReferences() {
  const refs = new Set(EXTRA_ASSETS)
  const files = [
    ...walk(join(root, 'src')).filter((f) => /\.(json|tsx|ts|css)$/.test(f)),
    join(root, 'index.html'),
  ]
  for (const file of files) {
    if (!existsSync(file)) continue
    const txt = readFileSync(file, 'utf8')
    /* Dateinamen können Leerzeichen enthalten – nur an Quote/Klammer abbrechen. */
    for (const m of txt.matchAll(/["'(](\/images\/[^"')\n]+)["')]/g)) {
      refs.add(decodeURIComponent(m[1].trim()))
    }
  }
  return [...refs]
}

const references = collectReferences()
const manifest = {}
let generated = 0
let skipped = 0
let missing = 0

for (const ref of references) {
  const ext = extname(ref).toLowerCase()
  if (!RASTER.has(ext)) continue

  const source = join(publicDir, ref)
  if (!existsSync(source)) {
    missing++
    continue
  }

  const meta = await sharp(source).metadata()
  if (!meta.width || !meta.height) continue

  const relNoExt = ref.replace(/^\//, '').replace(/^images\//, '').replace(/\.[^.]+$/, '')
  const srcMtime = statSync(source).mtimeMs
  const variants = []
  const widths = ref === '/Logo_Lauffer_RGB.png' ? [200, 400] : WIDTHS

  for (const width of widths) {
    /* Nicht hochskalieren: nur Varianten kleiner/gleich Originalbreite,
       die kleinste Breite immer erzeugen. */
    if (width > meta.width && width !== widths[0]) continue

    const outRel = `/images-opt/${relNoExt}-${width}.webp`
    const outAbs = join(publicDir, outRel)
    mkdirSync(dirname(outAbs), { recursive: true })

    const upToDate = !FORCE && existsSync(outAbs) && statSync(outAbs).mtimeMs >= srcMtime
    if (upToDate) {
      skipped++
    } else {
      await sharp(source)
        .rotate() /* EXIF-Orientierung anwenden */
        .resize({ width: Math.min(width, meta.width), withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outAbs)
      generated++
    }

    const actual = await sharp(outAbs).metadata()
    variants.push({ width: actual.width, height: actual.height, url: outRel })
  }

  if (!variants.length) continue

  /* EXIF-Rotation kann Breite/Höhe tauschen – Maße der größten Variante nutzen. */
  const largest = variants[variants.length - 1]
  manifest[ref] = {
    width: largest.width,
    height: largest.height,
    variants,
  }
}

/* Social-Preview: 1200x630 ist das Format, das Facebook, LinkedIn, X und
   WhatsApp erwarten – vorher wurde ein 4:3-Foto ausgeliefert und beschnitten. */
const OG_SOURCE = '/images/gallery/IMG_5367.jpeg'
const ogTarget = join(publicDir, 'images-opt', 'og-default.jpg')
if (existsSync(join(publicDir, OG_SOURCE))) {
  const needsOg = FORCE || !existsSync(ogTarget) ||
    statSync(ogTarget).mtimeMs < statSync(join(publicDir, OG_SOURCE)).mtimeMs
  if (needsOg) {
    mkdirSync(dirname(ogTarget), { recursive: true })
    await sharp(join(publicDir, OG_SOURCE))
      .rotate()
      .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(ogTarget)
    console.log('OG-Bild: images-opt/og-default.jpg (1200x630) erzeugt')
  }
} else {
  console.warn(`OG-Quelle fehlt: ${OG_SOURCE}`)
}

writeFileSync(
  manifestPath,
  `${JSON.stringify(Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b))), null, 2)}\n`,
  'utf8',
)

const relManifest = relative(root, manifestPath)
console.log(
  `Bilder: ${Object.keys(manifest).length} Quellen, ${generated} Varianten neu, ${skipped} aktuell` +
    (missing ? `, ${missing} Referenzen ohne Datei` : '') +
    ` → ${relManifest}`,
)
console.log(`Ausgabe: ${relative(root, outRoot)}`)
