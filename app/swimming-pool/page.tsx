import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { SwimmingPoolGallery } from "@/components/swimming-pool-gallery"
import { ArrowRight, Waves } from "lucide-react"
import { SWIMMING_POOL_PHOTO } from "@/lib/lodge-media"
import { SWIMMING_POOL_GALLERY } from "@/lib/swimming-pool-gallery"
import { SITE_NAME } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `${SITE_NAME}   Swimming pool`,
  description: `Relax at the outdoor swimming pool at ${SITE_NAME} in Thohoyandou calm atmosphere, space to unwind, and leisure for every guest.`,
  openGraph: {
    title: `${SITE_NAME}   Swimming pool`,
    description: `Outdoor pool and poolside relaxation at ${SITE_NAME}.`,
    url: "/swimming-pool",
    images: [{ url: SWIMMING_POOL_PHOTO, width: 1200, height: 630, alt: "Swimming pool at Muofhe Graceland Lodge" }],
  },
}

export default function SwimmingPoolPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />

      <section className="relative min-h-[52vh] sm:min-h-[58vh] flex items-end overflow-hidden pt-28 pb-16 sm:pb-20">
        <div className="absolute inset-0">
          <Image
            src={SWIMMING_POOL_PHOTO}
            alt="Outdoor swimming pool at Muofhe Graceland Lodge"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d1810]/94 via-[#3e2723]/50 to-[#1c1410]/30" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 border border-white/25 text-white/90 text-xs font-bold uppercase tracking-widest mb-5">
              <Waves className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              Swimming pool &amp; relaxation
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] font-medium text-white leading-tight max-w-2xl">
              Pool &amp; leisure at {SITE_NAME}
            </h1>
            <p className="mt-4 text-lg text-white/85 max-w-xl leading-relaxed">
              A calm outdoor space to swim, unwind, and enjoy time with family and friends.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6 text-muted-foreground leading-relaxed text-[15px]">
          <AnimatedSection className="space-y-4">
            <p>
              Unwind and relax at the beautiful outdoor swimming pool at {SITE_NAME}. Designed to create a calm and inviting
              atmosphere, the pool area is the perfect place for guests to refresh, relax, and enjoy peaceful moments during
              their stay.
            </p>
            <p>
              Whether you are taking a refreshing swim on a warm day, spending quality time with family and friends, or
              simply relaxing beside the water, our beautifully maintained swimming pool offers a comfortable and enjoyable
              leisure experience for all guests.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/35 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs mb-4">
              Gallery
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-primary">Around the pool</h2>
          </AnimatedSection>
          <SwimmingPoolGallery images={SWIMMING_POOL_GALLERY} siteName={SITE_NAME} />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-background">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
              Planning a stay or an event? Explore rooms and conference options, or get in touch with our team.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <Link
                href="/rooms"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-[#5d4037] transition-colors"
              >
                View rooms
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
              >
                Contact us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
