"use client"

import { MapPin } from "lucide-react"

const MAP_EMBED =
  "https://maps.google.com/maps?q=-23.028913,29.91147&z=17&output=embed"

export function LocationMap() {
  return (
    <section aria-label="Location map" className="w-full">
      <div className="relative w-full" style={{ height: "280px" }}>
        <iframe
          src={MAP_EMBED}
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Liquid Blue Guest House location in Limpopo, South Africa"
          className="w-full h-full grayscale contrast-[1.1]"
        />
        <div className="absolute top-1/2 left-8 -translate-y-1/2 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3 border border-[#e8e4df] hidden md:flex">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4aabba] to-[#7ecfdd] flex items-center justify-center flex-shrink-0">
            <MapPin className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="font-bold text-[#1a2e4a] text-sm">Liquid Blue Guest House</p>
            <p className="text-[#5c6a7a] text-xs">Limpopo, South Africa</p>
          </div>
        </div>
      </div>
    </section>
  )
}
