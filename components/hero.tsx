"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { CalendarIcon, ChevronDown, Minus, Plus, Moon, Search } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format, differenceInDays, addDays, startOfDay } from "date-fns"
import { AvailabilityModal, type AvailRoom } from "@/components/availability-modal"

function formatDisplayDate(date: Date) {
  return format(date, "dd MMM ''yy")
}

export function Hero() {
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)
  const [anchorNow, setAnchorNow] = useState<Date | null>(null)
  const [adults, setAdults] = useState(2)
  const [isLoaded, setIsLoaded] = useState(false)

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rooms, setRooms] = useState<AvailRoom[]>([])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const t = new Date()
    setAnchorNow(t)
    setCheckIn(t)
    setCheckOut(addDays(t, 1))
  }, [])

  const nights =
    checkIn && checkOut ? Math.max(1, differenceInDays(checkOut, checkIn)) : 1

  function handleCheckInSelect(date?: Date) {
    if (!date) return
    setCheckIn(date)
    setCheckOut((co) => (co && date < co ? co : addDays(date, 1)))
  }

  const checkAvailability = useCallback(async () => {
    if (!checkIn || !checkOut) return

    setRooms([])
    setError(null)
    setLoading(true)
    setModalOpen(true)

    const startdate = format(checkIn, "yyyy-MM-dd")
    const enddate = format(checkOut, "yyyy-MM-dd")

    try {
      const res = await fetch("/api/availgrid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startdate, enddate }),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        throw new Error(json?.error?.message ?? "Failed to fetch availability")
      }

      // availgrid: data.roomtypes array with availability[].roomrate (already ZAR)
      const raw: AvailRoom[] = Array.isArray(json.data?.roomtypes)
        ? json.data.roomtypes
        : []
      setRooms(raw)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load availability. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }, [checkIn, checkOut])

  return (
    <>
      <section id="home" className="relative min-h-screen flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/LIQUID BLUE PHOTOS/EXT/IMG_610511.png"
            alt="Liquid Blue Guest House exterior"
            fill
            className="object-cover"
            priority
          />
          {/* Match About page hero: dark base, readable headline, booking bar still legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f35]/88 via-[#0d1f35]/45 to-[#0d1f35]/25" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-8">
            <div
              className={`max-w-3xl transition-all duration-1000 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Badge (hidden on small screens to reduce hero clutter) */}
              <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-widest uppercase mb-8">
                <span className="w-2 h-2 rounded-full bg-[#7ecfdd] animate-pulse" aria-hidden="true" />
                Premier Guest House · Louis Trichardt, Limpopo
              </div>

              {/* Heading — always exactly two lines (line break never inside a phrase) */}
              <h1 className="font-serif font-medium text-white leading-[1.08] drop-shadow-2xl text-[clamp(1.75rem,7vw,5.5rem)] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                <span className="block whitespace-nowrap">Refined Living</span>
                <span className="block whitespace-nowrap text-[#7ecfdd]">in Louis Trichardt</span>
              </h1>

              {/* Sub-heading */}
              <p className="mt-7 text-lg sm:text-xl text-white/80 max-w-xl leading-relaxed font-light">
                Elegantly decorated rooms with premium finishes{"  "}tailored for business and leisure guests. Bed &amp; Breakfast, pool &amp; braai included.
              </p>

              {/* CTA */}
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#rooms"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-medium text-sm tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 bg-white text-[#1a2e4a] hover:bg-transparent hover:border-white/70 hover:text-white border-2 border-white hover:-translate-y-0.5 shadow-lg hover:shadow-none"
                >
                  Explore Rooms
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Booking Bar ──────────────────────────────────────────────────── */}
        <div
          id="booking"
          className={`relative z-20 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-0 transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-t-2xl shadow-[0_-8px_40px_rgba(0,0,0,0.18)] overflow-hidden">
            {/* Top accent stripe */}
            <div className="h-1 w-full bg-gradient-to-r from-[#1a2e4a] via-[#4aabba] to-[#7ecfdd]" />

            {/* Fields row */}
            <div className="flex flex-col lg:flex-row lg:items-stretch divide-y lg:divide-y-0 lg:divide-x divide-[#e8e4df]">

              {/* ── Check-in ── */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    disabled={!checkIn}
                    className="group flex-1 flex items-center gap-4 px-6 py-5 text-left hover:bg-[#f0fafb] active:bg-[#f0fafb] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4aabba] focus-visible:ring-inset disabled:opacity-50 disabled:pointer-events-none"
                    aria-label={
                      checkIn
                        ? `Check-in date: ${formatDisplayDate(checkIn)}, click to change`
                        : "Check-in date, loading"
                    }
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#4aabba]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4aabba]/20 group-active:bg-[#4aabba]/20 transition-colors" aria-hidden="true">
                      <CalendarIcon className="h-5 w-5 text-[#4aabba]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a6b75] mb-0.5">Check-in</p>
                      <p className="text-xl font-bold text-[#1a2e4a] leading-none tabular-nums min-h-[1.75rem]">
                        {checkIn ? formatDisplayDate(checkIn) : "—"}
                      </p>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 shadow-2xl border-0 rounded-2xl" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn ?? undefined}
                    onSelect={handleCheckInSelect}
                    disabled={(d) => !anchorNow || d < startOfDay(anchorNow)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* ── Nights indicator (desktop only) ── */}
              <div className="hidden lg:flex items-center justify-center px-5 bg-[#f7f5f2] min-w-[100px]" aria-label={`${nights} night${nights !== 1 ? "s" : ""}`}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-[#4aabba] mb-1">
                    <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                  <p className="text-2xl font-bold text-[#1a2e4a] leading-none" aria-hidden="true">{nights}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5c6a7a] mt-0.5" aria-hidden="true">
                    {nights === 1 ? "night" : "nights"}
                  </p>
                </div>
              </div>

              {/* ── Check-out ── */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    disabled={!checkOut}
                    className="group flex-1 flex items-center gap-4 px-6 py-5 text-left hover:bg-[#f0fafb] active:bg-[#f0fafb] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4aabba] focus-visible:ring-inset disabled:opacity-50 disabled:pointer-events-none"
                    aria-label={
                      checkOut
                        ? `Check-out date: ${formatDisplayDate(checkOut)}, click to change`
                        : "Check-out date, loading"
                    }
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#4aabba]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#4aabba]/20 group-active:bg-[#4aabba]/20 transition-colors" aria-hidden="true">
                      <CalendarIcon className="h-5 w-5 text-[#4aabba]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a6b75] mb-0.5">Check-out</p>
                      <p className="text-xl font-bold text-[#1a2e4a] leading-none tabular-nums min-h-[1.75rem]">
                        {checkOut ? formatDisplayDate(checkOut) : "—"}
                      </p>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 shadow-2xl border-0 rounded-2xl" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut ?? undefined}
                    onSelect={(d) => d && setCheckOut(d)}
                    disabled={(d) => !checkIn || d <= checkIn}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* ── Adults counter ── */}
              <div className="flex items-center gap-4 px-6 py-5 lg:min-w-[200px]">
                <div className="w-10 h-10 rounded-xl bg-[#4aabba]/10 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  <svg className="h-5 w-5 text-[#4aabba]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p id="adults-label" className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#1a6b75] mb-1">Adults</p>
                  <div role="group" aria-labelledby="adults-label" className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAdults((n) => Math.max(1, n - 1))}
                      className="w-7 h-7 rounded-full border-2 border-[#4aabba] flex items-center justify-center text-[#4aabba] hover:bg-[#4aabba] hover:text-white active:bg-[#4aabba] active:text-white transition-all duration-200 disabled:opacity-30"
                      disabled={adults <= 1}
                      aria-label={`Remove adult, currently ${adults}`}
                    >
                      <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <span aria-live="polite" aria-atomic="true" className="text-xl font-bold text-[#1a2e4a] w-6 text-center tabular-nums">
                      {adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAdults((n) => Math.min(6, n + 1))}
                      className="w-7 h-7 rounded-full border-2 border-[#4aabba] flex items-center justify-center text-[#4aabba] hover:bg-[#4aabba] hover:text-white active:bg-[#4aabba] active:text-white transition-all duration-200 disabled:opacity-30"
                      disabled={adults >= 6}
                      aria-label={`Add adult, currently ${adults}`}
                    >
                      <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              {/* ── Check Availability CTA ── */}
              <div className="flex items-center p-3 lg:p-4">
                <button
                  type="button"
                  onClick={checkAvailability}
                  disabled={loading || !checkIn || !checkOut}
                  className="
                    w-full lg:w-auto
                    flex items-center justify-center gap-3
                    px-8 py-4
                    rounded-xl
                    bg-gradient-to-r from-[#1a2e4a] to-[#243d63]
                    hover:from-[#4aabba] hover:to-[#7ecfdd]
                    active:from-[#4aabba] active:to-[#7ecfdd]
                    disabled:opacity-60 disabled:cursor-not-allowed
                    text-white font-bold text-sm tracking-wide uppercase
                    shadow-lg hover:shadow-[#4aabba]/40 active:shadow-[#4aabba]/40
                    transition-all duration-300 hover:-translate-y-0.5 active:-translate-y-0.5
                    whitespace-nowrap
                  "
                  aria-label="Check room availability for selected dates"
                >
                  Check Availability
                  <Search className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Bottom info strip */}
            <div className="px-6 py-2.5 bg-[#f7f5f2] border-t border-[#e8e4df] flex items-center justify-between flex-wrap gap-2">
              <p className="text-[11px] text-[#5c6a7a]">
                Secure booking · Bed &amp; Breakfast included
              </p>
              <p className="text-[11px] font-semibold text-[#1a6b75]">
                {nights} night{nights !== 1 ? "s" : ""} · {adults} adult{adults !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className={`absolute bottom-[calc(100px+2.5rem)] left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <a
            href="#rooms"
            className="flex flex-col items-center gap-1.5 text-white/60 hover:text-white/90 transition-colors"
            aria-label="Scroll down to explore rooms"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold">Scroll</span>
            <ChevronDown className="h-5 w-5 animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Availability modal rendered outside the section for z-index isolation */}
      {checkIn && checkOut ? (
        <AvailabilityModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          checkIn={checkIn}
          checkOut={checkOut}
          nights={nights}
          adults={adults}
          rooms={rooms}
          loading={loading}
          error={error}
        />
      ) : null}
    </>
  )
}
