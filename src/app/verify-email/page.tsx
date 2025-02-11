import { Suspense } from 'react';
import VerifyEmail from '@/components/Verify-Email';

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}