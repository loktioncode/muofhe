import { NextResponse } from "next/server"
import { format, addDays } from "date-fns"

const BBID = 39595

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const startdate = searchParams.get("startdate") || format(new Date(), "yyyy-MM-dd")
  const enddate   = searchParams.get("enddate")   || format(addDays(new Date(), 1), "yyyy-MM-dd")

  try {
    const res = await fetch(
      `https://www.nightsbridge.com/bridge/api/5.0/availability/${BBID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ startdate, enddate }),
        cache: "no-store", // always fetch live rates
      }
    )

    if (!res.ok) {
      throw new Error(`Nightsbridge availability returned ${res.status}`)
    }

    const data = await res.json()
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    })
  } catch (error) {
    console.error("Nightsbridge availability fetch failed:", error)
    return NextResponse.json(
      { success: false, error: { code: 500, message: "Failed to fetch availability" } },
      { status: 500 }
    )
  }
}
