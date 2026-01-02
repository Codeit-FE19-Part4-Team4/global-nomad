/**
 * Input 컴포넌트 공통 스타일
 * TextInput, PasswordInput, TextArea의 상태별 스타일을 cva로 관리합니다.
 */

import { cva } from 'class-variance-authority';

const baseStyle = ['w-full rounded-2xl border px-5', 'transition-colors'];

const stateVariants = {
  default: [
    'border-gray-100',
    'hover:border-gray-500',
    'focus-within:border-gray-950',
  ],
  error: ['border-red-500', 'focus-within:border-red-600'],
  disabled: ['bg-gray-50', 'border-gray-100', 'cursor-not-allowed'],
};

// TextInput, PasswordInput용
export const inputStyle = cva(
  [...baseStyle, 'inline-flex items-center h-13.5'],
  {
    variants: {
      state: stateVariants,
    },
    defaultVariants: {
      state: 'default',
    },
  }
);

// TextArea용
export const textAreaStyle = cva([...baseStyle, 'py-3'], {
  variants: {
    state: stateVariants,
  },
  defaultVariants: {
    state: 'default',
  },
});
