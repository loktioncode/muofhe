"use client"

import { Check } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import {
  POPULAR_AMENITIES,
  PROPERTY_AMENITY_GROUPS,
} from "@/lib/property-amenities"
import { SITE_NAME } from "@/lib/site-config"
import { cn } from "@/lib/utils"

export function PropertyFacilities({ className }: { className?: string }) {
  return (
    <section
      id="facilities"
      aria-labelledby="facilities-heading"
      className={cn("py-20 md:py-28 bg-muted/35 border-y border-border", className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold tracking-widest uppercase text-[11px] mb-4">
            Facilities & services
          </span>
          <h2
            id="facilities-heading"
            className="font-serif text-3xl sm:text-4xl font-semibold text-primary leading-tight text-balance"
          >
            Everything for a comfortable stay
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed text-[15px]">
            From breakfast and dining to parking, pool, and 24-hour support  here is what you can expect at{" "}
            {SITE_NAME}.
          </p>
        </AnimatedSection>

        {/* Popular chips */}
        <AnimatedSection className="mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4 text-center">
            Great for your stay
          </p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
            {POPULAR_AMENITIES.map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full bg-background border border-border px-4 py-2 text-sm text-foreground/90 shadow-sm"
              >
                {label}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Grouped accordion */}
        <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
          {PROPERTY_AMENITY_GROUPS.map((group, gi) => (
            <AnimatedSection key={group.title} delay={gi * 35}>
              <details className="group rounded-2xl border border-border bg-background shadow-sm open:shadow-md transition-shadow">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-primary [&::-webkit-details-marker]:hidden">
                  <span>{group.title}</span>
                  <span
                    aria-hidden="true"
                    className="text-muted-foreground text-xl leading-none transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <ul className="border-t border-border px-5 py-4 pt-3 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item.label}`} className="flex gap-2.5 text-sm text-foreground/85">
                      <Check className="h-4 w-4 shrink-0 text-secondary mt-0.5" aria-hidden="true" />
                      <span>
                        {item.label}
                        {item.note ? (
                          <span className="text-muted-foreground block text-xs mt-0.5">{item.note}</span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </details>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
