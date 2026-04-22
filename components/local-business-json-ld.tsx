import { getSiteUrl } from '@/lib/site-url'

const OG_IMAGE_PATH =
  '/images/LIQUID BLUE PHOTOS/EXT/IMG_610511.png'

/** LodgingBusiness structured data for rich results / Google Maps alignment */
export function LocalBusinessJsonLd() {
  const base = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Liquid Blue Guest House',
    description:
      "Louis Trichardt's premier guest house — elegantly decorated rooms with air conditioning, en-suite bathrooms, free Wi‑Fi, and Bed & Breakfast. Swimming pool and braai area on site.",
    url: base,
    telephone: '+27682404462',
    email: 'liquidblueltt@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '157 Forestry Rd',
      addressLocality: 'Louis Trichardt',
      postalCode: '0920',
      addressRegion: 'Limpopo',
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -23.028913,
      longitude: 29.91147,
    },
    image: `${base}${encodeURI(OG_IMAGE_PATH)}`,
    priceRange: '$$',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
