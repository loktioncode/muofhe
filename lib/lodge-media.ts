/**
 * Public URLs for Muofhe Graceland Lodge photography (spaces encoded for Next/Image).
 */

const LODGE_FOLDER = "MUOFHE GRACELAND LODGE PICTURES"

export function lodgeImageUrl(filename: string): string {
  return `/images/${encodeURIComponent(LODGE_FOLDER)}/${encodeURIComponent(filename)}`
}

/** Twin rooms  two single beds (representative angles). */
export const TWIN_ROOM_PHOTOS = [
  lodgeImageUrl("IMG-20201028-WA0001.png"),
  lodgeImageUrl("IMG-20201028-WA0033.png"),
  lodgeImageUrl("IMG-20201028-WA0005.png"),
  lodgeImageUrl("IMG-20201028-WA0043.png"),
]

/** Queen rooms  one queen-size bed. */
export const QUEEN_ROOM_PHOTOS = [
  lodgeImageUrl("IMG-20201028-WA0030.png"),
  lodgeImageUrl("IMG-20201028-WA0004.png"),
  lodgeImageUrl("IMG-20201028-WA0031.png"),
]

/** Grounds & exterior (no interior bedrooms). */
export const PROPERTY_EXTERIOR_PHOTOS = [
  lodgeImageUrl("IMG-20201028-WA0039.png"),
  lodgeImageUrl("IMG-20201028-WA0045.jpg"),
  lodgeImageUrl("IMG-20201028-WA0042.png"),
  lodgeImageUrl("IMG-20201028-WA0040.png"),
  lodgeImageUrl("IMG-20201028-WA0027.png"),
  lodgeImageUrl("IMG-20201028-WA0012.png"),
  lodgeImageUrl("IMG-20201028-WA0013.png"),
  lodgeImageUrl("IMG-20201028-WA0036.png"),
  lodgeImageUrl("IMG-20201028-WA0044.png"),
  lodgeImageUrl("photo_2025-12-08_23-35-01.jpg"),
  lodgeImageUrl("WhatsApp Image 2025-12-09 at 12.32.25.jpeg"),
  lodgeImageUrl("IMG-20201104-WA0026.jpg"),
]

/** Homepage hero background  same shot as gallery caption “… exterior 2”. */
export const HERO_BACKGROUND_IMAGE = PROPERTY_EXTERIOR_PHOTOS[1]

/**
 * Contact page hero  explicit filename (stable if `PROPERTY_EXTERIOR_PHOTOS` order changes).
 * Distinct from homepage (`HERO_BACKGROUND_IMAGE`) and conference hero (`CONFERENCE_CENTER_HERO_IMAGE`).
 */
export const CONTACT_PAGE_HERO_IMAGE = lodgeImageUrl("IMG-20201028-WA0039.png")

/**
 * Conference & dining page hero and gallery (grounds and exterior from the lodge library).
 */
export const CONFERENCE_CENTER_HERO_IMAGE = PROPERTY_EXTERIOR_PHOTOS[6]
export const CONFERENCE_CENTER_GALLERY_IMAGES = [
  PROPERTY_EXTERIOR_PHOTOS[3],
  PROPERTY_EXTERIOR_PHOTOS[7],
  PROPERTY_EXTERIOR_PHOTOS[10],
]

/** Same index as gallery “Swimming pool” category (`PROPERTY_EXTERIOR_PHOTOS` index 4). */
export const SWIMMING_POOL_PHOTO = PROPERTY_EXTERIOR_PHOTOS[4]

/** Same index as gallery “Restaurant” category (`PROPERTY_EXTERIOR_PHOTOS` index 2). */
export const RESTAURANT_AREA_PHOTO = PROPERTY_EXTERIOR_PHOTOS[2]
