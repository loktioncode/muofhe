"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Music2, Mail, Phone, MapPin, ArrowUp } from "lucide-react"

const navigation = {
  main: [
    { name: "Home",    href: "/" },
    { name: "About",   href: "/about" },
    { name: "Rooms",   href: "/rooms" },
    { name: "Gallery", href: "/#gallery" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cancellation Policy", href: "/cancellation" },
  ],
  social: [
    { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/share/1HCL1i4bpC/" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/liquidblueltt?igsh=ZWl1ZXYzN2V4N3Qy" },
    { name: "TikTok", icon: Music2, href: "https://www.tiktok.com/@liquidblueltt" },
  ],
}

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <footer className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, oklch(0.18 0.07 248) 0%, oklch(0.22 0.065 248) 40%, oklch(0.26 0.075 248) 100%)" }}>

      {/* Animated colour bands that echo the logo waves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, oklch(0.77 0.10 200), transparent 70%)" }} />
        <div className="absolute -bottom-48 -right-24 w-[700px] h-[700px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, oklch(0.62 0.11 202), transparent 70%)" }} />
        {/* Thin horizontal shimmer line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, oklch(0.77 0.10 200 / 0.6), transparent)" }} />
      </div>

      {/* Back-to-top pill */}
      <div className="relative z-10 flex justify-center pt-8 -mb-4">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1"
          style={{ background: "linear-gradient(90deg, oklch(0.62 0.11 202), oklch(0.77 0.10 200))", color: "#fff", boxShadow: "0 4px 20px oklch(0.62 0.11 202 / 0.45)" }}
        >
          <ArrowUp className="h-3.5 w-3.5" />
          Back to Top
        </button>
      </div>

      {/* Main grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* ── Brand column ────────────────────────────────────────────── */}
          <div className="md:col-span-4">
            <Image
              src="/images/logo.png"
              alt="Liquid Blue Guest House"
              width={180}
              height={60}
              className="h-14 w-auto"
            />
            <p className="mt-5 text-sm leading-relaxed" style={{ color: "oklch(0.88 0.01 240)" }}>
              Experience luxury and tranquility at Liquid Blue Guest House.
              Where every detail is crafted for your comfort and every stay
              becomes a cherished memory.
            </p>

            {/* Social icons */}
            <div className="mt-7 flex gap-3">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "oklch(0.99 0 0 / 0.08)", border: "1px solid oklch(0.99 0 0 / 0.12)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(135deg, oklch(0.62 0.11 202), oklch(0.77 0.10 200))")}
                  onMouseLeave={e => (e.currentTarget.style.background = "oklch(0.99 0 0 / 0.08)")}
                >
                  <item.icon className="h-4 w-4 text-white/70 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>

          </div>

          {/* ── Navigation ──────────────────────────────────────────────── */}
          <div className="md:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "oklch(0.77 0.10 200)" }}>
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

          {/* ── Contact ─────────────────────────────────────────────────── */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "oklch(0.77 0.10 200)" }}>
              Contact
            </h3>
            <ul className="space-y-4">
              {[
                { icon: MapPin, lines: ["157 Forestry Rd", "Louis Trichardt, 0920", "Limpopo, South Africa"], href: undefined },
                { icon: Phone,  lines: ["+27 68 240 4462"], href: "tel:+27682404462" },
                { icon: Mail,   lines: ["liquidblueltt@gmail.com"], href: "mailto:liquidblueltt@gmail.com" },
              ].map(({ icon: Icon, lines, href }) => (
                <li key={lines[0]} className="flex gap-3 group">
                  <div
                    className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{ background: "oklch(0.77 0.10 200 / 0.12)" }}
                  >
                    <Icon className="h-3.5 w-3.5" style={{ color: "oklch(0.77 0.10 200)" }} />
                  </div>
                  <div>
                    {lines.map((line, i) =>
                      href && i === 0 ? (
                        <a key={i} href={href} className="text-sm block transition-colors duration-200"
                          style={{ color: "oklch(0.78 0.02 240)" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "oklch(0.77 0.10 200)")}
                          onMouseLeave={e => (e.currentTarget.style.color = "oklch(0.78 0.02 240)")}
                        >{line}</a>
                      ) : (
                        <p key={i} className="text-sm" style={{ color: "oklch(0.78 0.02 240)" }}>{line}</p>
                      )
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Hours + Legal ────────────────────────────────────────────── */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest mb-5" style={{ color: "oklch(0.77 0.10 200)" }}>
              Hours
            </h3>
            <div className="space-y-1 mb-8">
              {[
                ["Reception", "24 / 7"],
                ["Check-in",  "14:00"],
                ["Check-out", "10:00"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between text-sm py-2 border-b"
                  style={{ borderColor: "oklch(0.99 0 0 / 0.07)" }}>
                  <span style={{ color: "oklch(0.65 0.02 240)" }}>{label}</span>
                  <span className="font-medium" style={{ color: "oklch(0.88 0.01 240)" }}>{value}</span>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "oklch(0.77 0.10 200)" }}>
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

        {/* ── Bottom bar ─────────────────────────────────────────────────── */}
        <div className="mt-16 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid oklch(0.99 0 0 / 0.08)" }}>
          <p className="text-xs" style={{ color: "oklch(0.55 0.02 240)" }}>
            &copy; {new Date().getFullYear()} Liquid Blue Guest House. All rights reserved.
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
            {/* Colour swatch strip representing the logo palette */}
            {[
              "oklch(0.26 0.075 248)",
              "oklch(0.50 0.12 235)",
              "oklch(0.62 0.11 202)",
              "oklch(0.77 0.10 200)",
            ].map((c) => (
              <span key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
            ))}
            <span className="text-xs ml-2" style={{ color: "oklch(0.45 0.02 240)" }}>
              Liquid Blue
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
