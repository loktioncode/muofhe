import type { Metadata } from "next"
import { LegalPage, LegalH2 } from "@/components/legal-page"
import { PROPERTY } from "@/lib/rooms-data"
import { SITE_NAME } from "@/lib/site-config"

export const metadata: Metadata = {
  title: `${SITE_NAME}  Cancellation Policy`,
  description:
    `Cancellation and forfeiture rules for bookings at ${SITE_NAME}, Thohoyandou.`,
}

export default function CancellationPolicyPage() {
  return (
    <LegalPage title="Cancellation Policy">
      <p className="text-sm text-[#8a9aaa]">Last updated April 2026</p>

      <p>
        The following reflects our standard cancellation framework as communicated through our booking systems.
        The rules that apply to your reservation are those confirmed at the time you book; always refer to your
        booking confirmation and the reservation platform for the definitive terms of your stay.
      </p>

      <LegalH2>Summary of forfeiture rules</LegalH2>
      <p className="rounded-xl bg-[#f7f5f2] border border-[#e8e4df] px-5 py-4 text-[#1a2e4a] font-medium">
        {PROPERTY.cancellationPolicy}
      </p>

      <LegalH2>General</LegalH2>
      <ul className="list-disc pl-5 space-y-2">
        <li>Cancellation fees or forfeits, if any, are calculated from the scheduled arrival date unless stated otherwise in your confirmation.</li>
        <li>No-shows may be treated as cancellations and charged according to the applicable policy.</li>
        <li>For changes to dates or room type, please contact us or use your booking confirmation instructions; fees may apply.</li>
      </ul>

      <LegalH2>Special circumstances</LegalH2>
      <p>
        Where law or consumer protection rules require different treatment, those requirements apply. For disputes or
        clarifications, contact us with your booking reference.
      </p>
    </LegalPage>
  )
}
