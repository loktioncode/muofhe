"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight, ChevronLeft, ChevronRight,
  BedDouble, Bath, Wind, Wifi, ArrowUpRight,
  Loader2, RefreshCw,
} from "lucide-react"
import { getRoomTypeRate, useAvailability } from "@/hooks/use-availability"
import { ROOMS_SORTED, roomBookingUrl, formatRoomRate, type IndividualRoom } from "@/lib/rooms-data"
import { AnimatedSection } from "./animated-section"

const CARD_W   = 360   // desktop card width (px)
const CARD_GAP = 20
const HOME_ROOM_TYPES = ROOMS_SORTED.filter((room, index, arr) => arr.findIndex((r) => r.rtid === room.rtid) === index)

/* ─── TYPE colour accent per rtid ──────────────────────────────────────── */
const TYPE_ACCENT: Record<number, string> = {
  1: "#c9a96e", // King   – warm gold
  2: "#7ecfdd", // Twin   – teal
  3: "#3a7ab5", // Queen  – blue
  4: "#1a6b75", // Exec   – dark teal
  5: "#4aabba", // Deluxe – light teal
}

/* ─── Minimalist card ───────────────────────────────────────────────────── */
function RoomCard({
  room,
  rate,
  rateLoading,
  priority = false,
  stacked = false,
}: {
  room: IndividualRoom
  rate: number
  rateLoading: boolean
  priority?: boolean
  /** Full-width column layout (mobile stack); carousel uses fixed card width */
  stacked?: boolean
}) {
  const [idx, setIdx] = useState(0)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})
  const price  = formatRoomRate(rate)
  const url    = roomBookingUrl(room.rtid)
  const photos = room.photos
  const accent = TYPE_ACCENT[room.rtid] ?? "#4aabba"

  useEffect(() => {
    if (photos.length <= 1) return
    const cycleMs = 5000 + room.rtid * 420
    const initialDelayMs = 800 + room.rtid * 310

    let intervalId: ReturnType<typeof setInterval> | null = null
    const timeoutId = setTimeout(() => {
      setIdx((prev) => (prev + 1) % photos.length)
      intervalId = setInterval(() => {
        setIdx((prev) => (prev + 1) % photos.length)
      }, cycleMs)
    }, initialDelayMs)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [photos, room.rtid])

  function markLoaded(i: number) {
    setLoaded((prev) => ({ ...prev, [i]: true }))
  }

  return (
    <article
      className={`group relative rounded-3xl overflow-hidden select-none cursor-pointer ${
        stacked
          ? "w-full max-w-lg mx-auto"
          : "flex-shrink-0 w-[calc(100vw-2.5rem)] sm:w-[360px]"
      }`}
      style={{ height: 480 }}
      aria-label={room.typeName}
    >
      {/* ── Photo ── */}
      {!loaded[idx] && <div className="absolute inset-0 skeleton z-10" aria-hidden="true" />}
      {photos.map((photo, i) => (
        <div key={`${room.rtid}-${photo}-${i}`} className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${i === idx ? "opacity-100" : "opacity-0"}`}>
          <Image
            src={photo}
            alt={room.typeName}
            fill
            sizes="360px"
            unoptimized
            priority={priority && i === 0}
            onLoad={() => markLoaded(i)}
            className={`object-cover transition-all duration-[1800ms] ease-in-out group-hover:scale-110 group-hover:brightness-[0.35] touch:scale-110 touch:brightness-[0.35] ${
              loaded[i] ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      ))}

      {/* ── Permanent bottom scrim (default state) ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/90 via-[#0d1f35]/10 to-transparent transition-opacity duration-500 group-hover:opacity-0 touch:opacity-0" />

      {/* ── Accent bar ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] transition-transform duration-300"
        style={{ backgroundColor: accent }}
      />

      {/* ── Default label (always visible, fades on hover) ── */}
      <div className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-400 group-hover:opacity-0 group-hover:translate-y-2 touch:opacity-0 touch:translate-y-2 pointer-events-none">
        <span
          className="mb-1.5 inline-flex w-fit max-w-[calc(100%-2rem)] items-center rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a2e4a] shadow-md ring-1 ring-black/5"
          style={{ borderLeftWidth: 3, borderLeftColor: accent, borderLeftStyle: "solid" }}
        >
          <span className="truncate">{room.typeName}</span>
        </span>
        <div className="flex items-end justify-between gap-2">
          <h3 className="font-serif text-xl font-medium text-white leading-tight">{room.typeName}</h3>
          <div className="text-right flex-shrink-0">
            {price ? (
              <>
                <span className="text-white font-bold text-base leading-none">{price}</span>
                <span className="text-white/50 text-[10px] block mt-0.5">/ night</span>
              </>
            ) : rateLoading ? (
              <div className="flex flex-col items-end gap-1">
                <div className="h-4 w-12 rounded skeleton opacity-50" aria-hidden="true" />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ── Hover detail panel ── */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 py-6 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-out pointer-events-none group-hover:pointer-events-auto touch:opacity-100 touch:translate-y-0 touch:pointer-events-auto">
        {/* Type */}
        <span
          className="mb-2 inline-flex w-fit max-w-full items-center rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1a2e4a] shadow-md ring-1 ring-black/5"
          style={{ borderLeftWidth: 3, borderLeftColor: accent, borderLeftStyle: "solid" }}
        >
          <span className="truncate">{room.typeName}</span>
        </span>
        <h3 className="font-serif text-2xl font-medium text-white mb-3 leading-tight">
          {room.typeName}
        </h3>

        {/* Specs row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4 text-[11px] text-white/60 font-medium">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            {room.bedType}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            {room.enSuite}
          </span>
          <span className="flex items-center gap-1.5">
            <Wind className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            AC
          </span>
          <span className="flex items-center gap-1.5">
            <Wifi className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
            Wi-Fi
          </span>
          {room.patio && (
            <span className="flex items-center gap-1.5">
              <ArrowUpRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              Patio
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-white/65 text-[12px] leading-relaxed line-clamp-3 mb-5">
          {room.description}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            {price ? (
              <>
                <span className="text-white font-bold text-lg leading-none">{price}</span>
                <span className="text-white/45 text-[10px] block mt-0.5">per night · B&amp;B</span>
              </>
            ) : rateLoading ? (
              <div className="h-5 w-16 rounded skeleton opacity-50" aria-hidden="true" />
            ) : (
              <span className="text-white/45 text-xs">B&amp;B incl.</span>
            )}
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Book ${room.typeName}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[#0d1f35] font-bold text-xs uppercase tracking-wide transition-all duration-200 hover:scale-105 shadow-lg"
            style={{ backgroundColor: accent }}
          >
            Book
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}

/* ─── Rate resolver ─────────────────────────────────────────────────────── */
function RoomCardWithRate({
  room,
  roomTypes,
  rateLoading,
  priority = false,
  stacked = false,
}: {
  room: IndividualRoom
  roomTypes: ReturnType<typeof useAvailability>["roomTypes"]
  rateLoading: boolean
  priority?: boolean
  stacked?: boolean
}) {
  const roomType = roomTypes?.find((r) => r.rtid === room.rtid)
  const rate = roomType ? getRoomTypeRate(roomType) : 0
  return (
    <RoomCard
      room={room}
      rate={rate}
      rateLoading={rateLoading && !rate}
      priority={priority}
      stacked={stacked}
    />
  )
}

/* ─── Section ───────────────────────────────────────────────────────────── */
export function Rooms() {
  const { loading, error, roomTypes } = useAvailability()

  const containerRef = useRef<HTMLDivElement>(null)
  const [paused,  setPaused]  = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd,   setAtEnd]   = useState(false)

  const STEP = CARD_W + CARD_GAP

  const scrollPrev = useCallback(() => {
    containerRef.current?.scrollBy({ left: -STEP * 2, behavior: "smooth" })
  }, [STEP])

  const scrollNext = useCallback(() => {
    containerRef.current?.scrollBy({ left: STEP * 2, behavior: "smooth" })
  }, [STEP])

  const onScroll = useCallback(() => {
    const el = containerRef.current
    if (!el || !el.offsetParent) return
    setAtStart(el.scrollLeft <= 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }, [])

  /* Keyboard nav  desktop only */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = containerRef.current
      if (!el?.offsetParent) return
      if (e.key === "ArrowLeft") scrollPrev()
      if (e.key === "ArrowRight") scrollNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [scrollPrev, scrollNext])

  return (
    <section id="rooms" className="py-20 bg-[#faf9f7]">

      {/* Header */}
      <AnimatedSection className="text-center max-w-3xl mx-auto px-4 mb-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#1a2e4a]/8 text-[#1a2e4a] font-bold tracking-widest uppercase text-[10px] mb-5">
          Where to Stay in Limpopo
        </span>
        <h2 className="font-serif font-medium text-[#1a2e4a] leading-tight whitespace-nowrap text-[clamp(1.35rem,4.2vw,3rem)]">
          Your Home in the Heart of Limpopo
        </h2>
        <p className="mt-4 text-base text-[#5c6a7a] leading-relaxed max-w-lg mx-auto">
          Nestled in Louis Trichardt, the gateway to Limpopo's greatest wonders{"  "}from Mapungubwe to the Soutpansberg mountains. Each room is warm, beautifully appointed, and waiting to welcome you back.{" "}
          <Link href="/rooms" className="text-[#4aabba] font-semibold hover:underline">
            Explore all rooms
          </Link>
        </p>

        <div aria-live="polite" aria-atomic="true" className="mt-5 min-h-[24px] flex justify-center">
          {loading && (
            <span role="status" className="inline-flex items-center gap-2 text-sm text-[#5c6a7a]">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-[#4aabba]" aria-hidden="true" />
              Updating live rates…
            </span>
          )}
          {error && !roomTypes && (
            <span role="alert" className="inline-flex items-center gap-2 text-xs text-amber-700">
              <RefreshCw className="h-3 w-3" aria-hidden="true" />
              Live rates unavailable
            </span>
          )}
        </div>
      </AnimatedSection>

      {/* Mobile: all room types, single column  no carousel */}
      <div
        className="flex flex-col gap-8 px-4 pb-2 md:hidden"
        aria-label="All room types at Liquid Blue"
      >
        {HOME_ROOM_TYPES.map((room, i) => (
          <RoomCardWithRate
            key={room.rtid}
            room={room}
            roomTypes={roomTypes}
            rateLoading={loading}
            priority={i === 0}
            stacked
          />
        ))}
      </div>

      {/* Desktop: horizontal carousel */}
      <div
        role="region"
        aria-label="Rooms carousel – use left/right arrows or keyboard to navigate"
        className="relative hidden md:block"
      >
        {/* Prev */}
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous rooms"
          className={`absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white border border-[#e8e4df] text-[#1a2e4a] shadow-md hover:bg-[#1a2e4a] hover:text-white hover:border-[#1a2e4a] transition-all duration-200 ${atStart ? "opacity-30 cursor-not-allowed" : "opacity-100"}`}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Next */}
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next rooms"
          className={`absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white border border-[#e8e4df] text-[#1a2e4a] shadow-md hover:bg-[#1a2e4a] hover:text-white hover:border-[#1a2e4a] transition-all duration-200 ${atEnd ? "opacity-30 cursor-not-allowed" : "opacity-100"}`}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-16 z-10 bg-gradient-to-r from-[#faf9f7] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-16 z-10 bg-gradient-to-l from-[#faf9f7] to-transparent" />

        {/* Track */}
        <div
          ref={containerRef}
          onScroll={onScroll}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="flex overflow-x-auto pb-3 px-4 sm:px-16 scroll-smooth"
          style={{
            gap: CARD_GAP,
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {HOME_ROOM_TYPES.map((room, i) => (
            <RoomCardWithRate
              key={room.rtid}
              room={room}
              roomTypes={roomTypes}
              rateLoading={loading}
              priority={i === 0}
            />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-5" aria-hidden="true">
          {HOME_ROOM_TYPES.map((room) => (
            <div
              key={room.rtid}
              className="h-1 rounded-full bg-[#1a2e4a]/20"
              style={{ width: 6 }}
            />
          ))}
        </div>
      </div>

      {/* CTAs */}
      <AnimatedSection className="mt-12 text-center px-4 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#1a2e4a] font-bold text-sm shadow-lg transition-all duration-300 hover:bg-[#1a2e4a] hover:text-white hover:-translate-y-0.5 hover:shadow-xl"
        >
          Explore All Rooms
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <a
          href="https://book.nightsbridge.com/39595?nbid=377"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-[#1a2e4a] text-[#1a2e4a] font-semibold text-sm hover:bg-[#1a2e4a] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
        >
          Check Availability
        </a>
      </AnimatedSection>
    </section>
  )
}
