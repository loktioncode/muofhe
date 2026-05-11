"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"
import { INDIVIDUAL_ROOMS } from "@/lib/rooms-data"
import { AnimatedSection } from "./animated-section"
import { WaveDivider } from "./wave-divider"

import { PROPERTY_EXTERIOR_PHOTOS, QUEEN_ROOM_PHOTOS, TWIN_ROOM_PHOTOS } from "@/lib/lodge-media"
import { SITE_NAME } from "@/lib/site-config"

type GalleryImage = { src: string; alt: string; category: string }

/** HEIC/HEIF are slow or unsupported in many browsers  never show them in the grid. */
function isRasterWebImage(src: string) {
  const base = src.split(/[#?]/)[0].toLowerCase()
  if (base.endsWith(".heic") || base.endsWith(".heif")) return false
  return true
}

const ALL_IMAGES: GalleryImage[] = [
  ...QUEEN_ROOM_PHOTOS.map((src, i) => ({
    src,
    alt: `Queen room – photo ${i + 1}`,
    category: "Queen room",
  })),
  ...TWIN_ROOM_PHOTOS.map((src, i) => ({
    src,
    alt: `Twin room – photo ${i + 1}`,
    category: "Twin room",
  })),
  ...PROPERTY_EXTERIOR_PHOTOS.map((src, i) => {
    if (i === 2) {
      return {
        src,
        alt: "Graceland Eats restaurant area",
        category: "Restaurant",
      }
    }
    if (i === 4) {
      return {
        src,
        alt: "Swimming pool at Muofhe Graceland Lodge",
        category: "Swimming pool",
      }
    }
    return {
      src,
      alt: i === 0 ? `${SITE_NAME} – grounds` : `${SITE_NAME} – exterior ${i + 1}`,
      category: "Property",
    }
  }),
].filter((img) => isRasterWebImage(img.src))

const CATEGORY_FILTER_ORDER = ["Queen room", "Twin room", "Restaurant", "Swimming pool", "Property"] as const

const _present = new Set(ALL_IMAGES.map((i) => i.category))
const POPULAR_TYPE_NAMES = new Set(
  INDIVIDUAL_ROOMS.filter((r) => r.featured).map((r) => r.typeName),
)
const CATEGORY_CHIPS_ORDER = [
  ...CATEGORY_FILTER_ORDER.filter((c) => _present.has(c) && POPULAR_TYPE_NAMES.has(c)),
  ...CATEGORY_FILTER_ORDER.filter((c) => _present.has(c) && !POPULAR_TYPE_NAMES.has(c)),
]
const CATEGORIES = ["All", ...CATEGORY_CHIPS_ORDER]

/**
 * Desktop mosaic: repeating 6-tile bento on md (6 cols) + lg (12 cols).
 * Auto-placement preserves photo order  hero band, then triptych row.
 */
const MOSAIC_BAND = [
  "md:col-span-6 lg:col-span-7 md:row-span-2 min-h-[210px] md:min-h-[240px] lg:min-h-[min(32vw,340px)]",
  "md:col-span-3 lg:col-span-5 min-h-[100px] md:min-h-[115px] lg:min-h-[140px]",
  "md:col-span-3 lg:col-span-5 min-h-[100px] md:min-h-[115px] lg:min-h-[140px]",
  "md:col-span-2 lg:col-span-4 min-h-[120px] md:min-h-[130px] lg:min-h-[150px]",
  "md:col-span-2 lg:col-span-4 min-h-[120px] md:min-h-[130px] lg:min-h-[150px]",
  "md:col-span-2 lg:col-span-4 min-h-[120px] md:min-h-[130px] lg:min-h-[150px]",
] as const

/** Alternate band: wide strip + tall pair + three tiles (still 6 photos / cycle) */
const MOSAIC_BAND_ALT = [
  "md:col-span-6 lg:col-span-12 min-h-[160px] md:min-h-[180px] lg:min-h-[200px]",
  "md:col-span-3 lg:col-span-6 md:row-span-2 min-h-[200px] md:min-h-[220px] lg:min-h-[260px]",
  "md:col-span-3 lg:col-span-6 md:row-span-2 min-h-[200px] md:min-h-[220px] lg:min-h-[260px]",
  "md:col-span-2 lg:col-span-4 min-h-[115px] md:min-h-[125px] lg:min-h-[145px]",
  "md:col-span-2 lg:col-span-4 min-h-[115px] md:min-h-[125px] lg:min-h-[145px]",
  "md:col-span-2 lg:col-span-4 min-h-[115px] md:min-h-[125px] lg:min-h-[145px]",
] as const

function mosaicClassAll(index: number): string {
  const band = Math.floor(index / 6) % 2 === 0 ? MOSAIC_BAND : MOSAIC_BAND_ALT
  return band[index % 6] ?? MOSAIC_BAND[index % 6]
}

/** Filtered category: smaller set, still a bit of hierarchy */
function mosaicClassFiltered(index: number, count: number): string {
  if (count <= 1) {
    return "md:col-span-6 lg:col-span-12 min-h-[240px] lg:min-h-[280px]"
  }
  if (count === 2) {
    return "md:col-span-3 lg:col-span-6 min-h-[220px] lg:min-h-[260px]"
  }
  if (count === 3) {
    return index === 0
      ? "md:col-span-6 lg:col-span-7 md:row-span-2 min-h-[200px] lg:min-h-[280px]"
      : "md:col-span-3 lg:col-span-5 min-h-[140px] lg:min-h-[160px]"
  }
  if (count === 4) {
    return "md:col-span-3 lg:col-span-6 min-h-[190px] lg:min-h-[240px]"
  }
  if (index === 0) {
    return "md:col-span-6 lg:col-span-7 md:row-span-2 min-h-[200px] lg:min-h-[280px]"
  }
  if (index === 1 || index === 2) {
    return "md:col-span-3 lg:col-span-5 min-h-[125px] lg:min-h-[145px]"
  }
  return "md:col-span-2 lg:col-span-4 min-h-[120px] lg:min-h-[140px]"
}

/* ─── Single gallery grid item with skeleton ────────────────────────────── */
function GalleryItem({
  image,
  index,
  onOpen,
  variant = "grid",
}: {
  image: { src: string; alt: string; category: string }
  index: number
  onOpen: (i: number) => void
  variant?: "grid" | "fullWidth"
}) {
  const [loaded, setLoaded] = useState(false)
  const isFull = variant === "fullWidth"
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open ${image.alt}`}
      className={cn(
        "group relative w-full h-full overflow-hidden cursor-pointer block transition-shadow duration-500",
        isFull
          ? "rounded-none shadow-none ring-0 hover:shadow-none"
          : "rounded-2xl shadow-md hover:shadow-2xl",
      )}
    >
      {/* Skeleton */}
      {!loaded && <div className="absolute inset-0 skeleton z-10" aria-hidden="true" />}

      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={isFull ? "100vw" : "(max-width: 768px) 50vw, 25vw"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "object-cover transition-all duration-700",
          isFull ? "group-hover:scale-[1.02]" : "group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-all duration-500" />

      {/* Zoom icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
          <ZoomIn className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
        <p className="text-white text-sm font-semibold truncate">{image.alt}</p>
        <span className="mt-1.5 inline-flex w-fit max-w-full items-center rounded-md bg-white px-2 py-1 text-left text-[10px] font-bold uppercase tracking-wider text-primary shadow-md ring-1 ring-black/5">
          <span className="truncate">{image.category}</span>
        </span>
      </div>
    </button>
  )
}

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [mobileCarouselApi, setMobileCarouselApi] = useState<CarouselApi>()
  const [mobileSlide, setMobileSlide] = useState(0)

  const filtered = activeCategory === "All"
    ? ALL_IMAGES
    : ALL_IMAGES.filter((img) => img.category === activeCategory)

  const open = (i: number) => setLightboxIndex(i)
  const close = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length))
  }, [filtered.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length))
  }, [filtered.length])

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft")  prev()
      if (e.key === "Escape")     close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightboxIndex, next, prev])

  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null

  useEffect(() => {
    if (!mobileCarouselApi) return
    const api = mobileCarouselApi
    function onSelect() {
      setMobileSlide(api.selectedScrollSnap())
    }
    onSelect()
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    return () => {
      api.off("select", onSelect)
      api.off("reInit", onSelect)
    }
  }, [mobileCarouselApi, filtered.length])

  useEffect(() => {
    setMobileSlide(0)
  }, [activeCategory])

  return (
    <section
      id="gallery"
      className="block py-20 md:py-24 bg-gradient-to-b from-[#faf9f7] via-white to-[#faf9f7] relative overflow-hidden"
    >
      <WaveDivider flip color="fill-[#faf9f7]" className="z-10" />

      <div className="absolute top-1/3 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/8 text-primary font-semibold tracking-wider uppercase text-xs">
            Photo Gallery
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-primary">
            Explore Our Space
          </h2>
          <p className="mt-4 text-[#5c6a7a] leading-relaxed">
            <span className="md:hidden">Swipe through our rooms, pool, and shared spaces. Tap a photo for full screen.</span>
            <span className="hidden md:inline">
              Take a virtual tour of {SITE_NAME} rooms, common areas, restaurant, pool, and surroundings. Click any
              photo to browse the full carousel.
            </span>
          </p>
        </AnimatedSection>

        {/* Category filter */}
        <AnimatedSection className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 mb-8 md:mb-10 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => { setActiveCategory(cat); setLightboxIndex(null) }}
              aria-pressed={activeCategory === cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-md"
                  : "bg-white text-primary border border-border hover:border-primary hover:bg-primary/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </AnimatedSection>

        {/* Mobile: full-bleed carousel  one image per viewport width */}
        <div className="md:hidden relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          <Carousel
            key={activeCategory}
            setApi={setMobileCarouselApi}
            opts={{ align: "start", loop: filtered.length > 1 }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {filtered.map((image, index) => (
                <CarouselItem key={`${image.src}-m`} className="min-w-0 shrink-0 grow-0 basis-full pl-0">
                  <div className="aspect-[4/3] w-full max-h-[min(56vh,420px)] min-h-[220px]">
                    <GalleryItem image={image} index={index} onOpen={open} variant="fullWidth" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant="secondary"
              className="left-2 top-1/2 z-10 size-10 -translate-y-1/2 border-0 bg-white/90 text-primary shadow-sm hover:bg-white disabled:opacity-30"
            />
            <CarouselNext
              variant="secondary"
              className="right-2 top-1/2 z-10 size-10 -translate-y-1/2 border-0 bg-white/90 text-primary shadow-sm hover:bg-white disabled:opacity-30"
            />
          </Carousel>
          <div className="mt-4 px-2 text-center" aria-live="polite">
            <p className="text-sm font-medium text-primary truncate">
              {filtered[mobileSlide]?.alt ?? ""}
            </p>
            <p className="mt-1 text-xs text-[#5c6a7a]">
              <span className="inline-flex items-center rounded-md bg-primary/8 px-2 py-0.5 font-bold uppercase tracking-wider text-primary">
                {filtered[mobileSlide]?.category}
              </span>
              <span className="mx-2 text-border" aria-hidden="true">
                |
              </span>
              {mobileSlide + 1} / {filtered.length}
            </p>
          </div>
        </div>

        {/* Desktop: full-bleed bento mosaic (6 / 12 columns) */}
        <div className="hidden md:block relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2">
          <div className="grid auto-rows-auto grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-1.5 md:gap-2 px-2 sm:px-3 lg:px-5">
            {filtered.map((image, index) => {
              const isAll = activeCategory === "All"
              const cellClass = isAll
                ? mosaicClassAll(index)
                : mosaicClassFiltered(index, filtered.length)

              return (
                <AnimatedSection
                  key={`${image.src}-${activeCategory}`}
                  delay={Math.min(index, 8) * 45}
                  className={cn("min-w-0", cellClass)}
                >
                  <GalleryItem image={image} index={index} onOpen={open} />
                </AnimatedSection>
              )
            })}
          </div>
        </div>

        {/* Count (desktop; mobile uses line under carousel) */}
        <p className="mt-6 hidden md:block text-center text-sm text-[#3d4f61]" aria-live="polite">
          {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
          {activeCategory !== "All" ? ` · ${activeCategory}` : ""}
        </p>
      </div>

      <WaveDivider color="fill-[#faf9f7]" />

      {/* ─── Lightbox  full-viewport; overrides default centered modal positioning */}
      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => { if (!open) close() }}>
        <DialogContent
          showCloseButton={false}
          overlayClassName="bg-black/90 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          aria-describedby={undefined}
          className={cn(
            "fixed inset-0 left-0 top-0 z-50 flex h-[100dvh] max-h-[100dvh] w-full max-w-none translate-x-0 translate-y-0",
            "flex-col items-stretch justify-center gap-0 border-0 bg-transparent p-3 sm:p-5 shadow-none",
            "duration-200 sm:max-w-none",
            "data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100",
          )}
        >
          <DialogTitle className="sr-only">{current?.alt ?? "Gallery"}</DialogTitle>

          <div className="relative mx-auto flex h-[min(92dvh,calc(100dvh-1.5rem))] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-[#0a1520]/95 ring-1 ring-white/10">
            {/* Close */}
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:scale-105 hover:bg-white/20"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {lightboxIndex !== null && (
              <div className="absolute left-1/2 top-3 z-30 -translate-x-1/2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="text-sm font-medium text-white">
                  {lightboxIndex + 1} / {filtered.length}
                </span>
              </div>
            )}

            {/* Image  min-h-0 so flex + fill Image lays out correctly for every category length */}
            <div className="relative min-h-0 flex-1">
              {current ? (
                <Image
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-contain"
                  priority
                />
              ) : null}

              <button
                type="button"
                onClick={prev}
                aria-label="Previous image"
                className="group absolute bottom-0 left-0 top-0 z-20 flex w-14 items-center justify-start pl-2 sm:w-20 sm:pl-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:scale-105 hover:bg-white/25">
                  <ChevronLeft className="h-6 w-6" />
                </span>
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next image"
                className="group absolute bottom-0 right-0 top-0 z-20 flex w-14 items-center justify-end pr-2 sm:w-20 sm:pr-4"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:scale-105 hover:bg-white/25">
                  <ChevronRight className="h-6 w-6" />
                </span>
              </button>
            </div>

            {current && (
              <div className="flex flex-shrink-0 flex-col gap-1 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
                <div className="min-w-0 pr-8 sm:pr-0">
                  <p className="font-semibold text-white">{current.alt}</p>
                  <span className="mt-2 inline-flex w-fit max-w-full items-center rounded-md bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-md ring-1 ring-black/5">
                    <span className="truncate">{current.category}</span>
                  </span>
                </div>
                <p className="hidden text-xs text-white/70 sm:block sm:flex-shrink-0">
                  ← → to navigate · Esc to close
                </p>
              </div>
            )}

            <div className="flex-shrink-0 border-t border-white/5 px-3 pb-3 pt-2 sm:px-4 sm:pb-4">
              <div className="scrollbar-none flex justify-start gap-2 overflow-x-auto pb-1 sm:justify-center">
                {filtered.map((img, i) => (
                  <button
                    key={`${img.src}-${i}`}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={img.alt}
                    className={cn(
                      "relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-14 sm:w-14",
                      i === lightboxIndex
                        ? "scale-105 border-secondary shadow-lg shadow-secondary/40"
                        : "border-white/20 opacity-60 hover:opacity-100 hover:border-white/50",
                    )}
                  >
                    <Image src={img.src} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
