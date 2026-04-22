import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocationMap } from "@/components/location-map"
import { ContactContent } from "@/components/contact-content"
import { CONTACT_PAGE_HERO_IMAGE } from "@/lib/lodge-media"
import { SITE_NAME } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `${SITE_NAME}  Contact`,
  description: `Contact ${SITE_NAME} in Thohoyandou, Limpopo  bookings, conference enquiries, or questions about your stay.`,
  openGraph: {
    title: `${SITE_NAME}  Contact`,
    description: `Contact ${SITE_NAME} in Thohoyandou, Limpopo  bookings, conference enquiries, or questions about your stay.`,
    url: "/contact",
    images: [
      {
        url: CONTACT_PAGE_HERO_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME}  lodge and surrounds`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME}  Contact`,
    description: `Contact ${SITE_NAME} in Thohoyandou, Limpopo  bookings, conference enquiries, or questions about your stay.`,
    images: [CONTACT_PAGE_HERO_IMAGE],
  },
}

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />

      {/* Full-bleed hero  Muofhe lodge photography */}
      <section className="relative min-h-[52vh] sm:min-h-[58vh] flex items-end overflow-hidden pt-28 pb-16 sm:pb-20">
        <div className="absolute inset-0">
          <Image
            src={CONTACT_PAGE_HERO_IMAGE}
            alt={`${SITE_NAME}  lodge and surrounds`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d1810]/90 via-[#3e2723]/48 to-[#1c1410]/28" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center w-full pb-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/12 border border-white/25 text-white/85 text-xs font-bold uppercase tracking-widest mb-6">
            Contact us
          </span>
          <h1 className="font-serif font-medium text-white leading-tight text-[clamp(1.35rem,4.2vw,3.5rem)] max-w-4xl mx-auto text-balance">
            Say hello from the foot of the Soutpansberg
          </h1>
          <p className="mt-5 text-lg text-white/78 max-w-xl mx-auto leading-relaxed">
            We&apos;d love to hear from you  booking enquiries, conference requests, special occasions, or anything
            about staying at {SITE_NAME}.
          </p>
        </div>
      </section>

      <ContactContent />

      <LocationMap />
      <Footer />
    </main>
  )
}
