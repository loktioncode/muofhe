import { format } from "date-fns"

/**
 * Liquid Blue Guest House – 9 rooms across 5 Nightsbridge room types.
 * All photo URLs served from the official Nightsbridge CDN.
 *
 * Room counts (from API establishment/39595):
 *   rtid 1 – King Room      × 1  (Premium,   16m², king bed, bath + shower)
 *   rtid 2 – Twin Room      × 1  (Deluxe,    16m², 2 single beds, shower)
 *   rtid 3 – Queen Room     × 4  (Luxury,    18m², queen bed, shower)
 *   rtid 4 – Executive Room × 1  (Executive, 20m², queen bed, bath + shower, patio)
 *   rtid 5 – Deluxe Room    × 2  (Deluxe,    18m², queen bed, shower, patio)
 *   Total = 9 rooms
 */

const CDN = "https://d1zyr4xmqw3mni.cloudfront.net/image/1600/gallery/39595"

export interface IndividualRoom {
  roomNumber: number
  displayName: string
  rtid: 1 | 2 | 3 | 4 | 5
  typeName: string
  bedType: string
  enSuite: string
  patio?: boolean
  size: string
  description: string
  amenities: string[]
  photos: string[]
  featured?: boolean
}

/* ─── Official Nightsbridge descriptions ───────────────────────────────── */
const KING_DESC   = "Unwind in this room with a king-size bed and an en-suite with a bath and shower. It's perfectly kitted out for work or play with a desk, sitting area, TV, and Wi-Fi. We've also included tea and coffee-making facilities for a proper start to your morning."
const TWIN_DESC   = "This room has 2 single beds and an en-suite with a shower. It's well-kitted with a desk, TV, and cosy sitting area, plus high-speed Wi-Fi to keep you connected. We've also included tea and coffee-making facilities for a proper brew whenever you need one."
const QUEEN_DESC  = "Treat yourself to a luxury stay with a queen-size bed and a sleek en-suite shower. This room is kitted out with a cosy sitting area, desk, TV, and high-speed Wi-Fi. We've also included tea and coffee-making facilities."
const EXEC_DESC   = "Enjoy an executive stay featuring a queen-size bed, a full en-suite with a bath and shower, and a private patio. It's well-kitted with a sitting area, desk, TV, and Wi-Fi, plus tea and coffee-making facilities for a proper brew to enjoy outdoors."
const DELUXE_DESC = "Indulge in a deluxe stay with a queen-size bed, a private patio, and a sleek en-suite shower. This room is kitted out with a cosy sitting area, desk, TV, and high-speed Wi-Fi. We've also included tea and coffee-making facilities."

/* ─── Amenity sets ──────────────────────────────────────────────────────── */
const BASE = ["Air Conditioning", "DSTV / Satellite TV", "Free WiFi", "Tea & Coffee", "Work Desk", "Daily Housekeeping", "Non-smoking", "Sitting Area"]
const KING_AM   = [...BASE, "En-suite Bath & Shower", "Hairdryer", "Garden View", "Pool View"]
const TWIN_AM   = [...BASE, "En-suite Shower"]
const QUEEN_AM  = [...BASE, "En-suite Shower"]
const EXEC_AM   = [...BASE, "En-suite Bath & Shower", "Private Patio", "Outdoor Furniture"]
const DELUXE_AM = [...BASE, "En-suite Shower", "Private Patio", "Outdoor Furniture"]

/* ─── CDN photo arrays per room type ───────────────────────────────────── */
const KING_PHOTOS = [
  `${CDN}/1199061.jpg`, // Bed
  `${CDN}/1199064.jpg`, // Bed
  `${CDN}/1199068.jpg`, // Whole room
  `${CDN}/1199069.jpg`, // Whole room
  `${CDN}/1199060.jpg`, // Seating area
  `${CDN}/1199072.jpg`, // Whole room
  `${CDN}/1199075.jpg`, // Bathroom
  `${CDN}/1199087.jpg`, // Shower
]

const TWIN_PHOTOS = [
  `${CDN}/1198862.jpg`, // Bed
  `${CDN}/1198860.jpg`, // Bed
  `${CDN}/1198864.jpg`, // Whole room
  `${CDN}/1198866.jpg`, // Whole room
  `${CDN}/1198871.jpg`, // Seating area
  `${CDN}/1198878.jpg`, // Whole room
  `${CDN}/1198884.jpg`, // Shower
  `${CDN}/1198883.jpg`, // Bathroom
]

const QUEEN_PHOTOS = [
  `${CDN}/1199091.jpg`, // Decorative
  `${CDN}/1199090.jpg`, // Bed
  `${CDN}/1199095.jpg`, // Whole room
  `${CDN}/1199094.jpg`, // Seating area
  `${CDN}/1199099.jpg`, // Bed
  `${CDN}/1199100.jpg`, // Whole room
  `${CDN}/1199107.jpg`, // Bathroom
  `${CDN}/1199117.jpg`, // Shower
]

