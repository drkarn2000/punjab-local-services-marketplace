import { LegalDocTemplate } from '@/components/templates/LegalDocTemplate';

export default function ProviderTermsPage() {
  return (
    <LegalDocTemplate
      title="Service Provider Terms"
      subtitle="Terms of engagement for Individual Technicians and Business Agencies operating on Punjab Services."
      lastUpdated="14 November 2026"
      sections={[
        {
          heading: 'Verification & Eligibility',
          body: [
            'All Individual Professionals and Business Agencies must maintain valid identity documents, local address proof in Mohali, Chandigarh, or Hoshiarpur, and applicable trade certificates.',
          ],
        },
        {
          heading: 'Mandatory Digital Estimate Compliance',
          body: [
            'Providers must inspect the customer issue on arrival and use the Provider Estimate Builder (/provider/estimates) to submit an accurate Labour + Material breakdown. Commencing repair work without customer estimate approval is strictly prohibited.',
          ],
        },
        {
          heading: 'Platform Commission & Payout Settlement',
          body: [
            'Platform commission (configurable per category, typically 12%–15%) is deducted transparently from gross booking earnings. Detailed payout statements are accessible in /provider/earnings and /provider/payouts.',
          ],
        },
      ]}
    />
  );
}
