"use client"

import Image from "next/image"
import {
  Waves,
  Utensils,
  Wifi,
  Car,
  ShieldCheck,
  Clock,
  Sparkles,
  Coffee,
} from "lucide-react"
import { AnimatedSection } from "./animated-section"
import { WaveDivider } from "./wave-divider"

const amenities = [
  {
    icon: Waves,
    title: "Swimming Pool",
    description: "Relax by our sparkling outdoor pool with sun loungers and poolside service.",
  },
  {
    icon: Utensils,
    title: "Restaurant & Bar",
    description: "Savor delicious cuisine and refreshing drinks at our on-site restaurant.",
  },
  {
    icon: Wifi,
    title: "Free High-Speed WiFi",
    description: "Stay connected with complimentary high-speed internet throughout the property.",
  },
  {
    icon: Car,
    title: "Secure Parking",
    description: "Complimentary secure parking for all guests with 24/7 surveillance.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    description: "Your safety is our priority with round-the-clock security personnel.",
  },
  {
    icon: Clock,
    title: "24-Hour Reception",
    description: "Our friendly staff is available around the clock to assist you.",
  },
  {
    icon: Sparkles,
    title: "Daily Housekeeping",
    description: "Enjoy fresh linens and a spotless room with our daily cleaning service.",
  },
  {
    icon: Coffee,
    title: "Breakfast Included",
    description: "Start your day right with our complimentary continental breakfast.",
  },
]

export function Amenities() {
  return (
    <section id="amenities" className="py-24 bg-gradient-to-b from-muted/50 to-card relative overflow-hidden">
      {/* Wave Divider Top */}
      <WaveDivider flip color="fill-background" />

      {/* Background Decorations */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <AnimatedSection>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-2xl overflow-hidden group shadow-lg">
                  <Image
                    src="/images/pool.jpg"
                    alt="Swimming Pool"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden group shadow-lg">
                  <Image
                    src="/images/restaurant.jpg"
                    alt="Restaurant"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-64 rounded-2xl overflow-hidden group shadow-lg">
                  <Image
                    src="/images/room-deluxe.jpg"
                    alt="Deluxe Room"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden group shadow-lg">
                  <Image
                    src="/images/hero.jpg"
                    alt="Guest House Exterior"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Content */}
          <div>
            <AnimatedSection>
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a2e4a]/8 text-[#1a2e4a] font-semibold tracking-wider uppercase text-xs">
              What We Offer
            </span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-medium text-foreground text-balance">
                Amenities & Services
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed mb-10">
                We pride ourselves on providing exceptional amenities and services to make 
                your stay as comfortable and enjoyable as possible.
              </p>
            </AnimatedSection>

            {/* Amenities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {amenities.map((amenity, index) => (
                <AnimatedSection key={amenity.title} delay={index * 50}>
                  <div className="flex gap-4 group p-3 rounded-xl transition-all duration-300 hover:bg-secondary/5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center transition-all duration-300 group-hover:from-secondary group-hover:to-accent group-hover:shadow-lg group-hover:shadow-secondary/25">
                      <amenity.icon className="h-6 w-6 text-secondary transition-colors duration-300 group-hover:text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground group-hover:text-secondary transition-colors duration-300">{amenity.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {amenity.description}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
