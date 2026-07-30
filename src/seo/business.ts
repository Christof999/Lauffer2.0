/**
 * Einzige Quelle für NAP-Daten (Name, Address, Phone), Bewertungen und
 * Einsatzgebiet. Alles, was in Seiten, Footer und JSON-LD auftaucht, kommt von
 * hier – damit Website, strukturierte Daten und Google-Profil identisch bleiben
 * (NAP-Konsistenz ist ein Local-SEO-Rankingfaktor).
 */

export const CONTACT = {
  legalName: 'Lauffer Bau · Erdbau · Natursteinhandel',
  name: 'Lauffer Bau',
  street: 'Waizendorfer Str. 6',
  postalCode: '91639',
  city: 'Wolframs-Eschenbach',
  region: 'Bayern',
  countryCode: 'DE',
  /** Anzeige-Schreibweise – überall identisch verwenden */
  telephoneDisplay: '09875 8129006',
  /** E.164 für tel:-Links und schema.org */
  telephoneHref: '+4998758129006',
  email: 'info@lauffer-bau.de',
  reviewsUrl: 'https://g.page/r/CTwsfx9MwTifEBM',
  geo: { latitude: 49.2316, longitude: 10.7258 },
} as const

/** Entspricht dem sichtbaren Rating im Hero und dem aggregateRating im JSON-LD. */
export const RATING = {
  value: 4.8,
  count: 16,
  best: 5,
  worst: 1,
} as const

export const OPENING_HOURS = [
  { label: 'Mo – Fr', value: '7:00 – 17:00' },
  { label: 'Sa', value: '8:00 – 12:00' },
  { label: 'So', value: 'Geschlossen' },
] as const

export const AREA_SERVED = [
  'Wolframs-Eschenbach',
  'Ansbach',
  'Gunzenhausen',
  'Merkendorf',
  'Windsbach',
  'Heilsbronn',
  'Mittelfranken',
] as const
