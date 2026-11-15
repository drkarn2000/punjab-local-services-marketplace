'use client';

import { useParams } from 'next/navigation';
import { CustomerAccountWorkspace } from '@/components/templates/CustomerAccountWorkspace';

export default function AccountBookingDetailPage() {
  const params = useParams();
  const id = (params?.id as string) || 'PB-2026-8901';
  return <CustomerAccountWorkspace section="booking-detail" bookingDetailId={id} />;
}
