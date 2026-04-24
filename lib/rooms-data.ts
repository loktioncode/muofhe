import { format } from "date-fns"
import { nightsbridgeBookUrl, SITE_NAME } from "@/lib/site-config"
import {
  lodgeImageUrl,
  PROPERTY_EXTERIOR_PHOTOS,
  QUEEN_ROOM_PHOTOS,
  TWIN_ROOM_PHOTOS,
} from "@/lib/lodge-media"

/**
 * Muofhe Graceland Lodge  two physical room layouts (many identical units each).
 * Nightsbridge: twin → LODGE_RTID_TWIN, queen → LODGE_RTID_QUEEN (defaults 1 & 2).
 */
export const LODGE_RTID_TWIN = (() => {
  const n = Number(process.env.NEXT_PUBLIC_NB_RTID_TWIN)
  return Number.isFinite(n) && n > 0 ? n : 1
})()

export const LODGE_RTID_QUEEN = (() => {
  const n = Number(process.env.NEXT_PUBLIC_NB_RTID_QUEEN)
  return Number.isFinite(n) && n > 0 ? n : 2
})()

export interface IndividualRoom {
  roomNumber: number
  displayName: string
  rtid: number
  typeName: string
  bedType: string
  enSuite: string
  patio?: boolean
  size: string
  description: string
  amenities: string[]
  photos: string[]
  featured?: boolean
  /** How many guest rooms share this exact layout (approximate; update as needed). */
  similarRoomCount?: number
}

const TWIN_DESC =
  "Bright twin room with two comfortable single beds, shared headboard, crisp linen, and air conditioning. Ideal for colleagues, friends, or family travelling together."

const QUEEN_DESC =
  "Relax in a queen-size bed with premium linen, workspace, wardrobe, and air conditioningcalm tones and thoughtful touches for a restful stay."

const BASE = [
  "Air Conditioning",
  "DSTV / Satellite TV",
  "Free WiFi",
  "Tea & Coffee",
  "Work Desk",
  "Daily Housekeeping",
  "Non-smoking",
  "En-suite Shower",
]

const TWIN_AM = [...BASE]
const QUEEN_AM = [...BASE]

export const INDIVIDUAL_ROOMS: IndividualRoom[] = [
  {
    roomNumber: 1,
    displayName: "Twin room",
    rtid: LODGE_RTID_TWIN,
    typeName: "Twin room",
    bedType: "2 × single beds",
    enSuite: "Private en-suite shower",
    size: "Comfort twin layout",
    description: TWIN_DESC,
    amenities: TWIN_AM,
    photos: TWIN_ROOM_PHOTOS,
    similarRoomCount: 10,
  },
  {
    roomNumber: 2,
    displayName: "Queen room",
    rtid: LODGE_RTID_QUEEN,
    typeName: "Queen room",
    bedType: "1 × queen-size bed",
    enSuite: "Private en-suite shower",
    size: "Comfort queen layout",
    description: QUEEN_DESC,
    amenities: QUEEN_AM,
    photos: QUEEN_ROOM_PHOTOS,
    featured: true,
    similarRoomCount: 10,
  },
]

function compareIndividualRoomsPopularFirst(a: IndividualRoom, b: IndividualRoom): number {
  const pop = (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  if (pop !== 0) return pop
  return a.roomNumber - b.roomNumber
}

export const ROOMS_SORTED = [...INDIVIDUAL_ROOMS].sort(compareIndividualRoomsPopularFirst)

export function rtidHasFeaturedRoom(rtid: number): boolean {
  return INDIVIDUAL_ROOMS.some((r) => r.rtid === rtid && r.featured)
}

export function compareAvailRoomTypesPopularFirst(a: { rtid: number }, b: { rtid: number }): number {
  const pa = rtidHasFeaturedRoom(a.rtid) ? 1 : 0
  const pb = rtidHasFeaturedRoom(b.rtid) ? 1 : 0
  if (pb !== pa) return pb - pa
  return a.rtid - b.rtid
}

/** Home carousel: both categories (featured queen first via ROOMS_SORTED). */
const HOME_ROOM_NUMBERS = [2, 1] as const

function homeRoomNumbersPopularFirst(nums: readonly number[]): number[] {
  const featured = nums.filter((n) => INDIVIDUAL_ROOMS.find((r) => r.roomNumber === n)?.featured)
  const rest = nums.filter((n) => !featured.includes(n))
  return [...featured, ...rest]
}

export const ROOMS_HOME = homeRoomNumbersPopularFirst(HOME_ROOM_NUMBERS)
  .map((n) => INDIVIDUAL_ROOMS.find((r) => r.roomNumber === n))
  .filter((r): r is IndividualRoom => r !== undefined)

/* Property imagery (exterior & grounds only  rooms use TWIN_/QUEEN_ arrays). */
export const PROPERTY_GALLERY = {
  facade: PROPERTY_EXTERIOR_PHOTOS.slice(0, 5),
  grounds: PROPERTY_EXTERIOR_PHOTOS.slice(5, 10),
  signage: [lodgeImageUrl("IMG-20201028-WA0035.png")],
}

export function roomBookingUrl(rtid: number) {
  const today = format(new Date(), "yyyy-MM-dd")
  return nightsbridgeBookUrl({ startdate: today, nights: 1, bbrtid: rtid })
}

export function formatRoomRate(rate: number) {
  if (!rate) return null
  return `R${Math.round(rate).toLocaleString("en-ZA")}`
}

export const TYPE_META: Record<number, { label: string; color: string; bedType: string; enSuite: string }> = {
  [LODGE_RTID_TWIN]: {
    label: "Twin room",
    color: "bg-[#5d4037]",
    bedType: "2 × single beds",
    enSuite: "En-suite shower",
  },
  [LODGE_RTID_QUEEN]: {
    label: "Queen room",
    color: "bg-secondary",
    bedType: "Queen-size bed",
    enSuite: "En-suite shower",
  },
}

export const PROPERTY = {
  name: SITE_NAME,
  address: "14D Mphephu Road, Thohoyandou, South Africa",
  lat: -22.965,
  lng: 30.485,
  checkin: "14:00",
  checkout: "10:00",
  selfAssessment: "Guest house",
  cancellationPolicy: "100% forfeit if cancelled within 2 days of arrival. 10% forfeit if cancelled within 3 days of arrival.",
  attractions: [
    "Ben Lavin Nature Reserve",
    "Entabeni Forest",
    "Mapungubwe National Park",
    "Hanglip Forest Reserve",
    "Albasini Dam",
    "Blouberg Nature Reserve",
    "Lake Fundudzi",
    "Langjan Nature Reserve",
    "Thohoyandou town & markets",
  ],
  directions: `Located at 14D Mphephu Road, Thohoyandou, South Africa. Contact us for turn-by-turn directions or the best route from your starting point.`,
}
