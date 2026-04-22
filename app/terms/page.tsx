import type { Metadata } from "next"
import { LegalPage, LegalH2 } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Liquid Blue Guest House — Terms of Service",
  description:
    "Terms and conditions for using the Liquid Blue Guest House website and related services.",
}

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service">
      <p className="text-sm text-[#8a9aaa]">Last updated April 2026</p>

      <p>
        These terms govern your use of the Liquid Blue Guest House website and any information or services offered
        through it. By using the site, you agree to these terms. If you do not agree, please do not use the site.
      </p>

      <LegalH2>Use of the website</LegalH2>
      <p>
        Content on this site (text, images, branding) is provided for information about our guest house. You may not
        copy, scrape, or reuse site content for commercial purposes without our written permission, except as allowed by
        law.
      </p>

      <LegalH2>Accuracy of information</LegalH2>
      <p>
        We aim to keep descriptions, photos, and rates accurate, but details may change. Availability, pricing, and
        policies for a specific stay are confirmed at the time of booking through our official booking channel.
      </p>

      <LegalH2>Bookings</LegalH2>
      <p>
        Reservations made via our booking partner are subject to that provider&apos;s terms and conditions as well as
        our house rules communicated at booking or check-in. Cancellation and payment rules for your stay are those
        shown in your booking confirmation.
      </p>

      <LegalH2>Limitation of liability</LegalH2>
      <p>
        To the fullest extent permitted by applicable law, we are not liable for indirect or consequential loss arising
        from use of this website or reliance on its content. Nothing here excludes liability that cannot be excluded by
        law.
      </p>

      <LegalH2>Links</LegalH2>
      <p>
        Our site may link to third-party websites. We are not responsible for their content or practices; use of linked
        sites is at your own risk.
      </p>

      <LegalH2>Changes</LegalH2>
      <p>
        We may update these terms occasionally. The date above will be revised when we do. Your continued use of the site
        after changes constitutes acceptance of the updated terms.
      </p>
    </LegalPage>
  )
}
