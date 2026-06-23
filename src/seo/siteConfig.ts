import config from './siteConfig.json'

export const SITE_ORIGIN = config.siteOrigin

/** Absolute canonical URL for a route path (e.g. `/team` or `/`). */
export function canonicalUrl(path = '/'): string {
  if (path === '/') return `${SITE_ORIGIN}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_ORIGIN}${normalized}`
}
