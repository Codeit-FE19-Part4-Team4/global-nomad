/**
 * Filter 버튼 스타일
 * 메인 체험 화면에서 사용하는 필터 버튼 단위의 스타일을 cva로 관리합니다.
 */

import { cva } from 'class-variance-authority';

export const filterStyle = cva(
  [
    'inline-flex items-center gap-2',
    'shrink-0',
    'rounded-full',
    'border',
    'cursor-pointer',

    // 모바일
    'px-3 py-2 body-sm medium',

    // 태블릿 / 웹
    'md:px-4 md:py-2 md:body-lg md:medium',
  ],
  {
    variants: {
      selected: {
        true: 'bg-black border-black text-white',
        false: 'bg-white border-gray-200 text-black',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
);