const EXEC_PHOTOS = [
  `${CDN}/1199033.jpg`, // Bed
  `${CDN}/1199036.jpg`, // Whole room
  `${CDN}/1199043.jpg`, // Seating area
  `${CDN}/1199045.jpg`, // Whole room
  `${CDN}/1199044.jpg`, // Whole room
  `${CDN}/1199054.jpg`, // Bathroom
  `${CDN}/1199086.jpg`, // Seating area
  `${CDN}/1199088.jpg`, // Shower
]

const DELUXE_PHOTOS = [
  `${CDN}/1198814.jpg`, // Whole room
  `${CDN}/1198811.jpg`, // Bed
  `${CDN}/1198816.jpg`, // Bed
  `${CDN}/1198818.jpg`, // Whole room
  `${CDN}/1198821.jpg`, // Seating area
  `${CDN}/1198823.jpg`, // Patio
  `${CDN}/1198824.jpg`, // Bathroom
  `${CDN}/1198833.jpg`, // Shower
]

/* ─── 9 individual rooms ─────────────────────────────────────────────────  */
export const INDIVIDUAL_ROOMS: IndividualRoom[] = [
  /* King Room × 1 */
  {
    roomNumber: 8,
    displayName: "Room 8",
    rtid: 1,
    typeName: "King Room",
    bedType: "King Bed",
    enSuite: "Bath & Shower",
    size: "16m²",
    description: KING_DESC,
    amenities: KING_AM,
    featured: true,
    photos: KING_PHOTOS,
  },

  /* Twin Room × 1 */
  {
    roomNumber: 2,
    displayName: "Room 2",
    rtid: 2,
    typeName: "Twin Room",
    bedType: "2 Single Beds",
    enSuite: "Shower",
    size: "16m²",
    description: TWIN_DESC,
    amenities: TWIN_AM,
    photos: TWIN_PHOTOS,
  },

  /* Queen Rooms × 4 */
  {
    roomNumber: 3,
    displayName: "Room 3",
    rtid: 3,
    typeName: "Queen Room",
    bedType: "Queen Bed",
    enSuite: "Shower",
    size: "18m²",
    description: QUEEN_DESC,
    amenities: QUEEN_AM,
    photos: QUEEN_PHOTOS,
  },
  {
    roomNumber: 4,
    displayName: "Room 4",
    rtid: 3,
    typeName: "Queen Room",
    bedType: "Queen Bed",
    enSuite: "Shower",
    size: "18m²",
    description: QUEEN_DESC,
    amenities: QUEEN_AM,
    photos: [...QUEEN_PHOTOS].reverse(),
  },
  {
    roomNumber: 5,
    displayName: "Room 5",
    rtid: 3,
    typeName: "Queen Room",
    bedType: "Queen Bed",
    enSuite: "Shower",
    size: "18m²",
    description: QUEEN_DESC,
    amenities: QUEEN_AM,
    photos: QUEEN_PHOTOS,
  },
  {
    roomNumber: 7,
    displayName: "Room 7",
    rtid: 3,
    typeName: "Queen Room",
    bedType: "Queen Bed",
    enSuite: "Shower",
    size: "18m²",
    description: QUEEN_DESC,
    amenities: QUEEN_AM,
    photos: [...QUEEN_PHOTOS].reverse(),
  },

  /* Executive Room × 1 */
  {
    roomNumber: 9,
    displayName: "Room 9",
    rtid: 4,
    typeName: "Executive Room",
    bedType: "Queen Bed",
    enSuite: "Bath & Shower",
    patio: true,
    size: "20m²",
    description: EXEC_DESC,
    amenities: EXEC_AM,
    photos: EXEC_PHOTOS,
  },

  /* Deluxe Rooms × 2 */
  {
    roomNumber: 6,
    displayName: "Room 6",
    rtid: 5,
    typeName: "Deluxe Room",
    bedType: "Queen Bed",
    enSuite: "Shower",
    patio: true,
    size: "18m²",
    description: DELUXE_DESC,
    amenities: DELUXE_AM,
    photos: DELUXE_PHOTOS,
  },
  {
    roomNumber: 1,
    displayName: "Room 1",
    rtid: 5,
    typeName: "Deluxe Room",
    bedType: "Queen Bed",
    enSuite: "Shower",
    patio: true,
    size: "18m²",
    description: DELUXE_DESC,
    amenities: DELUXE_AM,
    photos: [...DELUXE_PHOTOS].reverse(),
  },
]

