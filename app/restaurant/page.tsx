import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, UtensilsCrossed } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import { RESTAURANT_AREA_PHOTO } from "@/lib/lodge-media"
import { SITE_NAME, SITE_RESTAURANT_MENU_EMBED_URL, SITE_RESTAURANT_MENU_URL } from "@/lib/site-config"

const GRACELAND_EATS_LOGO = "/images/eats-logo.png"

export const metadata: Metadata = {
  title: `${SITE_NAME}   Graceland Eats restaurant`,
  description: `Graceland Eats at ${SITE_NAME} in Thohoyandou serves breakfast, lunch, and supper daily. À la carte dining, relaxed atmosphere, and warm hospitality.`,
  openGraph: {
    title: `${SITE_NAME}   Graceland Eats`,
    description: `Dine at Graceland Eats inside ${SITE_NAME}: daily meals, à la carte menu, and excellent service.`,
    url: "/restaurant",
    images: [{ url: RESTAURANT_AREA_PHOTO, width: 1200, height: 630, alt: "Graceland Eats at Muofhe Graceland Lodge" }],
  },
}

export default function RestaurantPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />

      <section className="relative min-h-[52vh] sm:min-h-[58vh] flex items-end overflow-hidden pt-28 pb-16 sm:pb-20">
        <div className="absolute inset-0">
          <Image
            src={RESTAURANT_AREA_PHOTO}
            alt="Graceland Eats restaurant area at Muofhe Graceland Lodge"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d1810]/94 via-[#3e2723]/55 to-[#1c1410]/35" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 border border-white/25 text-white/90 text-xs font-bold uppercase tracking-widest mb-5">
                <UtensilsCrossed className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                Restaurant &amp; dining
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-[3.25rem] font-medium text-white leading-tight max-w-2xl">
                Graceland Eats
              </h1>
              <p className="mt-4 text-lg text-white/85 max-w-xl leading-relaxed">
                The welcoming diner inside {SITE_NAME} breakfast, lunch, and supper daily.
              </p>
            </div>
            <div className="rounded-2xl bg-white/95 border border-white/30 px-8 py-6 shadow-xl shrink-0">
              <Image
                src={GRACELAND_EATS_LOGO}
                alt="Graceland Eats logo"
                width={220}
                height={100}
                className="h-auto w-auto max-w-[min(220px,70vw)] object-contain"
                style={{ width: "auto", height: "auto" }}
                priority
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
          <AnimatedSection className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
            <p>
              Enjoy a delicious dining experience at Graceland Eats, the welcoming diner located inside {SITE_NAME}.
            </p>
            <p>
              Serving breakfast, lunch, and supper daily, Graceland Eats offers guests a relaxed and comfortable atmosphere
              perfect for casual dining, business lunches, and family meals. Our carefully prepared dishes combine great
              taste with warm hospitality to create a memorable culinary experience.
            </p>
            <p>
              Guests can also enjoy a diverse à la carte menu featuring a variety of freshly prepared meals to suit every
              taste and occasion. Whether you are starting your day with a hearty breakfast or unwinding over dinner,
              Graceland Eats is the perfect place to enjoy quality food and excellent service.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={80}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-primary">Menu</h2>
              <a
                href={SITE_RESTAURANT_MENU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Open menu in new tab
                <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border bg-muted/30 shadow-inner">
              <iframe
                title="Graceland Eats restaurant menu (PDF)"
                src={SITE_RESTAURANT_MENU_EMBED_URL}
                className="h-[min(72vh,640px)] w-full bg-background"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              If the menu does not appear in your browser, use &ldquo;Open menu in new tab&rdquo; to view the PDF.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={120} className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <a
              href={SITE_RESTAURANT_MENU_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-[#5d4037] transition-colors"
            >
              Download restaurant menu (PDF)
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-colors"
            >
              Contact us
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </main>
  )
}
