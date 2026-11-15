import { LegalDocTemplate } from '@/components/templates/LegalDocTemplate';

export default function PrivacyPolicyPage() {
  return (
    <LegalDocTemplate
      title="Privacy Policy"
      subtitle="How Punjab Services handles customer addresses, problem photos, and provider verification records."
      lastUpdated="14 November 2026"
      sections={[
        {
          heading: 'Information Collected',
          body: [
            'We collect basic profile information (name, phone number, email, preferred language: English, Punjabi, or Hindi), saved service addresses (Home, Office, Other), and optional problem photos uploaded during booking.',
            'For Service Providers, we collect identity documents, local address proof, and trade skill or business registration certificates for verification purposes.',
          ],
        },
        {
          heading: 'Purpose of Data Usage',
          body: [
            'Customer address and problem description details are shared only with the assigned professional to fulfill the requested doorstep service in Mohali, Chandigarh, or Hoshiarpur.',
          ],
        },
        {
          heading: 'Frontend Prototype Storage Notice',
          body: [
            'During this frontend-only prototype phase, all profile changes, bookings, estimates, and uploaded photo previews are stored strictly in local browser memory/localStorage and are not transmitted to any external server.',
          ],
        },
      ]}
    />
  );
}