/** Individual rooms marked `featured` (“Popular”) sort first, then by room number. */
function compareIndividualRoomsPopularFirst(a: IndividualRoom, b: IndividualRoom): number {
  const pop = (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
  if (pop !== 0) return pop
  return a.roomNumber - b.roomNumber
}

export const ROOMS_SORTED = [...INDIVIDUAL_ROOMS].sort(compareIndividualRoomsPopularFirst)

/**
 * True when any individual room of this Nightsbridge type is featured (“Popular”).
 * Used to sort availability results so popular room types appear first.
 */
export function rtidHasFeaturedRoom(rtid: number): boolean {
  return INDIVIDUAL_ROOMS.some((r) => r.rtid === rtid && r.featured)
}

/** Sort API room-type rows: featured types first, then stable by rtid. */
export function compareAvailRoomTypesPopularFirst(a: { rtid: number }, b: { rtid: number }): number {
  const pa = rtidHasFeaturedRoom(a.rtid) ? 1 : 0
  const pb = rtidHasFeaturedRoom(b.rtid) ? 1 : 0
  if (pb !== pa) return pb - pa
  return a.rtid - b.rtid
}

/**
 * Rooms shown in the home-page carousel  one representative per type,
 * with Queen having two rooms (3 & 4), as specified by the owner.
 * Featured (“Popular”) picks are moved to the front of the carousel when present.
 */
const HOME_ROOM_NUMBERS = [8, 2, 3, 4, 9, 6] as const

function homeRoomNumbersPopularFirst(nums: readonly number[]): number[] {
  const featured = nums.filter((n) => INDIVIDUAL_ROOMS.find((r) => r.roomNumber === n)?.featured)
  const rest = nums.filter((n) => !featured.includes(n))
  return [...featured, ...rest]
}

export const ROOMS_HOME = homeRoomNumbersPopularFirst(HOME_ROOM_NUMBERS)
  .map((n) => INDIVIDUAL_ROOMS.find((r) => r.roomNumber === n))
  .filter((r): r is IndividualRoom => r !== undefined)

/* ─── Property gallery images from CDN ─────────────────────────────────── */
export const PROPERTY_GALLERY = {
  facade:    [`${CDN}/1198903.jpg`, `${CDN}/1199089.jpg`, `${CDN}/1199024.jpg`, `${CDN}/1199025.jpg`, `${CDN}/1199026.jpg`],
  pool:      [`${CDN}/1198905.jpg`, `${CDN}/1198906.jpg`, `${CDN}/1198908.jpg`],
  braai:     [`${CDN}/1198907.jpg`],
  lounge:    [`${CDN}/1199020.jpg`, `${CDN}/1199018.jpg`, `${CDN}/1198917.jpg`, `${CDN}/1198918.jpg`, `${CDN}/1198919.jpg`],
  breakfast: [`${CDN}/1199034.jpg`, `${CDN}/1199031.jpg`, `${CDN}/1199037.jpg`],
  dining:    [`${CDN}/1199039.jpg`, `${CDN}/1199040.jpg`],
  decor:     [`${CDN}/1199023.jpg`, `${CDN}/1198912.jpg`, `${CDN}/1198911.jpg`],
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */
export function roomBookingUrl(rtid: number) {
  const today = format(new Date(), "yyyy-MM-dd")
  return `https://book.nightsbridge.com/39595?nbid=377&startdate=${today}&nights=1&bbrtid=${rtid}`
}

/**
 * Format a ZAR rate returned by the Nightsbridge availability API.
 * The API returns rates as the total for the requested stay period.
 * We always request 1 night so rates are already per-night values.
 * Values like 1187.5 are rounded to the nearest rand (→ R1 188).
 */
export function formatRoomRate(rate: number) {
  if (!rate) return null
  return `R${Math.round(rate).toLocaleString("en-ZA")}`
}

export const TYPE_META: Record<number, { label: string; color: string; bedType: string; enSuite: string }> = {
  1: { label: "King Room",      color: "bg-[#1a2e4a]", bedType: "King Bed",      enSuite: "Bath & Shower" },
  2: { label: "Twin Room",      color: "bg-[#2d5080]", bedType: "2 Single Beds", enSuite: "Shower" },
  3: { label: "Queen Room",     color: "bg-[#3a7ab5]", bedType: "Queen Bed",     enSuite: "Shower" },
  4: { label: "Executive Room", color: "bg-[#1a6b75]", bedType: "Queen Bed",     enSuite: "Bath & Shower + Patio" },
  5: { label: "Deluxe Room",    color: "bg-[#4aabba]", bedType: "Queen Bed",     enSuite: "Shower + Patio" },
}

/* Property facts */
export const PROPERTY = {
  name: "Liquid Blue",
  address: "157 Forestry Rd, Louis Trichardt, 0920",
  lat: -23.028913,
  lng: 29.91147,
  checkin: "14:00",
  checkout: "10:00",
  selfAssessment: "4 Star",
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
    "Louis Trichardt Golf Club",
  ],
  directions: `From Polokwane International Airport, follow the N1 north for approximately 94 km. At the Louis Trichardt roundabout, take the exit onto Stubbs Street, then turn right onto Forestry Road. Liquid Blue will be on your right after 210 m.`,
}
