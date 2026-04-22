"use client"

import Image from "next/image"
import { AnimatedSection } from "./animated-section"

/* All usable (non-HEIC) common area + exterior images */
const FACILITIES = [
  {
    src: "/images/LIQUID BLUE PHOTOS/EXT/IMG_610511.png",
    alt: "Guest house exterior",
    label: "Exterior",
    span: "col-span-2 row-span-2",
    height: "h-[420px]",
  },
  {
    src: "/images/LIQUID BLUE PHOTOS/COMMON AREAS/2012B82D-83FE-4030-96F7-0E155B4E64DC.png",
    alt: "Common lounge area",
    label: "Lounge",
    span: "col-span-1",
    height: "h-[200px]",
  },
  {
    src: "/images/LIQUID BLUE PHOTOS/COMMON AREAS/85738344-1E40-4FD8-B2AB-72FF08EF1BB3.png",
    alt: "Common dining area",
    label: "Dining",
    span: "col-span-1",
    height: "h-[200px]",
  },
  {
    src: "/images/LIQUID BLUE PHOTOS/ROOM 8 NIGHTBRIDGE/IMG_5854.png",
    alt: "Hallway",
    label: "Hallway",
    span: "col-span-1",
    height: "h-[200px]",
  },
  {
    src: "/images/LIQUID BLUE PHOTOS/ROOM 8 NIGHTBRIDGE/IMG_5865.png",
    alt: "Corridor",
    label: "Corridor",
    span: "col-span-1",
    height: "h-[200px]",
  },
  {
    src: "/images/LIQUID BLUE PHOTOS/ROOM 3 NIGHTBRIDGE/IMG_5609.png",
    alt: "Seating area",
    label: "Seating Area",
    span: "col-span-2",
    height: "h-[220px]",
  },
]

const FEATURE_ITEMS = [
  { emoji: "🏊", label: "Swimming Pool" },
  { emoji: "🍳", label: "Breakfast Included" },
  { emoji: "📶", label: "Free High-Speed Wi-Fi" },
  { emoji: "🚗", label: "Secure Parking" },
  { emoji: "🔒", label: "24/7 Security" },
  { emoji: "🛎", label: "24-Hour Reception" },
  { emoji: "🧹", label: "Daily Housekeeping" },
  { emoji: "☕", label: "Tea & Coffee Facilities" },
]

export function Facilities() {
  return (
    <section id="facilities" aria-labelledby="facilities-heading" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-[#1a2e4a]/8 text-[#1a2e4a] font-bold tracking-wider uppercase text-xs">
            Our Facilities
          </span>
          <h2 id="facilities-heading" className="mt-5 font-serif text-4xl sm:text-5xl font-medium text-[#1a2e4a] leading-tight">
            Common Areas &amp; Spaces
          </h2>
          <p className="mt-5 text-lg text-[#5c6a7a] leading-relaxed">
            Relax, connect, and feel at home in our beautifully kept shared spaces designed for your comfort.
          </p>
        </AnimatedSection>

        {/* Mosaic photo grid  4 columns, controlled heights, no row-span confusion */}
        <AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-14">
            {FACILITIES.map((item, i) => (
              <div
                key={item.src}
                className={`relative overflow-hidden rounded-2xl group shadow-md ${item.span} ${item.height}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e4a]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <span className="text-white text-sm font-semibold">{item.label}</span>
                </div>
                {/* Always-visible subtle label for larger cards */}
                {i === 0 && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-bold uppercase tracking-widest">
                    Liquid Blue
                  </div>
                )}
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Feature chips */}
        <AnimatedSection delay={100}>
          <div className="border-t border-[#e8e4df] pt-12">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-[#1a2e4a] mb-8">
              Included in every stay
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {FEATURE_ITEMS.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#faf9f7] border border-[#e8e4df] text-[#1a2e4a] text-sm font-medium hover:border-[#4aabba] hover:bg-[#4aabba]/5 transition-colors duration-200"
                >
                  <span aria-hidden="true">{f.emoji}</span>
                  {f.label}
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}
