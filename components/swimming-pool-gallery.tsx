"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { PoolGalleryImage } from "@/lib/swimming-pool-gallery"

type Props = {
  images: PoolGalleryImage[]
  siteName: string
}

export function SwimmingPoolGallery({ images, siteName }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  const close = useCallback(() => setOpen(null), [])
  const prev = useCallback(() => {
    setOpen((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])
  const next = useCallback(() => {
    setOpen((i) => (i === null ? null : (i + 1) % images.length))
  }, [images.length])

  useEffect(() => {
    if (open === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, next, prev, close])

  const current = open !== null ? images[open] : null

  return (
    <div>
      <p className="text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-8">
        Gallery includes one current lodge image and illustrative pool photos as placeholders—we will replace placeholders
        with on-site shots as soon as they are available.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((img, i) => (
          <li key={`${img.src}-${i}`}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className={cn(
                "group relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 text-left",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
              </span>
              {img.isPlaceholder ? (
                <span className="absolute top-3 left-3 rounded-full bg-black/55 text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1">
                  Placeholder
                </span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={open !== null} onOpenChange={(v) => !v && close()}>
        <DialogContent
          showCloseButton={false}
          className="max-w-[min(100vw-2rem,56rem)] w-full p-0 gap-0 border-0 bg-transparent shadow-none overflow-visible"
        >
          {current ? (
            <>
              <DialogTitle className="sr-only">{current.alt}</DialogTitle>
              <div className="relative rounded-2xl overflow-hidden bg-black ring-1 ring-white/15">
                <div className="relative aspect-[4/3] w-full max-h-[min(78vh,720px)]">
                  <Image src={current.src} alt={current.alt} fill className="object-contain bg-black" sizes="100vw" />
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="secondary"
                    className="h-9 w-9 rounded-full bg-white/90 shadow-md"
                    onClick={close}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-md hidden sm:flex"
                  onClick={prev}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Previous</span>
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 shadow-md hidden sm:flex"
                  onClick={next}
                >
                  <ChevronRight className="h-5 w-5" />
                  <span className="sr-only">Next</span>
                </Button>
                <p className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 to-transparent px-4 py-4 text-sm text-white/95 text-center">
                  {current.alt}
                  {current.isPlaceholder ? ` · ${siteName} (placeholder image)` : ""}
                </p>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
