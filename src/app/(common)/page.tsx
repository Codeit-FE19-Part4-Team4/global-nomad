import { Suspense } from 'react';

import LandingPageClient from './components/LandingPageClient';

import LoadingSpinner from '@/components/LoadingSpinner';
import { cn } from '@/util/cn';

export default function LandingPage() {
  return (
    <div className={cn('overflow-hidden', '-mx-6 px-6', 'md:-mx-8 md:px-8')}>
      <div className="m-auto max-w-300">
        <Suspense fallback={<LoadingSpinner />}>
          <LandingPageClient />
        </Suspense>

        {/* 배경 */}
        <div
          className={cn(
            'absolute inset-0 z-[-1] bg-[url("/main/img-main-bg.svg")] bg-repeat-x',
            'bg-size-[1200px_auto] bg-position-[-2%_0]',
            'md:bg-size-[1920px_auto] md:bg-position-[50%_0]'
          )}></div>
      </div>
    </div>
  );
}
