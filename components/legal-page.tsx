import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LocationMap } from "@/components/location-map"

export function LegalPage({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <main id="main-content" className="min-h-screen bg-[#faf9f7]">
      <Header />

      <section className="border-b border-[#e8e4df] bg-white pt-28 pb-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1a6b75] mb-2">
            Legal
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-primary">
            {title}
          </h1>
          <p className="mt-2 text-sm text-[#8a9aaa]">
            Muofhe Graceland Lodge · Thohoyandou, Limpopo, South Africa
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 text-[#3d4f61] leading-relaxed space-y-5 text-[15px]">
        {children}
        <p className="pt-8 text-sm text-[#8a9aaa] border-t border-[#e8e4df]">
          Questions?{" "}
          <Link href="/contact" className="text-secondary font-semibold hover:underline">
            Contact us
          </Link>
          .
        </p>
      </article>

      <LocationMap />
      <Footer />
    </main>
  )
}

export function LegalH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-xl font-medium text-primary pt-6 first:pt-0">
      {children}
    </h2>
  )
}
