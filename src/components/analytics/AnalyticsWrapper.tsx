import { Suspense } from 'react';
import { Analytics } from './Analytics';

// Wrapper to handle Suspense for useSearchParams in Next.js 14
export function AnalyticsWrapper() {
  return (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  );
}