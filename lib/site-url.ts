/**
 * Canonical site URL for metadata, sitemap, and structured data.
 * Set NEXT_PUBLIC_SITE_URL to your production domain (e.g. https://www.example.co.za).
 * On Vercel, VERCEL_URL is used when unset so previews still get valid absolute URLs.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '')
  }
  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    const host = vercel.startsWith('http') ? vercel : `https://${vercel}`
    return host.replace(/\/$/, '')
  }
  return 'http://localhost:3000'
}
