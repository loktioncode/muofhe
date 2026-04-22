"use client"

import { useEffect } from "react"

/** Legacy `/rooms` URLs redirect to the home page rooms section (no standalone rooms page). */
export default function RoomsRedirectPage() {
  useEffect(() => {
    window.location.replace("/#rooms")
  }, [])

  return (
    <main className="min-h-[40vh] flex items-center justify-center px-4">
      <p className="text-muted-foreground text-sm">Opening accommodation…</p>
    </main>
  )
}
