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

export const SITE_TAGLINE = "The Perfect Place to stay"

export const SITE_DESCRIPTION =
  "Muofhe Graceland Lodge is a charming three-star hotel located in the heart of the Vhembe district of Venda, just 3 minutes from Khoroni along Mphephu Road (R523), offering modern rooms, dining, and leisure facilities."

/** Optional env overrides for contact details while the listing is finalized. */
export const SITE_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_SITE_PHONE_DISPLAY ?? "015 962 4926"
export const SITE_PHONE_TEL = process.env.NEXT_PUBLIC_SITE_PHONE_TEL ?? "+27159624926"
export const SITE_EMAIL =
  process.env.NEXT_PUBLIC_SITE_EMAIL ?? "support@muofhegraceland.co.za"
export const SITE_TIKTOK_URL =
  process.env.NEXT_PUBLIC_SITE_TIKTOK_URL ?? "https://www.tiktok.com/@muofhe.graceland?_r=1&_t=ZS-96DzcmHwcPl"

/**
 * WhatsApp number for `wa.me` links: digits only with country code (no +).
 * Default +27 61 496 8458. Override with `NEXT_PUBLIC_SITE_WHATSAPP_E164`.
 */
export const SITE_WHATSAPP_E164 = (
  process.env.NEXT_PUBLIC_SITE_WHATSAPP_E164 ?? "27614968458"
).replace(/\D/g, "")

/** Opens WhatsApp chat (app or web). Optional pre-filled message. */
export function siteWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${SITE_WHATSAPP_E164}`
  if (!message?.trim()) return base
  return `${base}?text=${encodeURIComponent(message.trim())}`
}

/** Google Drive file id for Graceland Eats menu PDF (drive.google.com/file/d/…/view). */
const GRACELAND_EATS_MENU_DRIVE_FILE_ID = "1L1NyOaryL20nrBnJ_Ghl-dJLsxenK8md"

/** Opens the file in Google Drive (browser tab). Override with `NEXT_PUBLIC_SITE_RESTAURANT_MENU_URL`. */
export const SITE_RESTAURANT_MENU_URL =
  process.env.NEXT_PUBLIC_SITE_RESTAURANT_MENU_URL ??
  `https://drive.google.com/file/d/${GRACELAND_EATS_MENU_DRIVE_FILE_ID}/view`

/**
 * Same menu, Drive `/preview` URL for `<iframe>` embeds (`/view` is unreliable in iframes).
 * Override with `NEXT_PUBLIC_SITE_RESTAURANT_MENU_EMBED_URL`.
 */
export const SITE_RESTAURANT_MENU_EMBED_URL =
  process.env.NEXT_PUBLIC_SITE_RESTAURANT_MENU_EMBED_URL ??
  `https://drive.google.com/file/d/${GRACELAND_EATS_MENU_DRIVE_FILE_ID}/preview`

export const SITE_ADDRESS_LINES = (
  process.env.NEXT_PUBLIC_SITE_ADDRESS ??
  "14D Mphephu Road, Thohoyandou, South Africa"
)
  .split(",")
  .map((s) => s.trim())

/** Google Maps embed URL from {@link SITE_ADDRESS_LINES} so the map and footer stay aligned. */
export function siteAddressMapsEmbedUrl(): string {
  const q = encodeURIComponent(SITE_ADDRESS_LINES.join(", "))
  return `https://maps.google.com/maps?q=${q}&z=17&output=embed`
}

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
