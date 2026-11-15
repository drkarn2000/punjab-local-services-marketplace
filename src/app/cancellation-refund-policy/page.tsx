import { LegalDocTemplate } from '@/components/templates/LegalDocTemplate';

export default function CancellationRefundPolicyPage() {
  return (
    <LegalDocTemplate
      title="Cancellation & Refund Policy"
      subtitle="Transparent rules for booking cancellations, visiting fee adjustments, and refund requests."
      lastUpdated="14 November 2026"
      sections={[
        {
          heading: 'Free Cancellation Window',
          body: [
            'Scheduled bookings may be cancelled free of charge up to 2 hours prior to the selected time slot. Instant bookings may be cancelled before the professional marks "Provider En Route".',
          ],
        },
        {
          heading: 'Visiting & Inspection Fee Policy',
          body: [
            'If a professional arrives at the customer location, performs a fault inspection, and shares an estimate that the customer chooses to decline, only the standard Visiting & Inspection Fee (₹199–₹249) is applicable.',
            'If the customer approves the estimate, the visiting fee is adjusted into the final work invoice.',
          ],
        },
        {
          heading: 'Refund Request Workflow',
          body: [
            'Customers can submit refund requests directly from /account/refunds by selecting an eligible booking and stating the refund reason. Each request generates a tracking reference ID reviewed by the Finance Manager.',
          ],
        },
      ]}
    />
  );
}
