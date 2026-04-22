/**
 * Muofhe Graceland Lodge  site identity & Nightsbridge booking.
 * Set NEXT_PUBLIC_NIGHTSBRIDGE_BBID / NEXT_PUBLIC_NIGHTSBRIDGE_NBID when the new IDs are ready.
 */

function numEnv(key: string, fallback: number): number {
  const raw = process.env[key]
  if (raw === undefined || raw === "") return fallback
  const n = Number(raw)
  return Number.isFinite(n) ? n : fallback
}

/** Nightsbridge establishment id (same value used in API paths and CDN gallery paths). */
export const NIGHTSBRIDGE_BBID = numEnv(
  "NEXT_PUBLIC_NIGHTSBRIDGE_BBID",
  numEnv("NIGHTSBRIDGE_BBID", 39595)
)

/** Nightsbridge nbid query param for book.nightsbridge.com links. */
export const NIGHTSBRIDGE_NBID = numEnv(
  "NEXT_PUBLIC_NIGHTSBRIDGE_NBID",
  numEnv("NIGHTSBRIDGE_NBID", 377)
)

export const SITE_NAME = "Muofhe Graceland Lodge"

/** Transparent PNG  used site-wide so the brand floats above any background */
export const SITE_LOGO_PATH = "/images/logo-nobg.png"

export const SITE_TAGLINE = "The Perfect Place To Stay!"

export const SITE_DESCRIPTION =
  "Family-friendly lodge in Thohoyandou: air-conditioned rooms with private bathrooms, free Wi‑Fi, on-site restaurant, year-round pool, garden, and free parkingnear Mphaphuli Nature Reserve and Entabeni State Forest."

/** Optional env overrides for contact details while the listing is finalized. */
export const SITE_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_SITE_PHONE_DISPLAY ?? "015 962 4926"
export const SITE_PHONE_TEL = process.env.NEXT_PUBLIC_SITE_PHONE_TEL ?? "+27159624926"
export const SITE_EMAIL =
  process.env.NEXT_PUBLIC_SITE_EMAIL ?? "info@mgl.co.za"

export const SITE_ADDRESS_LINES = (
  process.env.NEXT_PUBLIC_SITE_ADDRESS ??
  "Unit D, 14D Short St, Thohoyandou, 0950, Limpopo, South Africa"
)
  .split(",")
  .map((s) => s.trim())

export function nightsbridgeGalleryBase(imageSize: 500 | 1600): string {
  return `https://d1zyr4xmqw3mni.cloudfront.net/image/${imageSize}/gallery/${NIGHTSBRIDGE_BBID}`
}

export function nightsbridgeBookUrl(params?: {
  startdate?: string
  nights?: number
  bbrtid?: number
}): string {
  const base = `https://book.nightsbridge.com/${NIGHTSBRIDGE_BBID}`
  const q = new URLSearchParams({ nbid: String(NIGHTSBRIDGE_NBID) })
  if (params?.startdate) q.set("startdate", params.startdate)
  if (params?.nights != null) q.set("nights", String(params.nights))
  if (params?.bbrtid != null) q.set("bbrtid", String(params.bbrtid))
  const qs = q.toString()
  return qs ? `${base}?${qs}` : base
}

/** Strip legacy property prefixes from Nightsbridge room type names for display. */
export function shortenRoomTypeName(rtname: string): string {
  let s = rtname
  const prefixes = ["Liquid Blue - ", "Muofhe Graceland Lodge - ", `${SITE_NAME} - `]
  for (const p of prefixes) {
    if (s.startsWith(p)) {
      s = s.slice(p.length)
      break
    }
  }
  return s.trim()
}
