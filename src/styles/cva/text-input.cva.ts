/**
 * TextInput 스타일
 * 상태별(default/error/disabled) 테두리/배경 스타일을 cva로 관리합니다.
 */

import { cva } from 'class-variance-authority';

export const textInputStyle = cva(
  // 공통 스타일
  [
    'inline-flex items-center',
    'w-full h-13.5',
    'rounded-lg border px-4',
    'transition-colors',
  ],
  {
    variants: {
      // 상태별 스타일
      state: {
        default: [
          'border-gray-200',
          'hover:border-gray-500',
          'focus-within:border-gray-950',
        ],
        error: ['border-red-500', 'focus-within:border-red-600'],
        disabled: ['bg-gray-50', 'border-gray-100', 'cursor-not-allowed'],
      },
    },
    defaultVariants: {
      state: 'default',
    },
  }
);
