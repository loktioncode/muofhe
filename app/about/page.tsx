import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocationMap } from "@/components/location-map"
import { AnimatedSection } from "@/components/animated-section"
import { Heart, Award, Users, Star, ArrowRight, Check, MapPin } from "lucide-react"

export const metadata: Metadata = {
  title: "Liquid Blue Guest House — About Us",
  description:
    "Discover Liquid Blue  Louis Trichardt's premier guest house. Elegantly decorated rooms, swimming pool, braai area, and warm South African hospitality in the heart of Limpopo.",
}

const values = [
  {
    icon: Heart,
    title: "Warm Hospitality",
    description:
      "We welcome every guest with genuine African warmth  you are family from the moment you arrive.",
  },
  {
    icon: MapPin,
    title: "Proudly Limpopo",
    description:
      "Rooted in the rich culture and landscapes of Limpopo, we celebrate our land and its people every day.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "We invest in our local community and employ people from the area, ensuring your stay has a positive impact.",
  },
  {
    icon: Star,
    title: "Quality",
    description:
      "From crisp linen to a freshly prepared breakfast, we hold ourselves to the highest standards of comfort.",
  },
]

const features = [
  "9 elegantly decorated rooms with premium finishes",
  "King, queen, and twin bed configurations",
  "Private en-suite bathrooms  shower or bath & shower",
  "Air conditioning in every room",
  "Free high-speed Wi-Fi throughout",
  "Flat-screen TV and dedicated workspace in every room",
  "Curated coffee & tea station in every room",
  "Bed & Breakfast in every stay",
  "Communal swimming pool",
  "Dedicated braai area",
  "Secure on-site parking",
  "Daily housekeeping",
]

