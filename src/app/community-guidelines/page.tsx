import { LegalDocTemplate } from '@/components/templates/LegalDocTemplate';

export default function CommunityGuidelinesPage() {
  return (
    <LegalDocTemplate
      title="Community Guidelines"
      subtitle="Standards of mutual respect, safety, and honest reviews for customers and professionals across Punjab."
      lastUpdated="14 November 2026"
      sections={[
        {
          heading: 'Respectful Doorstep Conduct',
          body: [
            'Both customers and visiting professionals are expected to communicate respectfully in English, Punjabi, or Hindi, honour scheduled time windows, and maintain a safe working environment.',
          ],
        },
        {
          heading: 'Authentic & Constructive Reviews',
          body: [
            'Reviews submitted after service completion should reflect genuine feedback on punctuality, workmanship, and pricing transparency. Abusive or fraudulent reviews are subject to moderation by the Admin Review Management team.',
          ],
        },
        {
          heading: 'Zero Off-Platform Bypass',
          body: [
            'To remain covered by the 15-day workmanship guarantee and transparent invoice protection, all estimates and payments should be recorded through the Punjab Services platform.',
          ],
        },
      ]}
    />
  );
}
