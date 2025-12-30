/**
 * Filter 버튼 스타일
 * 메인 체험 화면에서 사용하는 필터 버튼 단위의 스타일을 cva로 관리합니다.
 */

import { cva } from 'class-variance-authority';

export const filterStyle = cva(
  [
    'inline-flex items-center gap-2',
    'rounded-full',
    'border cursor-pointer',
    'regular',
    'shrink-0',
  ],
  {
    variants: {
      selected: {
        true: 'bg-black border-black text-white',
        false: 'bg-white border-gray-300 text-black',
      },
      size: {
        lg: 'px-6 py-3 title-sm',
        sm: 'px-4 py-2 body-lg',
      },
    },
    defaultVariants: {
      selected: false,
      size: 'lg',
    },
  }
);
