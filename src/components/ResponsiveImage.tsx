import type { CSSProperties } from 'react'
import imageManifest from '../data/imageManifest.json'

interface Variant {
  width: number
  height: number
  url: string
}

interface ManifestEntry {
  width: number
  height: number
  variants: Variant[]
}

const manifest = imageManifest as Record<string, ManifestEntry>

interface ResponsiveImageProps {
  /** Pfad des Originalbilds, z. B. `/images/gallery/IMG_5367.jpeg` */
  src: string
  alt: string
  /** Fallback-Maße, falls das Bild nicht im Manifest steht */
  width?: number
  height?: number
  sizes?: string
  className?: string
  style?: CSSProperties
  /** Für Bilder oberhalb des Folds: eager laden statt lazy */
  priority?: boolean
}

/**
 * Liefert WebP-Varianten aus dem Bild-Manifest (`scripts/optimize-images.mjs`)
 * als `srcset` aus und setzt immer `width`/`height`, damit kein Layout-Shift
 * entsteht (CLS). Ohne Manifest-Eintrag fällt die Komponente auf das
 * Originalbild zurück.
 */
function ResponsiveImage({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  className,
  style,
  priority = false,
}: ResponsiveImageProps) {
  const entry = manifest[src]
  const loading = priority ? 'eager' : 'lazy'
  const fetchPriority = priority ? 'high' : undefined

  if (!entry || entry.variants.length === 0) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
      />
    )
  }

  const srcSet = entry.variants.map((v) => `${v.url} ${v.width}w`).join(', ')
  const fallback = entry.variants[entry.variants.length - 1]

  return (
    <img
      src={fallback.url}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      width={width ?? entry.width}
      height={height ?? entry.height}
      className={className}
      style={style}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
    />
  )
}

export default ResponsiveImage
