import { NextResponse } from "next/server"

const BBID = 39595

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { startdate, enddate } = body

    if (!startdate || !enddate) {
      return NextResponse.json(
        { success: false, error: { code: 400, message: "startdate and enddate are required" } },
        { status: 400 }
      )
    }

    const payload = {
      bbid: BBID,
      nbid: 0,
      extbbid: "",
      clientloginkey: null,
      startdate,
      enddate,
      bbrtid: 0,
      rtgroupid: 0,
      nightsbridge: true,
      showroomcount: true,
      showrates: true,
      showextras: false,
    }

    const res = await fetch("https://www.nightsbridge.com/bridge/api/5.0/availgrid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      next: { revalidate: 0 }, // always fresh for real availability
    })

    if (!res.ok) {
      throw new Error(`Nightsbridge availgrid returned ${res.status}`)
    }

    const data = await res.json()
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    })
  } catch (error) {
    console.error("Nightsbridge availgrid fetch failed:", error)
    return NextResponse.json(
      { success: false, error: { code: 500, message: "Failed to fetch availability" } },
      { status: 500 }
    )
  }
}
