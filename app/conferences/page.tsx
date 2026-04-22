import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import {
  ArrowRight,
  Check,
  Presentation,
  UtensilsCrossed,
  Users,
} from "lucide-react"
import {
  CONFERENCE_CENTER_HERO_IMAGE,
  CONFERENCE_CENTER_PLACEHOLDER_IMAGES,
} from "@/lib/lodge-media"
import { SITE_NAME } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `${SITE_NAME}  Conference centre & dining`,
  description: `${SITE_NAME} offers a flexible conference centre in Thohoyandou  meetings and events with on-site breakfast, lunch, and dinner for delegates and overnight guests.`,
}

const offerings = [
  {
    icon: Presentation,
    title: "Meetings & events",
    body:
      "Host workshops, strategy sessions, or small conferences in a calm setting away from city noise  with reception support and layouts tailored to your agenda.",
  },
  {
    icon: UtensilsCrossed,
    title: "Breakfast, lunch & dinner",
    body:
      "Our kitchen can cater full days for your group: from morning coffee and breakfast spreads to working lunches and relaxed evening meals  coordinated with your schedule.",
  },
  {
    icon: Users,
    title: "Guests under one roof",
    body:
      "Combine your event with accommodation: delegates stay on site in our twin and queen rooms while meal service keeps everyone together  ideal for teams and associations.",
  },
]

const bullets = [
  "Flexible conference and function space",
  "Catering for breakfast, lunch, and dinner",
  "Tea, coffee, and refreshment breaks on request",
  "Close to guest rooms for residential conferences",
  "Thohoyandou  easy access from major routes",
]

export default function ConferencesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />

      <section className="relative min-h-[58vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={CONFERENCE_CENTER_HERO_IMAGE}
            alt={`${SITE_NAME}  venue and surrounds (placeholder photo)`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d1810]/94 via-[#3e2723]/55 to-[#1c1410]/30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 pt-36">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 border border-white/25 text-white/90 text-xs font-bold uppercase tracking-widest mb-6">
              <Presentation className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              Meetings &amp; dining
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] font-medium text-white leading-tight max-w-3xl">
              Conference centre &amp; catering at {SITE_NAME}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-white/82 max-w-2xl leading-relaxed">
              Bring your team or association to Thohoyandou  dedicated function space plus full meal service so your
              delegates can focus on the day while we take care of the table.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-background border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <AnimatedSection className="lg:col-span-7">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs mb-5">
                Why host here
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-primary leading-snug">
                Work sessions, shared meals, overnight stays  all in one place
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed text-[15px]">
                <p>
                  {SITE_NAME} is built around hospitality: our conference centre lets you run productive sessions while
                  we organise breakfast, lunch, and dinner for your group  whether guests are visiting for the day or
                  staying in-house between meetings.
                </p>
                <p>
                  Share your dates, approximate numbers, and meal preferences with us  we will tailor a package that
                  fits your programme and budget. Venue photography on this page uses placeholder lodge images until our
                  dedicated conference shots are ready  the experience on site is what counts.
                </p>
              </div>
              <ul className="mt-8 space-y-3">
                {bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-foreground/90">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/15">
                      <Check className="h-3 w-3 text-secondary" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={120} className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/8 aspect-[4/3] relative">
                <Image
                  src={CONFERENCE_CENTER_PLACEHOLDER_IMAGES[0]}
                  alt={`${SITE_NAME}  lodge grounds (placeholder)`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Illustrative imagery from our property library  conference room photos coming soon.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs mb-4">
              What we offer
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-primary">
              Space, sustenance, and stay
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerings.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 70}>
                <div className="h-full rounded-2xl bg-card border border-border p-8 shadow-sm hover:shadow-md hover:border-secondary/25 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-6">
                    <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-primary text-lg mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-10 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-primary">Venue snapshots</h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
              Placeholder photography  we will refresh this gallery with dedicated conference and dining images.
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {CONFERENCE_CENTER_PLACEHOLDER_IMAGES.map((src, i) => (
              <AnimatedSection key={src} delay={i * 60}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 group">
                  <Image
                    src={src}
                    alt={`${SITE_NAME}  property image ${i + 1} (placeholder)`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-24 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(ellipse_at_top_right,oklch(0.85_0.12_75),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium mb-4">Plan your event</h2>
            <p className="text-primary-foreground/80 leading-relaxed mb-10">
              Tell us your dates, delegate numbers, and meal requirements  we will respond with availability and an
              outline for your conference or function.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-bold hover:bg-muted transition-colors shadow-lg"
              >
                Enquire about conferences
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link
                href="/#booking"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/45 font-semibold hover:bg-white/10 transition-colors"
              >
                Book accommodation
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
