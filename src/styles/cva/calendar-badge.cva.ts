/**
 * CalendarBadge 스타일
 * 내 체험 월별 예약 상태별 색상 variant를 cva로 관리합니다.
 */

import { cva } from 'class-variance-authority';

export const CalendarBadgeStyle = cva(
  // 기본 스타일
  'inline-flex items-center px-6 py-1 rounded-lg bold body-lg',
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
