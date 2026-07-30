import imageManifest from '../data/imageManifest.json'

interface Variant {
  width: number
  height: number
  url: string
}

const manifest = imageManifest as Record<string, { width: number; height: number; variants: Variant[] }>

/**
 * Liefert die WebP-Variante, die einer Zielbreite am nächsten kommt (aufwärts),
 * oder den Originalpfad, wenn kein Manifest-Eintrag existiert (z. B. Videos).
 * Für Bilder, die in Animationen oder Lightboxen direkt als `src` gebraucht
 * werden und deshalb kein `<ResponsiveImage>` nutzen können.
 */
export function optimized(src: string, targetWidth = 1600): string {
  const entry = manifest[src]
  if (!entry || entry.variants.length === 0) return src
  const match = entry.variants.find((v) => v.width >= targetWidth)
  return (match ?? entry.variants[entry.variants.length - 1]).url
}

/** Intrinsische Maße der größten Variante – gegen Layout-Shift (CLS). */
export function intrinsicSize(src: string): { width?: number; height?: number } {
  const entry = manifest[src]
  if (!entry) return {}
  return { width: entry.width, height: entry.height }
}
