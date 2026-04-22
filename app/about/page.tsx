import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocationMap } from "@/components/location-map"
import { AnimatedSection } from "@/components/animated-section"
import { Heart, Coffee, MapPin, Star, ArrowRight, Check } from "lucide-react"
import { PROPERTY_EXTERIOR_PHOTOS, QUEEN_ROOM_PHOTOS, TWIN_ROOM_PHOTOS } from "@/lib/lodge-media"
import { nightsbridgeBookUrl, SITE_NAME } from "@/lib/site-config"

const bookUrl = nightsbridgeBookUrl()

export const metadata: Metadata = {
  title: `${SITE_NAME}  About`,
  description: `${SITE_NAME}  an African-inspired bed & breakfast in Thohoyandou, Limpopo. Warm hospitality, twin and queen rooms, pool & braai, and a generous morning table at the foot of the Soutpansberg.`,
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
              Our story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight">
              African warmth.
              <span className="block text-white/95 mt-1">Bed &amp; breakfast soul.</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-white/82 max-w-2xl leading-relaxed">
              {SITE_NAME} is a calm, African-inspired stay in Thohoyandou  where earthy comfort, a generous morning
              table, and Limpopo hospitality come together for travellers who want more than just a room.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Our Story ────────────────────────────────────────────────────── */}
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
                Who we are
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-primary leading-snug">
                A lodge built for the<br />
                stay  not just the sleep
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed text-[15px]">
                <p>
                  We run {SITE_NAME} as a true bed &amp; breakfast: mornings matter. You will sit down to a proper
                  breakfast before you step out into Thohoyandou  whether you are tracing business across the
                  province or slipping away to the mountains for the weekend.
                </p>
                <p>
                  Our guest rooms follow two familiar layouts  <strong className="text-primary font-medium">twin</strong>{" "}
                  (two singles) and <strong className="text-primary font-medium">queen</strong>  each repeated across
                  multiple units so you always know what you are booking. Every room offers en-suite facilities, air
                  conditioning, Wi‑Fi, satellite TV, and space to work or unwind.
                </p>
                <p>
                  Outside your door, slow down by the pool or fire up the braai as the day cools  the rhythms of a South
                  African guest house, done with care. Textures, tones, and welcome here echo the landscape: warm earth,
                  soft light, and hosts who are proud to share their corner of Limpopo.
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
              <p className="text-primary-foreground/75 leading-relaxed mb-6 text-[15px]">
                Nestled below the Soutpansberg, Thohoyandou blends cool Highveld air with Limpopo&apos;s warmth 
                fertile valleys, roadside markets, and routes toward the greatest reserves in the north. {SITE_NAME}{" "}
                sits close to everyday conveniences while keeping that slower, small-town cadence guests come here for.
              </p>
              <p className="text-primary-foreground/55 text-xs uppercase tracking-widest font-semibold mb-3">
                Nearby attractions
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Ben Lavin Nature Reserve",
                  "Mapungubwe National Park",
                  "Entabeni Forest",
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
