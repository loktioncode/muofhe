"use client"

import { MapPin } from "lucide-react"
import { SITE_NAME, siteAddressMapsEmbedUrl } from "@/lib/site-config"

export function LocationMap() {
  const mapEmbedSrc = siteAddressMapsEmbedUrl()

  return (
    <section aria-label="Location map" className="w-full">
      <div className="relative w-full" style={{ height: "280px" }}>
        <iframe
          src={mapEmbedSrc}
          width="100%"
          height="280"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${SITE_NAME} location in Limpopo, South Africa`}
          className="w-full h-full grayscale contrast-[1.1]"
        />
        <div className="absolute top-1/2 left-8 -translate-y-1/2 bg-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-3 border border-border hidden md:flex">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0">
            <MapPin className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="font-bold text-primary text-sm">{SITE_NAME}</p>
            <p className="text-muted-foreground text-xs">Limpopo, South Africa</p>
          </div>
        </div>
      </div>
    </section>
  )
}