/* Real property photo paths */
const EXTERIOR = "/images/LIQUID BLUE PHOTOS/EXT/IMG_610511.png"
const COMMON_1  = "/images/LIQUID BLUE PHOTOS/COMMON AREAS/2012B82D-83FE-4030-96F7-0E155B4E64DC.png"
const COMMON_2  = "/images/LIQUID BLUE PHOTOS/COMMON AREAS/85738344-1E40-4FD8-B2AB-72FF08EF1BB3.png"
const KING_1    = "/images/LIQUID BLUE PHOTOS/ROOM 8 NIGHTBRIDGE/IMG_5831.png"
const KING_2    = "/images/LIQUID BLUE PHOTOS/ROOM 8 NIGHTBRIDGE/IMG_5840.png"
const TWIN_1    = "/images/LIQUID BLUE PHOTOS/ROOM 2 NIGHTBRIDGE/IMG_5926.png"
const DELUXE_1  = "/images/LIQUID BLUE PHOTOS/ROOM 6 NIGHBRIDEGE/IMG_5751.png"
const ROOM9_1   = "/images/LIQUID BLUE PHOTOS/ROOM 8 NIGHTBRIDGE/ROOM 9 NIGHTBRIDGE/IMG_4833.png"
const ROOM9_2   = "/images/LIQUID BLUE PHOTOS/ROOM 8 NIGHTBRIDGE/ROOM 9 NIGHTBRIDGE/IMG_4948.png"

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#faf9f7]">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={COMMON_1}
            alt="Liquid Blue guest lounge and common area"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/85 via-[#0d1f35]/40 to-[#0d1f35]/20" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 pt-40">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest mb-6">
              <Heart className="h-3.5 w-3.5 text-[#7ecfdd]" aria-hidden="true" />
              Our Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight">
              About Liquid Blue
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              Louis Trichardt&apos;s premier guest house  offering refined living with premium finishes, warm hospitality, and everything you need for an effortless stay.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Photo collage */}
            <AnimatedSection>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-56 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={COMMON_1} alt="Liquid Blue common area" fill className="object-cover" />
                  </div>
                  <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={KING_1} alt="King Room" fill className="object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={COMMON_2} alt="Liquid Blue lounge" fill className="object-cover" />
                  </div>
                  <div className="relative h-56 rounded-2xl overflow-hidden shadow-lg">
                    <Image src={DELUXE_1} alt="Deluxe Room" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Copy */}
            <AnimatedSection delay={150}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a2e4a]/8 text-[#1a2e4a] font-bold tracking-wider uppercase text-xs mb-5">
                Our Story
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1a2e4a] leading-snug">
                Louis Trichardt&apos;s Premier<br />Guest House
              </h2>
              <div className="mt-6 space-y-4 text-[#5c6a7a] leading-relaxed text-[15px]">
                <p>
                  Liquid Blue offers refined living in the heart of Louis Trichardt, Limpopo.
                  Our 9 elegantly decorated rooms are fitted with premium finishes and everything
                  needed for a productive, relaxing stay  whether you&apos;re here for business or leisure.
                </p>
                <p>
                  Each room accommodates up to two guests and features air conditioning, high-speed
                  Wi-Fi, a flat-screen TV, a dedicated workspace, and a curated coffee and tea station.
                  Choose your preferred configuration  king, queen, or twin beds  all with private
                  en-suite bathrooms.
                </p>
                <p>
                  Beyond your room, unwind at our communal swimming pool or enjoy a classic South
                  African evening at the dedicated braai area. Every stay includes a freshly prepared
                  Bed &amp; Breakfast and our signature warm hospitality.
                </p>
              </div>
              <Link
                href="/rooms"
                className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#1a2e4a] text-white font-semibold hover:bg-[#2d5080] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Explore Our Rooms
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Location strip ───────────────────────────────────────────────── */}
      <section className="py-16 bg-[#1a2e4a]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/70 text-xs font-bold uppercase tracking-widest mb-5">
                Where We Are
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white mb-5">
                Louis Trichardt,<br />Limpopo
              </h2>
              <p className="text-white/65 leading-relaxed mb-6 text-[15px]">
                Nestled at the foot of the Soutpansberg Mountains, Louis Trichardt is one of
                Limpopo&apos;s most charming towns  known for its cool climate, lush greenery, and
                gateway access to the Kruger National Park corridor. Liquid Blue puts you right
                in the heart of it, close to local restaurants, shops, and the region&apos;s most
                celebrated natural and cultural attractions.
              </p>
              <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3">Nearby attractions</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Ben Lavin Nature Reserve", "Mapungubwe National Park", "Entabeni Forest",
                  "Hanglip Forest Reserve", "Lake Fundudzi", "Albasini Dam",
                  "Louis Trichardt Golf Club", "Langjan Nature Reserve",
                ].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/70 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            {/* Photo strip */}
            <AnimatedSection delay={150} className="grid grid-cols-3 gap-3">
              {[ROOM9_1, KING_2, ROOM9_2].map((src, i) => (
                <div key={i} className={`relative rounded-2xl overflow-hidden shadow-xl ${i === 1 ? "h-64 mt-6" : "h-48"}`}>
                  <Image src={src} alt="Liquid Blue Guest House Limpopo" fill className="object-cover" />
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a2e4a]/8 text-[#1a2e4a] font-bold tracking-wider uppercase text-xs mb-4">
              What Drives Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-[#1a2e4a]">
              Our Values
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 80}>
                <div className="group p-7 rounded-2xl bg-[#faf9f7] border border-[#e8e4df] hover:border-[#4aabba]/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#1a2e4a]/6 flex items-center justify-center mb-5 group-hover:bg-[#1a2e4a] transition-colors duration-300">
                    <v.icon className="h-6 w-6 text-[#1a2e4a] group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-[#1a2e4a] mb-2">{v.title}</h3>
                  <p className="text-[#5c6a7a] text-sm leading-relaxed">{v.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a2e4a]/8 text-[#1a2e4a] font-bold tracking-wider uppercase text-xs mb-5">
                Why Choose Us
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1a2e4a] mb-5">
                Everything You&apos;d Expect<br />and More
              </h2>
              <ul className="space-y-3 mb-10">
                {features.map((f, i) => (
                  <AnimatedSection key={f} delay={i * 40} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-[#4aabba]/15 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-[#1a6b75]" aria-hidden="true" />
                    </div>
                    <span className="text-[#3a4a5a] text-[15px]">{f}</span>
                  </AnimatedSection>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://book.nightsbridge.com/39595?nbid=377"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#1a2e4a] text-white font-semibold hover:bg-[#2d5080] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Book Your Stay
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-[#1a2e4a] text-[#1a2e4a] font-semibold hover:bg-[#1a2e4a] hover:text-white transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </AnimatedSection>

            {/* Real property photo grid */}
            <AnimatedSection delay={200} className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-52 rounded-2xl overflow-hidden shadow-lg group">
                  <Image src={TWIN_1} alt="Twin Room" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                  <Image src={KING_2} alt="King Room" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group">
                  <Image src={COMMON_2} alt="Common area" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="relative h-52 rounded-2xl overflow-hidden shadow-lg group">
                  <Image src={EXTERIOR} alt="Guest house exterior" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={EXTERIOR} alt="" fill className="object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-[#0d1f35]/78" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-5">
              Ready to Stay with Us?
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Book directly through our portal for instant confirmation. We look forward to welcoming you to Louis Trichardt.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://book.nightsbridge.com/39595?nbid=377"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#1a2e4a] font-bold hover:bg-[#7ecfdd] transition-colors duration-200 shadow-xl"
              >
                Book Now
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <LocationMap />
      <Footer />
    </main>
  )
}
