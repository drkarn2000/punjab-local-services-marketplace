import { LegalDocTemplate } from '@/components/templates/LegalDocTemplate';

export default function TermsAndConditionsPage() {
  return (
    <LegalDocTemplate
      title="Terms & Conditions"
      subtitle="Customer and Marketplace Terms governing the use of Punjab Services across Mohali, Chandigarh, and Hoshiarpur."
      lastUpdated="14 November 2026"
      sections={[
        {
          heading: 'Platform Scope & Marketplace Role',
          body: [
            'Punjab Services operates as a hyperlocal technology marketplace connecting customers in Mohali, Chandigarh, and Hoshiarpur with verified independent service professionals and registered business agencies across five primary categories: Electrician, Plumber, Carpenter, Computer & Laptop Repair, and Mobile Repair.',
            'This prototype environment demonstrates the complete end-to-end customer, provider, and admin experience using simulated local state.',
          ],
        },
        {
          heading: 'Hybrid Pricing & Estimate Approval Rule',
          body: [
            'Every booking displays a transparent Platform Visiting & Inspection Fee prior to confirmation. The final repair cost is determined only after on-site inspection by the assigned professional.',
            'Professionals are required to submit an itemized digital estimate separating Labour charges, Material/Spare Part costs, Additional work charges, Discounts, and Taxes. Work shall not commence until the customer explicitly approves the estimate on the platform.',
          ],
        },
        {
          heading: 'Customer Responsibilities & Safe Access',
          body: [
            'Customers agree to provide accurate address details, landmark instructions, and safe working access for the visiting technician during the selected instant or scheduled time slot.',
          ],
        },
        {
          heading: '15-Day Service Workmanship Guarantee',
          body: [
            'Services booked, approved via the digital estimate flow, and paid on the platform carry a 15-day workmanship support guarantee for the specific issue repaired.',
          ],
        },
      ]}
    />
  );
}
