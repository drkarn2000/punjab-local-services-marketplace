'use client';

import { useParams } from 'next/navigation';
import { CityServiceTemplate } from '@/components/templates/CityServiceTemplate';

export default function HoshiarpurServicePage() {
  const params = useParams();
  const serviceSlug = (params?.service as string) || 'computer-repair';
  return <CityServiceTemplate citySlug="hoshiarpur" serviceSlug={serviceSlug} />;
}
