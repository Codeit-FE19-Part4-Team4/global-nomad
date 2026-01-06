/**
 * CalendarBadge 스타일
 * 내 체험 월별 예약 상태별 색상 variant를 cva로 관리합니다.
 */

import { cva } from 'class-variance-authority';

export const CalendarBadgeStyle = cva(
  [
    // 레이아웃
    'inline-flex items-center w-full justify-center h-4 md:h-[21px]',
    // 박스
    'px-2 py-1 rounded-[4px]',
    // 텍스트
    'font-normal text-[10px] md:text-[14px]',
  ],
  {
    variants: {
      // 예약 상태별 색상
      status: {
        pending: 'bg-primary-100 text-primary-500',
        confirmed: 'bg-orange-100 text-orange-500',
        completed: 'bg-gray-100 text-gray-500',
      },
    },
    defaultVariants: {
      status: 'pending',
    },
  }
);
