"use client"

import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"

const INFO_CARDS = [
  {
    icon: MapPin,
    title: "Address",
    lines: ["157 Forestry Rd", "Louis Trichardt, 0920", "Limpopo, South Africa"],
    color: "from-[#1a2e4a] to-[#2d5080]",
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+27 68 240 4462"],
    href: "tel:+27682404462",
    color: "from-[#4aabba] to-[#7ecfdd]",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["liquidblueltt@gmail.com"],
    href: "mailto:liquidblueltt@gmail.com",
    color: "from-[#3a7ab5] to-[#4aabba]",
  },
  {
    icon: Clock,
    title: "Reception",
    lines: ["Open 24 hours", "Check-in: 14:00", "Check-out: 10:00"],
    color: "from-[#2d5080] to-[#3a7ab5]",
  },
]

export function ContactContent() {
  return (
    <>
      {/* ── Info cards ─────────────────────────────────────────────────────── */}
      <section aria-label="Contact information" className="bg-white border-b border-[#e5e1da]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INFO_CARDS.map((card) => (
              <AnimatedSection key={card.title}>
                <div className="rounded-2xl p-6 bg-[#faf9f7] border border-[#e8e4df] hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-md`}>
                    <card.icon className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-widest text-[#1a2e4a] mb-2">
                    {card.title}
                  </h2>
                  {card.lines.map((line, i) =>
                    card.href && i === 0 ? (
                      <a key={i} href={card.href} className="text-[#4aabba] hover:underline font-medium block text-sm">
                        {line}
                      </a>
                    ) : (
                      <p key={i} className="text-[#5c6a7a] text-sm">{line}</p>
                    )
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact actions + extra info ───────────────────────────────────── */}
      <section aria-label="Contact options" className="py-20 bg-[#faf9f7]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#e8e4df]">
                <h2 className="font-serif text-3xl font-medium text-[#1a2e4a] mb-2">Get in Touch</h2>
                <p className="text-[#5c6a7a] text-sm mb-8">
                  For bookings and enquiries, contact us directly by phone or email.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:+27682404462"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1a2e4a] text-white font-bold text-sm tracking-wide hover:bg-[#2d5080] transition-all duration-300 hover:shadow-lg"
                  >
                    Call Reception
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="mailto:liquidblueltt@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1a2e4a] text-[#1a2e4a] font-semibold text-sm hover:bg-[#1a2e4a] hover:text-white transition-all duration-300"
                  >
                    Send Email
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </AnimatedSection>

            {/* Side info */}
            <AnimatedSection delay={150} className="flex flex-col gap-6">
              {/* Hours card */}
              <div className="rounded-3xl bg-white border border-[#e8e4df] p-8">
                <h3 className="font-bold text-[#1a2e4a] uppercase text-xs tracking-widest mb-5">
                  Opening Hours
                </h3>
                <div className="space-y-3">
                  {[
                    ["Reception", "24 hours, 7 days"],
                    ["Check-in from", "14:00"],
                    ["Check-out by", "10:00"],
                    ["Breakfast", "07:00 – 10:00"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between items-center py-2.5 border-b border-[#f0ede8] last:border-0">
                      <span className="text-[#5c6a7a] text-sm">{label}</span>
                      <span className="font-semibold text-[#1a2e4a] text-sm">{value}</span>
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
