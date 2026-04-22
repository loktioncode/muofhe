"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import {
  X,
  BedDouble,
  ShowerHead,
  Wifi,
  Wind,
  Coffee,
  Tv2,
  CalendarCheck,
  Moon,
  ArrowRight,
  AlertCircle,
  Loader2,
  Users,
} from "lucide-react"
import { format } from "date-fns"
import {
  LODGE_RTID_QUEEN,
  LODGE_RTID_TWIN,
  TYPE_META,
  compareAvailRoomTypesPopularFirst,
} from "@/lib/rooms-data"
import { QUEEN_ROOM_PHOTOS, TWIN_ROOM_PHOTOS } from "@/lib/lodge-media"
import { nightsbridgeBookUrl, shortenRoomTypeName } from "@/lib/site-config"

/* ─── Types ─────────────────────────────────────────────────────────────── */
export interface AvailRoomAvailability {
  roomrate: number
  roomsfree: boolean
  closeoutrs: {
    closedout: boolean
    bbrtid: number
    closeouttype: string
  }
}

export interface AvailRoom {
  rtid: number
  rtname: string
  description: string
  maxoccupancy: number
  maxadults: number
  mealplan?: string
  availability?: AvailRoomAvailability[]
}

interface Props {
  open: boolean
  onClose: () => void
  checkIn: Date
  checkOut: Date
  nights: number
  adults: number
  rooms: AvailRoom[]
  loading: boolean
  error: string | null
}

const TYPE_HERO: Record<number, string> = {
  [LODGE_RTID_TWIN]: TWIN_ROOM_PHOTOS[0],
  [LODGE_RTID_QUEEN]: QUEEN_ROOM_PHOTOS[0],
}

function heroImageFor(rtid: number) {
  return TYPE_HERO[rtid] ?? TWIN_ROOM_PHOTOS[0]
}

const KEY_AMENITIES = [
  { icon: Wind,        label: "Air Conditioning" },
  { icon: Wifi,        label: "Free Wi-Fi" },
  { icon: Tv2,         label: "DSTV" },
  { icon: Coffee,      label: "Tea & Coffee" },
  { icon: ShowerHead,  label: "En-suite" },
]

