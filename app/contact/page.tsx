import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocationMap } from "@/components/location-map"
import { ContactContent } from "@/components/contact-content"

/** Hero  welcoming lounge (distinct from About hero COMMON_1 & Rooms twin shot) */
const CONTACT_HERO = "/images/LIQUID BLUE PHOTOS/COMMON AREAS/85738344-1E40-4FD8-B2AB-72FF08EF1BB3.png"

export const metadata: Metadata = {
  title: "Liquid Blue Guest House — Contact",
  description:
    "Get in touch with Liquid Blue Guest House in Louis Trichardt, Limpopo. Make an enquiry, check availability, or ask us anything.",
}

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#faf9f7]">
      <Header />

      {/* Page hero  full-bleed image + overlay (About / Rooms pattern) */}
      <section className="relative min-h-[52vh] sm:min-h-[58vh] flex items-end overflow-hidden pt-28 pb-16 sm:pb-20">
        <div className="absolute inset-0">
          <Image
            src={CONTACT_HERO}
            alt="Liquid Blue guest lounge"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/88 via-[#0d1f35]/45 to-[#0d1f35]/22" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center w-full pb-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest mb-6">
            Contact Us
          </span>
          <h1 className="font-serif font-medium text-white leading-tight whitespace-nowrap text-[clamp(1.35rem,4.2vw,3.5rem)]">
            Your Home in the Heart of Limpopo
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
            We&apos;d love to hear from you{"  "}whether it&apos;s a booking enquiry, special request, or just a question about our property.
          </p>
        </div>
      </section>

      <ContactContent />

      <LocationMap />
      <Footer />
    </main>
  )
}
