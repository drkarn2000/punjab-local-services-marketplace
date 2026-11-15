import React from 'react';
import { ProviderPortalWorkspace } from '@/components/templates/ProviderPortalWorkspace';

export default function ProviderJobDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProviderPortalWorkspace section="job-detail" jobId={params.id} />;
}