function formatRate(rate: number) {
  return `R ${rate.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function buildBookingUrl(rtid: number, startdate: string, nights: number) {
  return nightsbridgeBookUrl({ startdate, nights, bbrtid: rtid })
}

function isAvailableForEntireStay(room: AvailRoom): boolean {
  if (!Array.isArray(room.availability) || room.availability.length === 0) return false
  return room.availability.every((day) => day.roomsfree === true && day.closeoutrs?.closedout === false)
}

/* ─── Room card ─────────────────────────────────────────────────────────── */
function RoomCard({ room, startdate, nights }: { room: AvailRoom; startdate: string; nights: number }) {
  const meta     = TYPE_META[room.rtid]
  const avail    = room.availability?.[0]
  const rate     = avail?.roomrate
  const isOpen   = isAvailableForEntireStay(room)
  const bookUrl  = buildBookingUrl(room.rtid, startdate, nights)
  const label    = meta?.label ?? shortenRoomTypeName(room.rtname)

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
          <Image
            src={heroImageFor(room.rtid)}
            alt={label}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        {/* Type badge */}
        <div className="absolute top-3 left-3 max-w-[min(100%,calc(100%-5.5rem))] truncate rounded-md bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-md ring-1 ring-black/5">
          {label}
        </div>
        {/* Availability badge */}
        <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-white ${isOpen ? "bg-emerald-500" : "bg-rose-500"}`}>
          <span className={`w-1.5 h-1.5 rounded-full bg-white ${isOpen ? "animate-pulse" : ""}`} aria-hidden="true" />
          {isOpen ? "Available" : "Unavailable"}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Title + specs */}
        <div>
          <h3 className="text-primary font-bold text-lg leading-tight mb-1">{label}</h3>
          {meta && (
            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1">
                <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
                {meta.bedType}
              </span>
              <span className="text-border">·</span>
              <span>{meta.enSuite}</span>
              <span className="text-border">·</span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" aria-hidden="true" />
                Up to {room.maxoccupancy}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {room.description}
        </p>

        {/* Key amenities */}
        <ul className="flex flex-wrap gap-2" aria-label="Key amenities">
          {KEY_AMENITIES.map(({ icon: Icon, label: aLabel }) => (
            <li key={aLabel} className="flex items-center gap-1.5 bg-secondary/10 text-secondary px-2.5 py-1 rounded-full text-[10px] font-semibold">
              <Icon className="h-3 w-3" aria-hidden="true" />
              {aLabel}
            </li>
          ))}
        </ul>

        {/* Rate + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-muted gap-3 flex-wrap">
          {rate != null ? (
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Per room / night · B&amp;B</p>
              <p className="text-2xl font-bold text-primary leading-none mt-0.5">
                {formatRate(rate)}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">Rate on request</p>
          )}
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-[#5d4037] hover:from-secondary hover:to-accent text-white font-bold text-sm tracking-wide uppercase shadow-md hover:shadow-secondary/40 transition-all duration-300 hover:-translate-y-0.5"
            aria-label={`Book ${label}${rate != null ? `, ${formatRate(rate)} per night` : ""}`}
          >
            Book
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}

/* ─── Modal ─────────────────────────────────────────────────────────────── */
export function AvailabilityModal({ open, onClose, checkIn, checkOut, nights, adults, rooms, loading, error }: Props) {
  const dialogRef  = useRef<HTMLDivElement>(null)
  const closeRef   = useRef<HTMLButtonElement>(null)
  const startdate  = format(checkIn, "yyyy-MM-dd")

  // Focus trap + Escape key
  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement
    closeRef.current?.focus()

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return }
      if (e.key !== "Tab") return
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last  = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
      prev?.focus()
    }
  }, [open, onClose])

  if (!open) return null

        const availableRooms = rooms
          .filter((r) => isAvailableForEntireStay(r))
          .sort(compareAvailRoomTypesPopularFirst)

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Room availability"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        className="
          relative z-10 w-full sm:max-w-5xl
          bg-muted
          rounded-t-3xl sm:rounded-3xl
          shadow-[0_24px_80px_rgba(0,0,0,0.35)]
          flex flex-col
          max-h-[92vh] sm:max-h-[85vh]
          overflow-hidden
          animate-in fade-in-0 slide-in-from-bottom-4 duration-300
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5 border-b border-border bg-card">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CalendarCheck className="h-5 w-5 text-secondary" aria-hidden="true" />
              <h2 className="text-xl font-bold text-primary">Available Rooms</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">
                {format(checkIn, "d MMM")} – {format(checkOut, "d MMM yyyy")}
              </span>
              {" · "}
              <Moon className="inline h-3.5 w-3.5 text-secondary -mt-0.5" aria-hidden="true" />{" "}
              <span className="font-semibold">{nights}</span> night{nights !== 1 ? "s" : ""}
              {" · "}
              <Users className="inline h-3.5 w-3.5 -mt-0.5" aria-hidden="true" />{" "}
              <span className="font-semibold">{adults}</span> adult{adults !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center bg-muted hover:bg-border text-muted-foreground hover:text-primary transition-colors"
            aria-label="Close availability panel"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-4" role="status" aria-live="polite">
              <Loader2 className="h-10 w-10 text-secondary animate-spin" aria-hidden="true" />
              <p className="text-muted-foreground font-medium">Checking room availability…</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center" role="alert">
              <AlertCircle className="h-10 w-10 text-rose-400" aria-hidden="true" />
              <div>
                <p className="text-primary font-bold text-lg mb-1">Couldn't load availability</p>
                <p className="text-muted-foreground text-sm max-w-sm">{error}</p>
                <p className="text-muted-foreground text-sm mt-3">
                  Please try{" "}
                  <a
                    href={nightsbridgeBookUrl({ startdate, nights })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline font-semibold"
                  >
                    booking online
                  </a>
                  .
                </p>
              </div>
            </div>
          )}

          {/* No rooms */}
          {!loading && !error && availableRooms.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center" role="status">
              <BedDouble className="h-10 w-10 text-border" aria-hidden="true" />
              <div>
                <p className="text-primary font-bold text-lg mb-1">No rooms available</p>
                <p className="text-muted-foreground text-sm max-w-sm">
                  All rooms are booked for these dates. Try adjusting your dates or{" "}
                  <a
                    href={nightsbridgeBookUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline font-semibold"
                  >
                    check availability online
                  </a>{" "}
                  for alternatives.
                </p>
              </div>
            </div>
          )}

          {/* Room cards */}
          {!loading && !error && availableRooms.length > 0 && (
            <>
              <p className="text-sm text-muted-foreground mb-5">
                <span className="font-bold text-emerald-600">{availableRooms.length}</span> room type{availableRooms.length !== 1 ? "s" : ""} available · rates per room per night, Bed &amp; Breakfast included
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {availableRooms.map((room) => (
                  <RoomCard
                    key={room.rtid}
                    room={room}
                    startdate={startdate}
                    nights={nights}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-card flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-muted-foreground">
            Secure booking · Check-in 14:00 · Check-out 10:00
          </p>
          <a
            href={nightsbridgeBookUrl({ startdate, nights })}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-secondary hover:underline"
          >
            View full availability →
          </a>
        </div>
      </div>
    </div>
  )
}
