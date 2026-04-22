"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, Phone, Facebook, Instagram, Music2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const navigation = [
  { name: "Home",    href: "/" },
  { name: "About",   href: "/about" },
  { name: "Rooms",   href: "/rooms" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Contact", href: "/contact" },
]

const NIGHTSBRIDGE_BOOK = "https://book.nightsbridge.com/39595?nbid=377"
const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://www.facebook.com/share/1HCL1i4bpC/", icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/liquidblueltt?igsh=ZWl1ZXYzN2V4N3Qy", icon: Instagram },
  { name: "TikTok", href: "https://www.tiktok.com/@liquidblueltt", icon: Music2 },
]

function isNavActive(pathname: string, hash: string, href: string) {
  if (href === "/#gallery") return pathname === "/" && hash === "#gallery"
  if (href === "/") return pathname === "/" && hash !== "#gallery"
  return pathname === href
}

export function Header() {
  const pathname = usePathname()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [hash, setHash] = useState("")

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setHash(typeof window !== "undefined" ? window.location.hash : "")
    function onHash() {
      setHash(window.location.hash)
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center group" aria-label="Liquid Blue Guest House – home">
            <Image
              src="/images/logo.png"
              alt="Liquid Blue Guest House logo"
              width={220}
              height={74}
              className={`h-14 w-auto transition-all duration-300 group-hover:scale-105 ${
                isScrolled
                  ? ""
                  : "[filter:drop-shadow(0px_1px_3px_rgba(0,0,0,0.6))_drop-shadow(0px_0px_12px_rgba(255,255,255,0.25))]"
              }`}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navigation.map((item) => {
              const active = isNavActive(pathname, hash, item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`px-4 py-2 text-sm font-medium tracking-wide rounded-full transition-all duration-300 ${
                    active
                      ? isScrolled
                        ? "bg-[#1a2e4a] text-white shadow-md"
                        : "bg-white/25 text-white ring-1 ring-white/50 shadow-sm"
                      : isScrolled
                        ? "text-[#1a2e4a] hover:text-[#4aabba] hover:bg-[#4aabba]/10"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Right-side actions */}
          <div className="flex items-center gap-3">
            {/* Phone */}
            <a
              href="tel:+27682404462"
              aria-label="Call us on +27 68 240 4462"
              className={`hidden md:flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                isScrolled ? "text-[#1a2e4a] hover:text-[#4aabba]" : "text-white/90 hover:text-white"
              }`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="hidden xl:inline">+27 68 240 4462</span>
            </a>
            <div className="hidden md:flex items-center gap-2">
              {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                    isScrolled
                      ? "text-[#1a2e4a] hover:text-white hover:bg-[#1a2e4a]"
                      : "text-white/90 hover:text-[#1a2e4a] hover:bg-white"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>

            <a
              href={NIGHTSBRIDGE_BOOK}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex ${isScrolled ? "btn-brand" : "btn-white"}`}
            >
              Book Now
            </a>

            {/* Mobile hamburger */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${isScrolled ? "text-[#1a2e4a] hover:bg-[#1a2e4a]/10" : "text-white hover:bg-white/10"}`}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] bg-white border-l border-[#e5e1da] p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile header */}
                  <div className="p-6 border-b border-[#e5e1da]">
                    <Image
                      src="/images/logo.png"
                      alt="Liquid Blue Guest House"
                      width={200}
                      height={67}
                      className="h-12 w-auto"
                    />
                  </div>

                  {/* Mobile links */}
                  <nav className="flex-1 py-6 px-4" aria-label="Mobile navigation">
                    {navigation.map((item) => {
                      const active = isNavActive(pathname, hash, item.href)
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`block text-lg font-medium px-4 py-3 rounded-xl transition-colors duration-300 ${
                            active
                              ? "bg-[#1a2e4a] text-white"
                              : "text-[#1a2e4a] hover:text-[#4aabba] hover:bg-[#4aabba]/10"
                          }`}
                        >
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>

                  {/* Mobile footer actions */}
                  <div className="p-6 border-t border-[#e5e1da] space-y-3">
                    <a
                      href={NIGHTSBRIDGE_BOOK}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="btn-brand w-full justify-center"
                    >
                      Book Now
                    </a>
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="btn-outline w-full justify-center"
                    >
                      Contact Us
                    </Link>
                    <a
                      href="tel:+27682404462"
                      className="flex items-center justify-center gap-2 text-sm font-medium text-[#5c6a7a] pt-1"
                    >
                      <Phone className="h-4 w-4 text-[#4aabba]" aria-hidden="true" />
                      +27 68 240 4462
                    </a>
                    <div className="flex items-center justify-center gap-3 pt-1.5">
                      {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                        <a
                          key={name}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={name}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#e8e4df] text-[#1a2e4a] transition-colors hover:bg-[#1a2e4a] hover:text-white"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
