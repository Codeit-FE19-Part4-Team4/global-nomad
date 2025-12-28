/**
 * StatusBadge 스타일
 * 예약 상태별 색상 variant를 cva로 관리합니다.
 */

import { cva } from 'class-variance-authority';

export const statusBadgeStyle = cva(
  [
    // 레이아웃
    'inline-flex items-center w-fit',
    // 박스
    'px-2 py-1 rounded-lg',
    // 텍스트
    'bold text-[13px]',
  ],
  {
    variants: {
      // 예약 상태별 색상
      status: {
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
