"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Mail, Phone, MapPin, ArrowUp, Music2 } from "lucide-react"
import {
  SITE_ADDRESS_LINES,
  SITE_EMAIL,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_PHONE_DISPLAY,
  SITE_PHONE_TEL,
  SITE_TIKTOK_URL,
} from "@/lib/site-config"

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Conferences", href: "/conferences" },
    { name: "Swimming pool", href: "/swimming-pool" },
    { name: "Restaurant", href: "/restaurant" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cancellation Policy", href: "/cancellation" },
  ],
  social: [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/muofhegraceland/" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/muofhegraceland/" },
    { name: "TikTok", icon: Music2, href: SITE_TIKTOK_URL },
  ],
}

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(165deg, oklch(0.22 0.045 55) 0%, oklch(0.26 0.05 52) 45%, oklch(0.3 0.055 48) 100%)",
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.12]"
          style={{
            background: "radial-gradient(circle, oklch(0.72 0.14 75), transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-48 -right-24 w-[700px] h-[700px] rounded-full opacity-[0.1]"
          style={{
            background: "radial-gradient(circle, oklch(0.62 0.18 45), transparent 70%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, oklch(0.72 0.14 75 / 0.55), transparent)",
          }}
        />
      </div>

      <div className="relative z-10 flex justify-center pt-8 -mb-4">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "linear-gradient(90deg, oklch(0.58 0.17 42), oklch(0.72 0.14 75))",
            color: "#fff",
            boxShadow: "0 4px 20px oklch(0.58 0.17 42 / 0.45)",
          }}
        >
          <ArrowUp className="h-3.5 w-3.5" />
          Back to Top
        </button>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <div className="inline-flex rounded-2xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 ring-1 ring-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              <Image
                src={SITE_LOGO_PATH}
                alt={SITE_NAME}
                width={360}
                height={144}
                className="h-[5.75rem] sm:h-[6.5rem] md:h-[7rem] w-auto max-w-[min(100%,22rem)] object-contain logo-pop-footer"
              />
            </div>
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "oklch(0.9 0.02 75)" }}>
              Warm hospitality and peaceful stays at {SITE_NAME}. Where comfort meets African charm  your base in
              Thohoyandou.
            </p>

            <div className="mt-7 flex gap-3">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "oklch(0.99 0 0 / 0.08)",
                    border: "1px solid oklch(0.99 0 0 / 0.12)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "linear-gradient(135deg, oklch(0.58 0.17 42), oklch(0.72 0.14 75))")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = "oklch(0.99 0 0 / 0.08)")}
                >
                  <item.icon className="h-4 w-4 text-white/70 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "oklch(0.72 0.14 75)" }}>
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-white transition-all duration-200 hover:translate-x-1 inline-flex"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "oklch(0.72 0.14 75)" }}>
              Contact
            </h3>
            <ul className="space-y-4">
              {[
                {
                  icon: MapPin,
                  lines: SITE_ADDRESS_LINES,
                  href: undefined,
                },
                { icon: Phone, lines: [SITE_PHONE_DISPLAY], href: `tel:${SITE_PHONE_TEL}` },
                { icon: Mail, lines: [SITE_EMAIL], href: `mailto:${SITE_EMAIL}` },
              ].map(({ icon: Icon, lines, href }) => (
                <li key={lines[0]} className="flex gap-3 group">
                  <div
                    className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: "oklch(0.72 0.14 75 / 0.12)" }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: "oklch(0.72 0.14 75)" }} />
                  </div>
                  <div>
                    {lines.map((line, i) =>
                      href && i === 0 ? (
                        <a
                          key={i}
                          href={href}
                          className="text-sm block transition-colors duration-200"
                          style={{ color: "oklch(0.82 0.02 75)" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.72 0.14 75)")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.82 0.02 75)")}
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={i} className="text-sm" style={{ color: "oklch(0.82 0.02 75)" }}>
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "oklch(0.72 0.14 75)" }}>
              Hours
            </h3>
            <div className="space-y-1 mb-8">
              {[
                ["Reception", "24 / 7"],
                ["Check-in", "14:00"],
                ["Check-out", "10:00"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between text-sm py-2 border-b"
                  style={{ borderColor: "oklch(0.99 0 0 / 0.07)" }}
                >
                  <span style={{ color: "oklch(0.65 0.02 75)" }}>{label}</span>
                  <span className="font-medium" style={{ color: "oklch(0.88 0.02 75)" }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "oklch(0.72 0.14 75)" }}>
              Legal
            </h3>
            <ul className="space-y-2.5">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs text-white/45 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid oklch(0.99 0 0 / 0.08)" }}
        >
          <p className="text-xs" style={{ color: "oklch(0.55 0.02 75)" }}>
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-white/70">
            Created by{" "}
            <a
              href="https://loktioncode.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-white/80 transition-colors duration-200 underline underline-offset-2"
            >
              Loktioncode
            </a>
          </p>
          <div className="flex items-center gap-1.5">
            {["oklch(0.28 0.05 50)", "oklch(0.48 0.14 42)", "oklch(0.58 0.17 42)", "oklch(0.72 0.14 75)"].map((c) => (
              <span key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
            <span className="text-xs ml-2" style={{ color: "oklch(0.45 0.02 75)" }}>
              Muofhe
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
