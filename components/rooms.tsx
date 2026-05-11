"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import {
  ArrowRight,
  BedDouble,
  Bath,
  Wind,
  Wifi,
  Loader2,
  RefreshCw,
  Sparkles,
} from "lucide-react"
import { getRoomTypeRate, useAvailability } from "@/hooks/use-availability"
import {
  LODGE_RTID_QUEEN,
  LODGE_RTID_TWIN,
  ROOMS_SORTED,
  roomBookingUrl,
  formatRoomRate,
  type IndividualRoom,
} from "@/lib/rooms-data"
import { SITE_NAME } from "@/lib/site-config"
import { AnimatedSection } from "./animated-section"
import { cn } from "@/lib/utils"

/** One entry per Nightsbridge room type (twin + queen), in display order */
const HOME_ROOM_TYPES = ROOMS_SORTED.filter(
  (room, index, arr) => arr.findIndex((r) => r.rtid === room.rtid) === index
)

const ACCENT_RING: Record<number, string> = {
  [LODGE_RTID_TWIN]: "ring-[#5d4037]/25",
  [LODGE_RTID_QUEEN]: "ring-secondary/30",
}

/** Longer interval so slower fades still leave time to enjoy each slide */
const PHOTO_ROTATE_MS = 8500
/** Crossfade duration  slower + cubic easing reads smoother than a snappy dissolve */
const PHOTO_FADE_MS = 2600

const PHOTO_CROSSFADE_STYLE = {
  transitionDuration: `${PHOTO_FADE_MS}ms`,
  transitionTimingFunction: "cubic-bezier(0.42, 0, 0.58, 1)",
  transitionProperty: "opacity",
} as const

