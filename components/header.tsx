"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, Facebook, Instagram, Music2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  nightsbridgeBookUrl,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_TIKTOK_URL,
} from "@/lib/site-config"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Conferences", href: "/conferences" },
  { name: "Swimming pool", href: "/swimming-pool" },
  { name: "Restaurant", href: "/restaurant" },
  { name: "Contact", href: "/contact" },
]

const NIGHTSBRIDGE_BOOK = nightsbridgeBookUrl()

const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://www.facebook.com/muofhegraceland/", icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/muofhegraceland/", icon: Instagram },
  { name: "TikTok", href: SITE_TIKTOK_URL, icon: Music2 },
]

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href
}

export function Header() {
  const pathname = usePathname()

  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-14">
        {/* lg+: equal left/right rails so main nav stays visually centered; mobile: logo | actions */}
        <div className="flex items-center justify-between lg:justify-start gap-3 lg:gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center group lg:min-w-0 lg:flex-1 lg:justify-start max-w-[min(100%,15.5rem)] lg:max-w-[19rem] xl:max-w-[21.5rem] 2xl:max-w-[23.5rem]"
            aria-label={`${SITE_NAME}  home`}
          >
            <Image
              src={SITE_LOGO_PATH}
              alt={`${SITE_NAME} logo`}
              width={360}
              height={144}
              className={`h-[4.25rem] sm:h-[5rem] lg:h-[5.75rem] xl:h-[6.25rem] 2xl:h-[6.75rem] w-auto max-w-full object-contain transition-all duration-300 ease-out group-hover:scale-[1.04] ${
                isScrolled
                  ? "logo-pop-scrolled"
                  : "logo-pop-hero [filter:drop-shadow(0_12px_22px_rgba(45,24,16,0.89))]"
              }`}
              priority
            />
          </Link>

          <nav
            className="hidden lg:flex lg:flex-none lg:shrink-0 items-center gap-x-1 xl:gap-x-2 2xl:gap-x-2.5 mx-1 xl:mx-4"
            aria-label="Main navigation"
          >
            {navigation.map((item) => {
              const active = isNavActive(pathname, item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap px-2.5 xl:px-3.5 2xl:px-4 py-2 text-[13px] xl:text-sm font-medium tracking-wide rounded-full transition-all duration-300 ${
                    active
                      ? isScrolled
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-white/25 text-white ring-1 ring-white/50 shadow-sm"
                      : isScrolled
                        ? "text-primary hover:text-secondary hover:bg-secondary/10"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3 md:gap-4 xl:gap-5 lg:min-w-0 lg:flex-1 lg:justify-end">
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                    isScrolled
                      ? "text-primary hover:text-white hover:bg-primary"
                      : "text-white/90 hover:text-primary hover:bg-white"
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
              className={cn(
                "hidden sm:inline-flex shrink-0 whitespace-nowrap",
                isScrolled ? "btn-brand" : "btn-white",
                /* Slightly tighter than global btn so links + socials fit comfortably */
                "!px-5 !py-2.5 xl:!px-7 xl:!py-3 text-sm",
              )}
            >
              Book Now
            </a>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${isScrolled ? "text-primary hover:bg-primary/10" : "text-white hover:bg-white/10"}`}
                >
                  <Menu className="h-6 w-6" aria-hidden="true" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] bg-card border-l border-border p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-border">
                    <Image
                      src={SITE_LOGO_PATH}
                      alt={SITE_NAME}
                      width={240}
                      height={96}
                      className="h-14 w-auto max-w-full object-contain logo-pop-scrolled"
                    />
                  </div>

                  <nav className="flex-1 py-6 px-4" aria-label="Mobile navigation">
                    {navigation.map((item) => {
                      const active = isNavActive(pathname, item.href)
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={`block text-lg font-medium px-4 py-3 rounded-xl transition-colors duration-300 ${
                            active
                              ? "bg-primary text-primary-foreground"
                              : "text-primary hover:text-secondary hover:bg-secondary/10"
                          }`}
                        >
                          {item.name}
                        </Link>
                      )
                    })}
                  </nav>

                  <div className="p-6 border-t border-border space-y-3">
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
                    <div className="flex items-center justify-center gap-3 pt-1.5">
                      {SOCIAL_LINKS.map(({ name, href, icon: Icon }) => (
                        <a
                          key={name}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={name}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-primary transition-colors hover:bg-primary hover:text-white"
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
