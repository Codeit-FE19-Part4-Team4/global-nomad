/**
 * Skeleton 스타일
 * 로딩 상태의 카드 스켈레톤 UI variant를 cva로 관리합니다.
 */

import { cva } from 'class-variance-authority';

// CardThumb.tsx에서 썸네일 스타일 (cva) 재사용
export { cardThumVariants } from '@/components/Card/components/CardThumb';

// Skeleton 막대 스타일
export const skeletonBarVariants = cva('animate-pulse bg-gray-100 rounded', {
  variants: {
    variant: {
      primary: 'h-[14px] md:h-[17px] lg:h-[20px] w-1/2',
      secondary: 'h-[14px] md:h-[17px] lg:h-[20px] w-2/3',
      tertiary: 'h-[14px] md:h-[17px] lg:h-[20px] w-1/2',
    },
  },
});
