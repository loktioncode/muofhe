import type { Metadata } from 'next'
import { Montserrat, Cormorant_Garamond, Great_Vibes } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { getSiteUrl } from '@/lib/site-url'
import { PROPERTY_EXTERIOR_PHOTOS } from '@/lib/lodge-media'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/site-config'
import './globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
})

const siteUrl = getSiteUrl()

/** Used for Open Graph / Twitter when subpages do not override */
const defaultOgImage = PROPERTY_EXTERIOR_PHOTOS[0]

const siteTitle = `${SITE_NAME}  Thohoyandou, Limpopo`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  title: siteTitle,
  description: SITE_DESCRIPTION,
  keywords: [
    'guest house',
    'accommodation',
    'Thohoyandou',
    'Muofhe Graceland Lodge',
    'Limpopo',
    'South Africa',
    'bed and breakfast',
    'business travel',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'default',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: '/',
    siteName: SITE_NAME,
    title: siteTitle,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}  exterior and grounds in Thohoyandou, Limpopo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: SITE_DESCRIPTION,
    images: [defaultOgImage],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${cormorant.variable} ${greatVibes.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            fixed top-4 left-4 z-[9999]
            px-6 py-3 rounded-xl
            bg-primary text-primary-foreground font-semibold text-sm
            shadow-2xl ring-2 ring-white
            focus:outline-none
          "
        >
          Skip to main content
        </a>
        {children}
        <WhatsAppFloat />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
