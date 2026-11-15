'use client';

import { useParams } from 'next/navigation';
import { CityServiceTemplate } from '@/components/templates/CityServiceTemplate';

export default function MohaliServicePage() {
  const params = useParams();
  const serviceSlug = (params?.service as string) || 'electrician';
  return <CityServiceTemplate citySlug="mohali" serviceSlug={serviceSlug} />;
}
