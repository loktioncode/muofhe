import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocationMap } from "@/components/location-map"
import { PropertyFacilities } from "@/components/property-facilities"
import { AnimatedSection } from "@/components/animated-section"
import { Heart, Coffee, MapPin, Star, ArrowRight, Check, BedDouble, UtensilsCrossed, Trees } from "lucide-react"
import { PROPERTY_EXTERIOR_PHOTOS, QUEEN_ROOM_PHOTOS, TWIN_ROOM_PHOTOS } from "@/lib/lodge-media"
import { nightsbridgeBookUrl, SITE_DESCRIPTION, SITE_NAME, SITE_RESTAURANT_MENU_URL } from "@/lib/site-config"
import {
  LODGE_ACCOMMODATION_SUMMARY,
  LODGE_COUPLES_FEEDBACK,
  LODGE_DINING_SUMMARY,
  LODGE_LEISURE_SUMMARY,
  LODGE_LOCATION_ACCESS,
} from "@/lib/lodge-copy"

const bookUrl = nightsbridgeBookUrl()

export const metadata: Metadata = {
  title: `${SITE_NAME}  About`,
  description: SITE_DESCRIPTION,
}

const values = [
  {
    icon: Heart,
    title: "Ubuntu & warmth",
    description:
      "We welcome you as family  honest hospitality with the ease and generosity that defines staying in an African home.",
  },
  {
    icon: Coffee,
    title: "Morning at the table",
    description:
      "Bed & Breakfast is more than a label here: it is slow coffee, fresh fare, and fuel for the road ahead  whether you are here for work or winding down.",
  },
  {
    icon: MapPin,
    title: "Soul of Limpopo",
    description:
      "Between mountain air and fertile valleys, Thohoyandou offers a gentle pace. We reflect that rhythm in how we host  calm, attentive, rooted in place.",
  },
  {
    icon: Star,
    title: "Comfort that endures",
    description:
      "Crisp linen, cool rooms after a warm day, and spaces designed for rest. We sweat the details so you do not have to.",
  },
]

const features = [
  "Twin and queen layouts  multiple identical rooms of each type",
  "Bed & Breakfast included  generous morning meals every stay",
  "Private en-suite showers and daily housekeeping",
  "Air conditioning and complimentary Wi‑Fi throughout",
  "DSTV / satellite TV and workspace in every room",
  "Tea & coffee stations and thoughtful touches in each guest room",
  "Swimming pool and dedicated braai area  classic South African evenings",
  "Secure on-site parking",
]

