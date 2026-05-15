import Image from "next/image"
import { Building2, Check, Presentation, Users } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { CONFERENCE_CENTER_GALLERY_IMAGES } from "@/lib/lodge-media"
import { SITE_NAME } from "@/lib/site-config"

const conferencingBullets = [
  "Conference Hall for up to 250 guests",
  "Boardroom for up to 30 guests",
  "Flexible conference packages for different needs and budgets",
  "Warm hospitality and modern event spaces in Thohoyandou",
]

const offerings = [
  {
    icon: Presentation,
    title: "Meetings & events",
    body:
      "Host workshops, strategy sessions, or conferences in a calm setting away from city noise, with reception support and layouts tailored to your agenda.",
  },
  {
    icon: Building2,
    title: "Spaces that scale",
    body:
      "From the spacious Conference Hall to the intimate Boardroom, choose the right room for conferences, weddings, celebrations, or executive sessions.",
  },
  {
    icon: Users,
    title: "Guests under one roof",
    body:
      "Combine your event with on-site accommodation so delegates stay together while you focus on the programme.",
  },
]

export function ConferenceCentreSection() {
  return (
    <section className="py-16 md:py-20 bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-12 text-center max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs mb-4">
            Conference centre
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-primary">Conferencing &amp; events</h2>
          <p className="mt-3 text-muted-foreground text-[15px] leading-relaxed">
            Modern spaces and packages for professional and social occasions at {SITE_NAME}.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-20">
          <AnimatedSection className="lg:col-span-7 space-y-5">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs">
              Conferencing &amp; events
            </span>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-[15px]">
              <p>
                At {SITE_NAME}, we offer modern event spaces suited for both professional and social occasions.
              </p>
              <p>
                Our spacious Conference Hall accommodates up to 250 guests, ideal for conferences, weddings, and
                celebrations. With its contemporary design, it sets the stage for memorable events.
              </p>
              <p>
                For smaller gatherings, our elegant Boardroom fits up to 30 guests, perfect for executive meetings and
                intimate gatherings.
              </p>
              <p>
                We provide flexible conference packages tailored to meet various event needs and budgets. Whether for
                business or special celebrations, {SITE_NAME} combines the perfect space with warm hospitality for a
                memorable experience.
              </p>
            </div>
            <ul className="space-y-3 pt-2">
              {conferencingBullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-foreground/90">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/15">
                    <Check className="h-3 w-3 text-secondary" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection delay={120} className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/8 aspect-[4/3] relative">
              <Image
                src={CONFERENCE_CENTER_GALLERY_IMAGES[0]}
                alt={`${SITE_NAME} lodge grounds and venue setting`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </AnimatedSection>
        </div>

        <div className="mb-16 md:mb-20">
          <AnimatedSection className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-wider uppercase text-xs mb-4">
              What we offer
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-primary">Space, service &amp; flexibility</h3>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offerings.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 70}>
                <div className="h-full rounded-2xl bg-card border border-border p-8 shadow-sm hover:shadow-md hover:border-secondary/25 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-6">
                    <item.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h4 className="font-semibold text-primary text-lg mb-3">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <div>
          <AnimatedSection className="mb-10 text-center">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-primary">Venue snapshots</h3>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {CONFERENCE_CENTER_GALLERY_IMAGES.map((src, i) => (
              <AnimatedSection key={src} delay={i * 60}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 group">
                  <Image
                    src={src}
                    alt={`${SITE_NAME} venue and grounds, photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
