import { getSiteUrl } from '@/lib/site-url'
import { PROPERTY_EXTERIOR_PHOTOS } from '@/lib/lodge-media'
import { SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, SITE_PHONE_TEL } from '@/lib/site-config'

/** LodgingBusiness structured data for rich results / Google Maps alignment */
export function LocalBusinessJsonLd() {
  const base = getSiteUrl()
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: base,
    telephone: SITE_PHONE_TEL,
    email: SITE_EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '14D Mphephu Road',
      addressLocality: 'Thohoyandou',
      postalCode: '0950',
      addressRegion: 'Limpopo',
      addressCountry: 'ZA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -22.965,
      longitude: 30.485,
    },
    image: `${base}${PROPERTY_EXTERIOR_PHOTOS[0]}`,
    priceRange: '$$',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
