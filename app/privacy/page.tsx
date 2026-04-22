import type { Metadata } from "next"
import { LegalPage, LegalH2 } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Liquid Blue Guest House — Privacy Policy",
  description:
    "How Liquid Blue Guest House collects, uses, and protects your personal information when you use our website or booking services.",
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p className="text-sm text-[#8a9aaa]">Last updated April 2026</p>

      <p>
        Liquid Blue Guest House (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy.
        This policy describes how we handle information when you visit our website, contact us, or book a stay.
      </p>

      <LegalH2>Information we may collect</LegalH2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Name, email address, phone number, and message content when you use our contact form or reach us directly.</li>
        <li>Booking-related details when you complete a reservation through our booking partner (e.g. stay dates, room preferences), as processed on their platform.</li>
        <li>Technical data such as browser type, device type, and approximate location derived from standard web server or analytics tools, where used.</li>
      </ul>

      <LegalH2>How we use information</LegalH2>
      <ul className="list-disc pl-5 space-y-2">
        <li>To respond to enquiries and provide guest services.</li>
        <li>To operate and improve our website and guest experience.</li>
        <li>To comply with legal obligations where applicable.</li>
      </ul>

      <LegalH2>Third-party services</LegalH2>
      <p>
        Online bookings may be processed by a third-party reservation provider. Their use of your data is governed by
        their own privacy terms. We encourage you to read their policy when you book.
      </p>

      <LegalH2>Cookies and similar technologies</LegalH2>
      <p>
        Our site may use cookies or similar technologies for essential functionality, preferences, or analytics.
        You can control cookies through your browser settings.
      </p>

      <LegalH2>Data retention and security</LegalH2>
      <p>
        We retain information only as long as needed for the purposes above or as required by law. We take reasonable
        steps to protect personal information; no method of transmission over the internet is completely secure.
      </p>

      <LegalH2>Your rights</LegalH2>
      <p>
        Depending on applicable law (including South Africa&apos;s POPIA where relevant), you may have the right to
        access, correct, or delete certain personal data, or to object to some processing. Contact us and we will assist
        where we can.
      </p>

      <LegalH2>Changes</LegalH2>
      <p>
        We may update this policy from time to time. The &quot;Last updated&quot; date at the top will change when we do.
        Continued use of the site after changes constitutes acceptance of the updated policy.
      </p>
    </LegalPage>
  )
}