function RoomPhotoGallery({
  photos,
  altPrefix,
  priority,
  imageOnLeft,
  accentRing,
}: {
  photos: string[]
  altPrefix: string
  priority?: boolean
  imageOnLeft: boolean
  accentRing: string
}) {
  const slides = photos.filter(Boolean)
  const count = slides.length
  const [active, setActive] = useState(0)
  const [reducedMotion, setReducedMotion] = useState(false)

  /** Inset always shows the next slide so it never matches the large image (when 2+ photos). */
  const insetActive = count > 1 ? (active + 1) % count : 0

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (count <= 1 || reducedMotion) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % count), PHOTO_ROTATE_MS)
    return () => window.clearInterval(id)
  }, [count, reducedMotion])

  if (count === 0) return null

  return (
    <>
      <div
        className={cn(
          "relative rounded-[2rem] overflow-hidden shadow-[0_24px_60px_-12px_rgba(45,27,21,0.35)] ring-1 ring-black/8",
          accentRing,
        )}
      >
        <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full bg-muted/25">
          {slides.map((src, i) => (
            <Image
              key={`main-${src}`}
              src={src}
              alt={`${altPrefix}  photo ${i + 1} of ${count}`}
              fill
              className={cn(
                "object-cover",
                i === active ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none",
              )}
              style={PHOTO_CROSSFADE_STYLE}
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority={priority && i === 0}
              aria-hidden={i !== active}
            />
          ))}
          {count > 1 ? (
            <div
              className="absolute bottom-3 left-1/2 z-[2] flex -translate-x-1/2 gap-1.5 rounded-full bg-black/25 px-2 py-1.5 backdrop-blur-[2px]"
              aria-hidden="true"
            >
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "block h-1 rounded-full transition-all duration-300",
                    i === active ? "w-5 bg-white" : "w-1.5 bg-white/45",
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {count > 1 ? (
        <div
          className={cn(
            "hidden md:block absolute w-[38%] max-w-[220px] aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-background z-10 ring-1 ring-black/6",
            imageOnLeft ? "-bottom-5 -right-2 xl:-right-6" : "-bottom-6 -left-2 xl:-left-10",
          )}
        >
          {slides.map((src, i) => (
            <Image
              key={`inset-${src}`}
              src={src}
              alt={`${altPrefix}  alternate view ${i + 1} of ${count}`}
              fill
              className={cn(
                "object-cover",
                i === insetActive ? "opacity-100 z-[1]" : "opacity-0 z-0 pointer-events-none",
              )}
              style={PHOTO_CROSSFADE_STYLE}
              sizes="220px"
              aria-hidden={i !== insetActive}
            />
          ))}
        </div>
      ) : null}
    </>
  )
}

function RoomShowcaseBlock({
  room,
  rate,
  rateLoading,
  imageOnLeft,
  blockIndex,
}: {
  room: IndividualRoom
  rate: number
  rateLoading: boolean
  /** Desktop: true = photo column left, false = photo right (copy left) */
  imageOnLeft: boolean
  /** 0-based section index on the page */
  blockIndex: number
}) {
  const price = formatRoomRate(rate)
  const bookUrl = roomBookingUrl(room.rtid)
  const photos = room.photos
  const accentRing = ACCENT_RING[room.rtid] ?? "ring-primary/20"
  const idxLabel = `${String(blockIndex + 1).padStart(2, "0")}`

  return (
    <div
      className={cn(
        /* Flex row on lg: twin block places copy left + image right without grid row-split bugs */
        "flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-x-8 xl:gap-x-10 lg:gap-y-0",
      )}
    >
      <div
        className={cn(
          "w-full min-w-0 lg:flex-[7] relative",
          imageOnLeft ? "lg:order-1" : "lg:order-2",
        )}
      >
        <RoomPhotoGallery
          photos={photos}
          altPrefix={room.typeName}
          priority={room.rtid === LODGE_RTID_QUEEN}
          imageOnLeft={imageOnLeft}
          accentRing={accentRing}
        />
      </div>

      <div
        className={cn(
          "w-full min-w-0 flex flex-col justify-start lg:flex-[5]",
          imageOnLeft ? "lg:order-2" : "lg:order-1",
        )}
      >
        {room.featured && (
          <span className="inline-flex items-center gap-1.5 w-fit px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-widest mb-3">
            <Sparkles className="h-3 w-3" aria-hidden="true" /> Guest favourite
          </span>
        )}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1.5">
          {idxLabel} · {room.rtid === LODGE_RTID_TWIN ? "Twin layout" : "Queen layout"}
        </p>
        <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-primary leading-[1.1] text-balance">
          {room.typeName}
        </h3>
        {room.similarRoomCount != null && room.similarRoomCount > 1 && (
          <p className="mt-1.5 text-sm text-muted-foreground">
            Photos show a typical unit
          </p>
        )}
        <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{room.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {[
            { icon: BedDouble, label: room.bedType },
            { icon: Bath, label: room.enSuite },
            { icon: Wind, label: "Air conditioning" },
            { icon: Wifi, label: "Wi‑Fi" },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full bg-primary/[0.06] px-3 py-1.5 text-xs font-medium text-primary"
            >
              <Icon className="h-3.5 w-3.5 text-secondary shrink-0" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-6">
          <div>
            {price ? (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">From</p>
                <p className="text-3xl font-bold text-primary tabular-nums">{price}</p>
                <p className="text-xs text-muted-foreground">per room / night · B&amp;B</p>
              </>
            ) : rateLoading ? (
              <div className="h-14 w-28 rounded-lg skeleton" aria-hidden="true" />
            ) : (
              <p className="text-sm text-muted-foreground">Rates on request</p>
            )}
          </div>
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand inline-flex w-fit items-center justify-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-bold shadow-lg"
          >
            Book this type
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  )
}

function RoomBlockWithRate({
  room,
  roomTypes,
  rateLoading,
  imageOnLeft,
  blockIndex,
}: {
  room: IndividualRoom
  roomTypes: ReturnType<typeof useAvailability>["roomTypes"]
  rateLoading: boolean
  imageOnLeft: boolean
  blockIndex: number
}) {
  const roomType = roomTypes?.find((r) => r.rtid === room.rtid)
  const rate = roomType ? getRoomTypeRate(roomType) : 0
  return (
    <RoomShowcaseBlock
      room={room}
      rate={rate}
      rateLoading={rateLoading && !rate}
      imageOnLeft={imageOnLeft}
      blockIndex={blockIndex}
    />
  )
}

export function Rooms() {
  const { loading, error, roomTypes } = useAvailability()

  return (
    <section id="rooms" className="relative py-12 md:py-16 bg-background overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 10% 20%, oklch(0.92 0.03 55), transparent 50%), radial-gradient(ellipse 60% 40% at 90% 70%, oklch(0.88 0.06 45), transparent 45%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-bold tracking-widest uppercase text-[10px] mb-4">
            Stay with us
          </span>
          <h2 className="font-serif text-[clamp(1.75rem,5vw,2.75rem)] font-semibold text-primary leading-tight text-balance">

            <span className="text-secondary">Comfort you can settle Into</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Experience comfort and style in thoughtfully designed rooms, equipped with modern furnishings, air
            conditioning, a tea and coffee station, satellite TV, and a private en suite bathroom. Enjoy attentive room
            service that cares for every detail for a relaxing stay.
          </p>

          <div aria-live="polite" className="mt-6 min-h-[28px] flex justify-center items-center">
            {loading && (
              <span role="status" className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-secondary shrink-0" aria-hidden="true" />
                Loading live rates…
              </span>
            )}
            {error && !roomTypes && (
              <span role="alert" className="inline-flex items-center gap-2 text-xs text-amber-800 bg-amber-50 px-3 py-1.5 rounded-full">
                <RefreshCw className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Live rates unavailable  book via Nightsbridge for current pricing
              </span>
            )}
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-12 md:gap-16 lg:gap-20" aria-label={`Room types at ${SITE_NAME}`}>
          {HOME_ROOM_TYPES.map((room, i) => (
            <AnimatedSection key={room.rtid} delay={i * 80}>
              <RoomBlockWithRate
                room={room}
                roomTypes={roomTypes}
                rateLoading={loading}
                imageOnLeft={i % 2 === 0}
                blockIndex={i}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
