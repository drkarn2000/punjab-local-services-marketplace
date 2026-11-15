'use client';

import { useParams } from 'next/navigation';
import { CityServiceTemplate } from '@/components/templates/CityServiceTemplate';

export default function ChandigarhServicePage() {
  const params = useParams();
  const serviceSlug = (params?.service as string) || 'electrician';
  return <CityServiceTemplate citySlug="chandigarh" serviceSlug={serviceSlug} />;
}
