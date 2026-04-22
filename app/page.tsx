import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Rooms } from "@/components/rooms"
import { Gallery } from "@/components/gallery"
import { Amenities } from "@/components/amenities"
import { LocationMap } from "@/components/location-map"
import { Footer } from "@/components/footer"
import { LocalBusinessJsonLd } from "@/components/local-business-json-ld"

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <main id="main-content" className="min-h-screen">
        <Header />
        <Hero />
        <Rooms />
        <Gallery />
        <Amenities />
        <LocationMap />
        <Footer />
      </main>
    </>
  )
}
