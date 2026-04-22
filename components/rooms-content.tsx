"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import {
  Wifi, Tv, Coffee, Bath, BedDouble,
  Star, ArrowRight, ChevronLeft, ChevronRight,
  Loader2, RefreshCw, CheckCircle, Wind, ZoomIn, X,
} from "lucide-react"
import { getRoomTypeRate, useAvailability } from "@/hooks/use-availability"
import { ROOMS_SORTED, roomBookingUrl, formatRoomRate, type IndividualRoom } from "@/lib/rooms-data"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { AnimatedSection } from "./animated-section"

/* ─── Amenity icon map ──────────────────────────────────────────────────── */
const AMENITY_ICONS: Record<string, React.ReactNode> = {
  "Air Conditioning":       <Wind   className="h-4 w-4 text-[#4aabba] flex-shrink-0" aria-hidden="true" />,
  "Free WiFi":              <Wifi   className="h-4 w-4 text-[#4aabba] flex-shrink-0" aria-hidden="true" />,
  "DSTV / Satellite TV":    <Tv     className="h-4 w-4 text-[#4aabba] flex-shrink-0" aria-hidden="true" />,
  "Tea & Coffee":           <Coffee className="h-4 w-4 text-[#4aabba] flex-shrink-0" aria-hidden="true" />,
  "En-suite Bath & Shower": <Bath   className="h-4 w-4 text-[#4aabba] flex-shrink-0" aria-hidden="true" />,
  "En-suite Shower":        <Bath   className="h-4 w-4 text-[#4aabba] flex-shrink-0" aria-hidden="true" />,
  "Work Desk":              <Star   className="h-4 w-4 text-[#4aabba] flex-shrink-0" aria-hidden="true" />,
  "Private Patio":          <Star   className="h-4 w-4 text-[#4aabba] flex-shrink-0" aria-hidden="true" />,
  "Outdoor Furniture":      <Star   className="h-4 w-4 text-[#4aabba] flex-shrink-0" aria-hidden="true" />,
  "Daily Housekeeping":     <CheckCircle className="h-4 w-4 text-[#4aabba] flex-shrink-0" aria-hidden="true" />,
  "Non-smoking":            <CheckCircle className="h-4 w-4 text-[#4aabba] flex-shrink-0" aria-hidden="true" />,
}

