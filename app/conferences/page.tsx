import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { ConferenceCentreSection } from "@/components/conference-centre-section"
import { ArrowRight, Presentation } from "lucide-react"
import { CONFERENCE_CENTER_HERO_IMAGE } from "@/lib/lodge-media"
import { SITE_NAME } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `${SITE_NAME}   Conferences & events`,
  description: `${SITE_NAME} in Thohoyandou offers a flexible conference centre for meetings, weddings, and residential delegate packages.`,
}

export default function ConferencesPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />

      <section className="relative min-h-[58vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={CONFERENCE_CENTER_HERO_IMAGE}
            alt={`${SITE_NAME} conference venue, lodge grounds`}
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
              Conferences &amp; events
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] font-medium text-white leading-tight max-w-3xl">
              Host your event at {SITE_NAME}
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-white/82 max-w-2xl leading-relaxed">
              Conference hall, boardroom, and tailored packages for productive days and memorable occasions in Thohoyandou.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <ConferenceCentreSection />

      <section className="relative py-20 md:py-24 overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(ellipse_at_top_right,oklch(0.85_0.12_75),transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium mb-4">Plan your event</h2>
            <p className="text-primary-foreground/80 leading-relaxed mb-10">
              Tell us your dates, delegate numbers, and space requirements we will respond with availability and an outline
              for your conference or function.
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
