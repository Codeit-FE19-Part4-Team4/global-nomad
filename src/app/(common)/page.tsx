import LandingPageClient from './components/LandingPageClient';

import { cn } from '@/util/cn';

export default function LandingPage() {
  return (
    <div className={cn('overflow-hidden', '-mx-6 px-6', 'md:-mx-8 md:px-8')}>
      <div className="m-auto max-w-[1200px]">
        {/* 데이터 패칭 및 로딩/에러 관리는 클라이언트 컴포넌트 */}
        <LandingPageClient />

        {/* 배경 */}
        <div
          className={cn(
            'absolute inset-0 z-[-1] bg-[url("/main/img-main-bg.svg")] bg-repeat-x',
            'bg-[length:1200px_auto] bg-[position:-2%_0]',
            'md:bg-[length:1920px_auto] md:bg-[position:50%_0]'
          )}></div>
      </div>
    </div>
  );
}
