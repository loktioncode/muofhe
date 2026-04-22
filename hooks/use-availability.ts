"use client"

import { useState, useEffect } from "react"
import { format, addDays } from "date-fns"

const BBID = 39595
const NBID = 377

export interface MealPlan {
  rateid: number
  mealplanid: number
  description: string
  defaultmealplan: boolean
  /** Total cost in ZAR for the requested stay period (we always request 1 night,
   *  so this equals the per-night rate). */
  rates: number[]
}

export interface RoomType {
  rtid: number
  roomtypename: string
  description: string
  maxoccupancy: number
  maxadults: number
  roomsfree: number
  mealplans: MealPlan[]
}

function getMealPlanRate(mealPlan: MealPlan): number {
  if (!Array.isArray(mealPlan.rates) || mealPlan.rates.length === 0) return 0

  const positiveRates = mealPlan.rates.filter((rate) => typeof rate === "number" && rate > 0)
  if (positiveRates.length === 0) return 0

  // Nightsbridge unit-pricing properties use the same room-type price across occupancies.
  // Prefer first positive value to avoid hard-coding a specific index.
  return positiveRates[0] ?? 0
}

export function getRoomTypeRate(roomType: RoomType): number {
  const defaultMealPlan = roomType.mealplans.find((mealPlan) => mealPlan.defaultmealplan)
  const defaultRate = defaultMealPlan ? getMealPlanRate(defaultMealPlan) : 0
  if (defaultRate > 0) return defaultRate

  for (const mealPlan of roomType.mealplans) {
    const rate = getMealPlanRate(mealPlan)
    if (rate > 0) return rate
  }

  return 0
}

/* ─── Booking URL helper ────────────────────────────────────────────────── */
function buildBookingUrl(params: { startdate?: string; nights?: number; rtid?: number }) {
  const base  = `https://book.nightsbridge.com/${BBID}`
  const query = new URLSearchParams({ nbid: String(NBID) })
  if (params.startdate) query.set("startdate", params.startdate)
  if (params.nights)    query.set("nights",    String(params.nights))
  if (params.rtid)      query.set("bbrtid",    String(params.rtid))
  return `${base}?${query.toString()}`
}

/* ─── Hook ──────────────────────────────────────────────────────────────── */
/**
 * Fetches live per-night rates from the Nightsbridge availability endpoint
 * on every visit  no caching so rates are always accurate.
 *
 * Date window: today → tomorrow (1 night).
 * IMPORTANT: Nightsbridge returns `rates[]` as the TOTAL cost for the requested
 * stay period. A 1-night window means rates[] == the actual nightly price.
 */
export function useAvailability() {
  const today    = format(new Date(), "yyyy-MM-dd")
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd")

  const [roomTypes, setRoomTypes] = useState<RoomType[] | null>(null)
  const [loading,   setLoading]   = useState(true)
  const [error,     setError]     = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchRates() {
      setLoading(true)
      setError(null)

      try {
        const qs  = new URLSearchParams({ startdate: today, enddate: tomorrow })
        const res = await fetch(`/api/availability?${qs}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()

        if (json.success && Array.isArray(json.data?.roomtypes)) {
          if (!cancelled) setRoomTypes(json.data.roomtypes)
        } else {
          throw new Error(json?.error?.message ?? "Unexpected API shape")
        }
      } catch (err) {
        if (!cancelled) setError(String(err))
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchRates()
    return () => { cancelled = true }
  // Dates are derived from "now"; they won't change during a session
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { roomTypes, loading, error, buildBookingUrl }
}
