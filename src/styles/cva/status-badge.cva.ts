/**
 * StatusBadge 스타일
 * 예약 상태별 색상 variant를 cva로 관리합니다.
 */

import { cva } from 'class-variance-authority';

export const statusBadgeStyle = cva(
  // 기본 스타일
  'inline-flex items-center px-3 py-1 rounded-lg bold body-lg',
  {
    variants: {
      status: {
        // 예약 상태별 색상
        pending: 'bg-green-100 text-green-500',
        confirmed: 'bg-mint-100 text-mint-500',
        completed: 'bg-primary-100 text-primary-500',
        declined: 'bg-red-100 text-red-500',
        canceled: 'bg-gray-100 text-gray-600',
      },
    },
    defaultVariants: {
      status: 'pending',
    },
  }
);
