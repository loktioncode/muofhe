import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { getSiteUrl } from '@/lib/site-url'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
})

const siteUrl = getSiteUrl()

const defaultDescription =
  "Louis Trichardt's premier guest house. Elegantly decorated rooms with air conditioning, en-suite bathrooms, free Wi-Fi, and Bed & Breakfast. Swimming pool and braai area on site."

/** Used for Open Graph / Twitter when subpages do not override */
const defaultOgImage = '/images/LIQUID BLUE PHOTOS/EXT/IMG_610511.png'

/** Brand-first titles so tabs, history & “recent sites” show the business name before location. */
const siteTitle = 'Liquid Blue Guest House — Louis Trichardt, Limpopo'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Liquid Blue Guest House',
  title: siteTitle,
  description: defaultDescription,
  keywords: [
    'guest house',
    'accommodation',
    'Louis Trichardt',
    'Liquid Blue',
    'Limpopo',
    'South Africa',
    'bed and breakfast',
    'business travel',
    'luxury stay',
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
    title: 'Liquid Blue Guest House',
    statusBarStyle: 'default',
  },
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: '/',
    siteName: 'Liquid Blue Guest House',
    title: siteTitle,
    description: defaultDescription,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Liquid Blue Guest House exterior and grounds in Louis Trichardt, Limpopo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: defaultDescription,
    images: [defaultOgImage],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {/* Skip navigation – first focusable element for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className="
            sr-only focus:not-sr-only
            fixed top-4 left-4 z-[9999]
            px-6 py-3 rounded-xl
            bg-[#1a2e4a] text-white font-semibold text-sm
            shadow-2xl ring-2 ring-white
            focus:outline-none
          "
        >
          Skip to main content
        </a>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
