/**
 * Property facilities aligned with listing / guest-facing inventory.
 * Single source for About page full list and optional structured data later.
 */

export interface AmenityItem {
  label: string
  /** Extra context, e.g. surcharge */
  note?: string
}

export interface AmenityGroup {
  title: string
  items: AmenityItem[]
}

/** Booking-style “popular” highlights — quick scan */
export const POPULAR_AMENITIES: string[] = [
  "Restaurant",
  "Parking",
  "Private bathroom",
  "Free Wi‑Fi",
  "Air conditioning",
  "Family rooms",
  "Pet friendly",
  "Flat-screen TV",
  "Airport shuttle (free)",
  "Room service",
]

export const PROPERTY_AMENITY_GROUPS: AmenityGroup[] = [
  {
    title: "Bedroom",
    items: [
      { label: "Linens" },
      { label: "Wardrobe or closet" },
    ],
  },
  {
    title: "Bathroom",
    items: [
      { label: "Private bathroom" },
      { label: "Toilet paper" },
      { label: "Towels" },
      { label: "Toilet" },
      { label: "Free toiletries" },
      { label: "Hairdryer" },
      { label: "Shower" },
    ],
  },
  {
    title: "Kitchen & dining in room",
    items: [{ label: "Dining table" }, { label: "Electric kettle" }],
  },
  {
    title: "Living area",
    items: [{ label: "Desk" }],
  },
  {
    title: "Media & technology",
    items: [{ label: "Flat-screen TV" }],
  },
  {
    title: "Food & drink",
    items: [{ label: "Restaurant" }],
  },
  {
    title: "Internet",
    items: [{ label: "Wi‑Fi available in all areas", note: "Free of charge" }],
  },
  {
    title: "Parking",
    items: [
      { label: "Free private parking on site", note: "Reservation not needed" },
      { label: "Valet parking" },
    ],
  },
  {
    title: "Pets",
    items: [{ label: "Pets allowed on request", note: "No extra charges" }],
  },
  {
    title: "Outdoors",
    items: [{ label: "Outdoor furniture" }, { label: "Garden" }],
  },
  {
    title: "Front desk & services",
    items: [
      { label: "Invoice provided" },
      { label: "24-hour front desk" },
      { label: "Wake-up service" },
      { label: "Room service" },
      { label: "Airport shuttle" },
      { label: "Shuttle service", note: "Additional charge" },
    ],
  },
  {
    title: "Cleaning & laundry",
    items: [
      { label: "Daily housekeeping" },
      { label: "Suit press", note: "Additional charge" },
      { label: "Ironing service", note: "Additional charge" },
      { label: "Laundry", note: "Additional charge" },
    ],
  },
  {
    title: "Safety & security",
    items: [
      { label: "Fire extinguishers" },
      { label: "CCTV outside property" },
      { label: "CCTV in common areas" },
      { label: "24-hour security" },
      { label: "Safe" },
    ],
  },
  {
    title: "General",
    items: [
      { label: "Air conditioning" },
      { label: "Smoke-free property" },
      { label: "Non-smoking rooms" },
      { label: "Family rooms" },
    ],
  },
  {
    title: "Pool & recreation",
    items: [
      { label: "Outdoor swimming pool", note: "Free · Open year-round · All ages welcome" },
      { label: "Beach chairs / loungers" },
      { label: "Beach umbrellas" },
    ],
  },
  {
    title: "Languages spoken",
    items: [{ label: "English" }],
  },
]
