import type { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocationMap } from "@/components/location-map"
import { RoomsContent } from "@/components/rooms-content"

/** Hero photo  twin room (distinct from About common area & home exterior) */
const ROOMS_HERO = "/images/LIQUID BLUE PHOTOS/ROOM 2 NIGHTBRIDGE/IMG_5926.png"

export const metadata: Metadata = {
  title: "Liquid Blue Guest House — Rooms",
  description:
    "Find your perfect room at Liquid Blue Guest House  the ideal base for exploring Limpopo. King, Queen, Twin, Executive & Deluxe rooms, each with air conditioning, en-suite bathroom, and Bed & Breakfast.",
}

export default function RoomsPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#faf9f7]">
      <Header />

      {/* Page hero  full-bleed image + overlay (same pattern as About) */}
      <section className="relative min-h-[55vh] sm:min-h-[62vh] flex items-end overflow-hidden pt-28 pb-16 sm:pb-20">
        <div className="absolute inset-0">
          <Image
            src={ROOMS_HERO}
            alt="Twin room at Liquid Blue Guest House"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/88 via-[#0d1f35]/45 to-[#0d1f35]/22" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center w-full pb-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest mb-6">
            Where Limpopo Feels Like Home
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-white">
            Stay, Explore &amp; Come Back
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Louis Trichardt is the gateway to Limpopo's most spectacular landscapes  and Liquid Blue is your perfect base. Every room is thoughtfully finished, with air conditioning, en-suite bathroom, and a warm Bed &amp; Breakfast to start your day right.
          </p>
        </div>
      </section>

      <RoomsContent />

      <LocationMap />
      <Footer />
    </main>
  )
}
