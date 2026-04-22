"use client"

import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import { SITE_EMAIL, SITE_PHONE_TEL } from "@/lib/site-config"

const INFO_CARDS = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["157 Forestry Rd", "Louis Trichardt, 0920", "Limpopo, South Africa"],
    color: "from-primary to-[#5d4037]",
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+27 68 240 4462"],
    href: `tel:${SITE_PHONE_TEL}`,
    color: "from-secondary to-accent",
  },
  {
    icon: Mail,
    title: "Email",
    lines: [SITE_EMAIL],
    href: `mailto:${SITE_EMAIL}`,
    color: "from-clay to-secondary",
  },
  {
    icon: Clock,
    title: "Reception",
    lines: ["Open 24 hours", "Check-in: 14:00", "Check-out: 10:00"],
    color: "from-[#5d4037] to-clay",
  },
]

export function ContactContent() {
  return (
    <>
      <section aria-label="Contact information" className="bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INFO_CARDS.map((card) => (
              <AnimatedSection key={card.title}>
                <div className="rounded-2xl p-6 bg-background border border-border hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-md`}>
                    <card.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                    {card.title}
                  </h2>
                  {card.lines.map((line, i) =>
                    card.href && i === 0 ? (
                      <a key={i} href={card.href} className="text-secondary hover:underline font-medium block text-sm">
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="text-muted-foreground text-sm">{line}</p>
                    )
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Contact options" className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border">
                <h2 className="font-serif text-3xl font-medium text-primary mb-2">Get in Touch</h2>
                <p className="text-muted-foreground text-sm mb-8">
                  For bookings and enquiries, contact us directly by phone or email.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={`tel:${SITE_PHONE_TEL}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:bg-[#5d4037] transition-all duration-300 hover:shadow-lg"
                  >
                    Call Reception
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href={`mailto:${SITE_EMAIL}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    Send Email
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={150} className="flex flex-col gap-6">
              <div className="rounded-3xl bg-card border border-border p-8">
                <h3 className="font-bold text-primary uppercase text-xs tracking-widest mb-5">
                  Opening Hours
                </h3>
                <div className="space-y-3">
                  {[
                    ["Reception", "24 hours, 7 days"],
                    ["Check-in from", "14:00"],
                    ["Check-out by", "10:00"],
                    ["Breakfast", "07:00 – 10:00"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center py-2.5 border-b border-muted last:border-0">
                      <span className="text-muted-foreground text-sm">{label}</span>
                      <span className="font-semibold text-primary text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