/* Lodge photography  Muofhe Graceland Lodge library */
const EXT_A = PROPERTY_EXTERIOR_PHOTOS[0]
const EXT_B = PROPERTY_EXTERIOR_PHOTOS[1]
const EXT_C = PROPERTY_EXTERIOR_PHOTOS[4]
const EXT_D = PROPERTY_EXTERIOR_PHOTOS[6]
const QUEEN_A = QUEEN_ROOM_PHOTOS[0]
const QUEEN_B = QUEEN_ROOM_PHOTOS[2]
const TWIN_A = TWIN_ROOM_PHOTOS[0]
const TWIN_B = TWIN_ROOM_PHOTOS[2]
const TWIN_C = TWIN_ROOM_PHOTOS[3]

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={EXT_A}
            alt={`${SITE_NAME}  grounds and lodge`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d1810]/92 via-[#3e2723]/50 to-[#1c1410]/28" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24 pt-40">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/85 text-xs font-bold uppercase tracking-widest mb-6">
              <Heart className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              About us
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight">
              About {SITE_NAME}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-white/82 max-w-2xl leading-relaxed">
              Muofhe Graceland Lodge embodies warm African hospitality and comfort in the heart of Limpopo. Situated on
              Mphephu Road in Thohoyandou, we offer travelers, families, and business guests a peaceful place to
              experience the vibrant spirit of Venda.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── About us ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-56 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                    <Image src={EXT_C} alt={`${SITE_NAME}  property`} fill className="object-cover" />
                  </div>
                  <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                    <Image src={QUEEN_A} alt="Queen room  typical layout" fill className="object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                    <Image src={EXT_D} alt={`${SITE_NAME}  gardens and surrounds`} fill className="object-cover" />
                  </div>
                  <div className="relative h-56 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5">
                    <Image src={QUEEN_B} alt="Queen room  detail" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs mb-5">
                About us
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-primary leading-snug">
                Warm hospitality in the heart of Venda
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed text-[15px]">
                <p>
                  The lodge blends modern comfort with cultural authenticity, ensuring guests feel at home while
                  connecting with local heritage. Known for friendly service and a relaxing atmosphere, we provide cozy
                  rooms, modern amenities, an inviting pool, and a secure environment.
                </p>
                <p>
                  More than just a lodge, Muofhe Graceland Lodge is a place for memorable experiences, whether for
                  business, leisure, or celebrations.
                </p>
                <p>
                  Our commitment is to offer genuine hospitality and a memorable stay for every guest.
                </p>
              </div>
              <Link
                href="/#rooms"
                className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-[#5d4037] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                View room types
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-background border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs mb-5">
              Conferencing &amp; events
            </span>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              At Muofhe Graceland Lodge, we offer modern event spaces suited for both professional and social occasions.
              Our spacious Conference Hall accommodates up to 250 guests, ideal for conferences, weddings, and
              celebrations, while our elegant Boardroom fits up to 30 guests for executive meetings and intimate
              gatherings. We provide flexible conference packages tailored to different event needs and budgets.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-muted/35">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs mb-5">
              Restaurant &amp; dining
            </span>
            <p className="text-muted-foreground leading-relaxed text-[15px] mb-5">
              Enjoy a delicious dining experience at Graceland Eats, the welcoming diner located inside Muofhe
              Graceland Lodge. Serving breakfast, lunch, and supper daily, Graceland Eats offers a relaxed atmosphere
              perfect for casual dining, business lunches, and family meals.
            </p>
            <a
              href={SITE_RESTAURANT_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-[#5d4037] transition-colors"
            >
              Download restaurant menu (PDF)
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </AnimatedSection>
          <AnimatedSection delay={120}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs mb-5">
              Swimming pool &amp; relaxation
            </span>
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              Unwind and relax at the beautiful outdoor swimming pool at Muofhe Graceland Lodge. Designed to create a
              calm and inviting atmosphere, the pool area is the perfect place for guests to refresh, relax, and enjoy
              peaceful moments during their stay.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Stay, dine & unwind ───────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-muted/40 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold tracking-widest uppercase text-[11px] mb-4">
              What we offer
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-primary leading-tight text-balance">
              Comfortable stays, memorable meals, room to unwind
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <AnimatedSection>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                <BedDouble className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary mb-3">Comfortable accommodations</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">{LODGE_ACCOMMODATION_SUMMARY}</p>
            </AnimatedSection>
            <AnimatedSection delay={80}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                <UtensilsCrossed className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary mb-3">Dining experience</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">{LODGE_DINING_SUMMARY}</p>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                <Trees className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-primary mb-3">Leisure facilities</h3>
              <p className="text-muted-foreground leading-relaxed text-[15px]">{LODGE_LEISURE_SUMMARY}</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Location strip ───────────────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/75 text-xs font-bold uppercase tracking-widest mb-5">
                Where we are
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-primary-foreground mb-5">
                Thohoyandou,
                <br />
                at the mountain&apos;s edge
              </h2>
              <p className="text-primary-foreground/75 leading-relaxed mb-4 text-[15px]">
                Nestled below the Soutpansberg, Thohoyandou blends cool Highveld air with Limpopo&apos;s warmth 
                fertile valleys, roadside markets, and routes toward the greatest reserves in the north. {SITE_NAME}{" "}
                sits close to everyday conveniences while keeping that slower, small-town cadence guests come here for.
              </p>
              <p className="text-primary-foreground/80 leading-relaxed mb-6 text-[15px] border-l-2 border-white/25 pl-4">
                {LODGE_LOCATION_ACCESS}
              </p>
              <p className="text-primary-foreground/70 leading-relaxed mb-6 text-[15px] italic border-l-2 border-accent/60 pl-4">
                {LODGE_COUPLES_FEEDBACK}
              </p>
              <p className="text-primary-foreground/55 text-xs uppercase tracking-widest font-semibold mb-3">
                Nearby attractions
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Mphaphuli Nature Reserve",
                  "Entabeni State Forest",
                  "Ben Lavin Nature Reserve",
                  "Mapungubwe National Park",
                  "Hanglip Forest Reserve",
                  "Lake Fundudzi",
                  "Albasini Dam",
                  "Thohoyandou town & markets",
                  "Langjan Nature Reserve",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-primary-foreground/75 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150} className="grid grid-cols-3 gap-3">
              {[TWIN_B, QUEEN_B, TWIN_C].map((src, i) => (
                <div key={src} className={`relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10 ${i === 1 ? "h-64 mt-6" : "h-48"}`}>
                  <Image src={src} alt={`${SITE_NAME}  guest accommodation`} fill className="object-cover" />
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs mb-4">
              What guides us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-primary">
              Hospitality with roots
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From the breakfast table to the pool deck, we shape every stay around comfort, generosity, and respect for
              this place we call home.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 80}>
                <div className="group p-7 rounded-2xl bg-background border border-border hover:border-secondary/35 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300">
                    <v.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-primary mb-2">{v.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs mb-5">
                Your B&amp;B stay
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-primary mb-5">
                Everything under one roof
              </h2>
              <ul className="space-y-3 mb-10">
                {features.map((f, i) => (
                  <AnimatedSection key={f} delay={i * 40} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-secondary/15 flex items-center justify-center flex-shrink-0">
                      <Check className="h-3 w-3 text-secondary" aria-hidden="true" />
                    </div>
                    <span className="text-foreground/85 text-[15px]">{f}</span>
                  </AnimatedSection>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <a
                  href={bookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-[#5d4037] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Book your stay
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Contact us
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200} className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-52 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 group">
                  <Image src={TWIN_A} alt="Twin room  typical layout" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 group">
                  <Image src={QUEEN_A} alt="Queen room  typical layout" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 group">
                  <Image src={EXT_B} alt={`${SITE_NAME}  exterior`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="relative h-52 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 group">
                  <Image src={EXT_A} alt={`${SITE_NAME}  lodge and grounds`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <PropertyFacilities />

      {/* ── CTA banner ───────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={EXT_B} alt="" fill className="object-cover" aria-hidden="true" />
          <div className="absolute inset-0 bg-[#2d1810]/82" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-5">
              Ready for mornings at {SITE_NAME}?
            </h2>
            <p className="text-white/75 text-lg leading-relaxed max-w-xl mx-auto mb-10">
              Book your bed &amp; breakfast stay in a few clicks  we look forward to welcoming you beneath the
              Soutpansberg.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={bookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-bold hover:bg-muted transition-colors duration-200 shadow-xl"
              >
                Book now
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/45 text-white font-semibold hover:bg-white/10 transition-colors duration-200"
              >
                Get in touch
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