/* ─── Per-room photo slider ─────────────────────────────────────────────── */
function PhotoSlider({
  photos,
  name,
  onOpenLightbox,
  cycleSeed = 0,
}: {
  photos: string[]
  name: string
  onOpenLightbox?: (startIndex: number) => void
  cycleSeed?: number
}) {
  const [idx, setIdx] = useState(0)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})

  useEffect(() => {
    if (photos.length <= 1) return
    const cycleMs = 4900 + (Math.abs(cycleSeed) % 7) * 370
    const initialDelayMs = 700 + (Math.abs(cycleSeed) % 9) * 260

    let intervalId: ReturnType<typeof setInterval> | null = null
    const timeoutId = setTimeout(() => {
      setIdx((i) => (i + 1) % photos.length)
      intervalId = setInterval(() => {
        setIdx((i) => (i + 1) % photos.length)
      }, cycleMs)
    }, initialDelayMs)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [photos, cycleSeed])

  function markLoaded(i: number) {
    setLoaded((prev) => ({ ...prev, [i]: true }))
  }

  return (
    <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-2xl bg-[#e5e1da]">
      {/* Skeleton: visible only while the current slide hasn't loaded */}
      {!loaded[idx] && (
        <div className="absolute inset-0 skeleton z-10" aria-hidden="true" />
      )}

      {photos.map((src, i) => (
        <div key={src} className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${i === idx ? "opacity-100" : "opacity-0"}`}>
          <Image src={src} alt={`${name} photo ${i + 1}`} fill
            className={`object-cover transition-opacity duration-[1800ms] ease-in-out ${loaded[i] ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 768px) 100vw, 40vw"
            onLoad={() => markLoaded(i)} />
        </div>
      ))}
      {photos.length > 1 && (
        <>
          <button type="button" onClick={() => setIdx((i) => (i - 1 + photos.length) % photos.length)}
            aria-label="Previous photo"
            className="absolute left-2.5 top-1/2 z-20 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => setIdx((i) => (i + 1) % photos.length)}
            aria-label="Next photo"
            className="absolute right-2.5 top-1/2 z-20 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors">
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </>
      )}
      {onOpenLightbox && (
        <button
          type="button"
          onClick={() => onOpenLightbox(idx)}
          className="absolute left-2.5 top-2.5 z-20 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
          aria-label={`View ${name} photos full screen`}
        >
          <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-wide">Photos</span>
        </button>
      )}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {photos.map((_, i) => (
          <button key={i} type="button" onClick={() => setIdx(i)} aria-label={`Photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-200 ${i === idx ? "bg-white w-4" : "bg-white/50 w-1.5"}`} />
        ))}
      </div>
      <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-[10px] font-semibold">
        {idx + 1}/{photos.length}
      </div>
    </div>
  )
}

/* ─── Individual room card (compact) ────────────────────────────────────── */
function IndividualRoomCard({
  room,
  rate,
  rateLoading,
  onOpenLightbox,
}: {
  room: IndividualRoom
  rate: number
  rateLoading: boolean
  onOpenLightbox: (room: IndividualRoom, startIndex: number) => void
}) {
  const price = formatRoomRate(rate)
  const url   = roomBookingUrl(room.rtid)

  return (
    <article className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border ${room.featured ? "border-[#4aabba]" : "border-[#e8e4df]"}`}
      aria-label={`${room.displayName} – ${room.typeName}`}>

      <div className="p-4">
        <PhotoSlider
          photos={room.photos}
          name={room.displayName}
          cycleSeed={room.roomNumber}
          onOpenLightbox={(i) => onOpenLightbox(room, i)}
        />
      </div>

      <div className="px-5 pb-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div>
            {room.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1a2e4a] text-white text-[9px] font-bold uppercase tracking-widest mb-1.5">
                <Star className="h-2.5 w-2.5 fill-white" aria-hidden="true" /> Popular
              </span>
            )}
            <h3 className="font-serif text-xl font-medium text-[#1a2e4a]">{room.displayName}</h3>
            <span className="mt-1.5 inline-flex w-fit max-w-full items-center rounded-md bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1a2e4a] shadow-sm ring-1 ring-[#e8e4df]">
              <span className="truncate">{room.typeName}</span>
            </span>
          </div>
          <div className="text-right flex-shrink-0 min-w-[72px]">
            {price ? (
              <>
                <span className="text-[#1a2e4a] text-xl font-bold">{price}</span>
                <span className="text-[#8a9aaa] text-[11px] block">/ night · B&amp;B</span>
              </>
            ) : rateLoading ? (
              <div className="flex flex-col items-end gap-1.5 pt-1">
                <div className="h-5 w-16 rounded skeleton" aria-hidden="true" />
                <div className="h-3 w-10 rounded skeleton opacity-60" aria-hidden="true" />
              </div>
            ) : (
              <span className="text-[#8a9aaa] text-xs">B&amp;B incl.</span>
            )}
          </div>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-2">
          {[
            { icon: <BedDouble className="h-3.5 w-3.5" aria-hidden="true"/>, label: room.bedType },
            { icon: <Bath className="h-3.5 w-3.5" aria-hidden="true"/>, label: room.enSuite },
            { icon: <span className="text-[10px] font-bold" aria-hidden="true">m²</span>, label: room.size },
          ].map((s) => (
            <span key={s.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f7f5f2] text-[#1a2e4a] text-xs font-medium">
              {s.icon}{s.label}
            </span>
          ))}
        </div>

        {/* Amenities */}
        <div className="grid grid-cols-2 gap-1.5">
          {room.amenities.slice(0, 6).map((a) => (
            <div key={a} className="flex items-center gap-1.5 text-[12px] text-[#5c6a7a]">
              <CheckCircle className="h-3.5 w-3.5 text-[#4aabba] flex-shrink-0" aria-hidden="true" />{a}
            </div>
          ))}
        </div>

        {/* CTA */}
        <a href={url} target="_blank" rel="noopener noreferrer"
          aria-label={`Book ${room.displayName} (${room.typeName})`}
          className="mt-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1a2e4a] text-white font-bold text-sm hover:bg-[#4aabba] transition-colors duration-200 shadow-sm">
          Book
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}


const ROOM_LIGHTBOX_DIALOG = cn(
  "fixed inset-0 left-0 top-0 z-50 flex h-[100dvh] max-h-[100dvh] w-full max-w-none translate-x-0 translate-y-0",
  "flex-col items-stretch justify-center gap-0 border-0 bg-transparent p-3 sm:p-5 shadow-none",
  "duration-200 sm:max-w-none",
  "data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100",
)

/* ─── Page content ──────────────────────────────────────────────────────── */
export function RoomsContent() {
  const { roomTypes, loading, error } = useAvailability()
  const [photoLightbox, setPhotoLightbox] = useState<{ room: IndividualRoom; index: number } | null>(null)

  const lbPhotos = photoLightbox?.room.photos ?? []
  const lbIndex  = photoLightbox?.index ?? 0
  const lbCurrentSrc = photoLightbox ? lbPhotos[lbIndex] : null

  const closeLightbox = useCallback(() => setPhotoLightbox(null), [])

  const lbPrev = useCallback(() => {
    setPhotoLightbox((cur) => {
      if (!cur) return cur
      const n = cur.room.photos.length
      if (n === 0) return cur
      return { room: cur.room, index: (cur.index - 1 + n) % n }
    })
  }, [])

  const lbNext = useCallback(() => {
    setPhotoLightbox((cur) => {
      if (!cur) return cur
      const n = cur.room.photos.length
      if (n === 0) return cur
      return { room: cur.room, index: (cur.index + 1) % n }
    })
  }, [])

  useEffect(() => {
    if (!photoLightbox) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") lbNext()
      if (e.key === "ArrowLeft") lbPrev()
      if (e.key === "Escape") closeLightbox()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [photoLightbox, lbNext, lbPrev, closeLightbox])

  /* rtid → live per-night rate (ZAR, from availability API) */
  const rateMap = new Map<number, number>()
  roomTypes?.forEach((r) => {
    rateMap.set(r.rtid, getRoomTypeRate(r))
  })

  return (
    <div className="py-12">

      {/* Subtle rate status */}
      <div aria-live="polite" aria-atomic="true" className="text-center mb-8 min-h-[28px]">
        {loading && (
          <span role="status" className="inline-flex items-center gap-2 text-sm text-[#5c6a7a]">
            <Loader2 className="h-4 w-4 animate-spin text-[#4aabba]" aria-hidden="true" />
            Updating live rates…
          </span>
        )}
        {error && !roomTypes && (
          <span role="alert" className="inline-flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            Rates may not be current · check Nightsbridge for latest pricing
          </span>
        )}
      </div>

      {/* Flat grid  all 9 rooms, no category headers */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ROOMS_SORTED.map((room, i) => (
            <AnimatedSection key={room.roomNumber} delay={i * 50}>
              <IndividualRoomCard
                room={room}
                rate={rateMap.get(room.rtid) ?? 0}
                rateLoading={loading && !rateMap.get(room.rtid)}
                onOpenLightbox={(r, i) => setPhotoLightbox({ room: r, index: i })}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <AnimatedSection className="mt-20 mx-4">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#1a2e4a] to-[#3a7ab5] p-10 md:p-14 text-center text-white">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4">Ready for Your Limpopo Escape?</h2>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
            Book directly with us for the best available rate and instant confirmation. We can't wait to welcome you to Louis Trichardt.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://book.nightsbridge.com/39595?nbid=377" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#1a2e4a] font-bold hover:bg-[#7ecfdd] transition-colors duration-200 shadow-xl">
              Check All Availability
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/40 text-white font-semibold hover:bg-white/10 transition-colors duration-200">
              Make an Enquiry
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* Full-screen room photo viewer */}
      <Dialog open={photoLightbox !== null} onOpenChange={(open) => { if (!open) closeLightbox() }}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          aria-describedby={undefined}
          className={ROOM_LIGHTBOX_DIALOG}
        >
          {photoLightbox && (
            <>
              <DialogTitle className="sr-only">
                {photoLightbox.room.displayName} — photo {lbIndex + 1} of {lbPhotos.length}
              </DialogTitle>

              <div className="relative mx-auto flex h-[min(92dvh,calc(100dvh-1.5rem))] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-[#0a1520]/95 ring-1 ring-white/10">
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:scale-105 hover:bg-white/20"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute left-1/2 top-3 z-30 max-w-[85%] -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-center backdrop-blur-sm">
                  <span className="text-xs font-medium text-white sm:text-sm">
                    {photoLightbox.room.displayName} · {lbIndex + 1} / {lbPhotos.length}
                  </span>
                </div>

                <div className="relative min-h-0 flex-1">
                  {lbCurrentSrc && (
                    <Image
                      key={lbCurrentSrc}
                      src={lbCurrentSrc}
                      alt={`${photoLightbox.room.displayName} — photo ${lbIndex + 1}`}
                      fill
                      sizes="100vw"
                      className="object-contain"
                      priority
                    />
                  )}

                  <button
                    type="button"
                    onClick={lbPrev}
                    aria-label="Previous photo"
                    className="group absolute bottom-0 left-0 top-0 z-20 flex w-14 items-center justify-start pl-2 sm:w-20 sm:pl-4"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:scale-105 hover:bg-white/25">
                      <ChevronLeft className="h-6 w-6" />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={lbNext}
                    aria-label="Next photo"
                    className="group absolute bottom-0 right-0 top-0 z-20 flex w-14 items-center justify-end pr-2 sm:w-20 sm:pr-4"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:scale-105 hover:bg-white/25">
                      <ChevronRight className="h-6 w-6" />
                    </span>
                  </button>
                </div>

                <div className="flex-shrink-0 border-t border-white/10 px-4 py-3 sm:px-6">
                  <span className="inline-flex w-fit max-w-full items-center rounded-md bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1a2e4a] shadow-md ring-1 ring-black/10">
                    <span className="truncate">{photoLightbox.room.typeName}</span>
                  </span>
                  <p className="mt-2 text-xs text-white/50">← → to browse · Esc to close</p>
                </div>

                <div className="flex-shrink-0 border-t border-white/5 px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
                  <div className="scrollbar-none flex justify-start gap-2 overflow-x-auto pb-1 sm:justify-center">
                    {lbPhotos.map((src, i) => (
                      <button
                        key={`${src}-${i}`}
                        type="button"
                        onClick={() => setPhotoLightbox({ room: photoLightbox.room, index: i })}
                        aria-label={`Photo ${i + 1}`}
                        className={cn(
                          "relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-14 sm:w-14",
                          i === lbIndex
                            ? "scale-105 border-[#4aabba] shadow-lg shadow-[#4aabba]/40"
                            : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/50",
                        )}
                      >
                        <Image src={src} alt="" fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
