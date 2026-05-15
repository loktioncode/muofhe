import { SWIMMING_POOL_PHOTO } from "@/lib/lodge-media"

export type PoolGalleryImage = {
  src: string
  /** Short alt for thumbnails */
  alt: string
  /** When true, shown in UI as illustrative until lodge-specific photos are added */
  isPlaceholder: boolean
}

/**
 * Pool page gallery: one on-site image from the lodge library, plus illustrative Unsplash
 * stock (outdoor pools / poolside) until more Muofhe pool photos are available.
 */
export const SWIMMING_POOL_GALLERY: PoolGalleryImage[] = [
  {
    src: SWIMMING_POOL_PHOTO,
    alt: "Outdoor swimming pool at Muofhe Graceland Lodge",
    isPlaceholder: false,
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    alt: "Illustrative resort swimming pool (placeholder)",
    isPlaceholder: true,
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    alt: "Illustrative pool and deck at dusk (placeholder)",
    isPlaceholder: true,
  },
  {
    src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=1600&q=80",
    alt: "Illustrative turquoise pool water (placeholder)",
    isPlaceholder: true,
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
    alt: "Illustrative poolside lounge chairs (placeholder)",
    isPlaceholder: true,
  },
  {
    src: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=80",
    alt: "Illustrative tropical pool setting (placeholder)",
    isPlaceholder: true,
  },
  {
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
    alt: "Illustrative modern pool area (placeholder)",
    isPlaceholder: true,
  },
]
