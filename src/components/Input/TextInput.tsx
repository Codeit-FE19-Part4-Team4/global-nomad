'use client';

import Image from 'next/image';
import { forwardRef, InputHTMLAttributes } from 'react';

import BaseInput from './BaseInput';
import { inputStyle } from './input.cva';
import { CommonInputProps } from './input.types';

import ic_delete from '@/assets/icons/common/ic-delete.svg';
import { cn } from '@/util/cn';

type TextInputProps = CommonInputProps & {
  /** 입력값 초기화 버튼 표시 */
  clearable?: boolean;
  /** 값 변경 시 호출 */
  onChange?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

/**
 * 텍스트 입력 컴포넌트
 *
 * @example
 * <TextInput label="이메일" placeholder="이메일을 입력하세요" /> 👉🏻 기본
 * <TextInput value={email} onChange={setEmail} clearable /> 👉🏻 입력 삭제 버튼
 * <TextInput state="error" errorMessage="필수 입력입니다" /> 👉🏻 에러
 */
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      label,
      state = 'default',
      errorMessage,
      clearable,
      onChange,
      disabled,
      value,
      className,
      ...props
    },
    ref
  ) {
    const isDisabled = state === 'disabled' || disabled;
    const showClearButton = clearable && value && !isDisabled;

    return (
      <BaseInput label={label} state={state} errorMessage={errorMessage}>
        {(inputId) => (
          <div className={cn(inputStyle({ state }), 'group relative')}>
            {/* 입력 필드 */}
            <input
              ref={ref}
              id={inputId}
              value={value}
              disabled={isDisabled}
              onChange={(e) => onChange?.(e.target.value)}
              className={cn(
                'w-full bg-transparent outline-none',
                'body-lg text-gray-900 placeholder-gray-300',
                clearable && 'pr-12',
                className
              )}
              {...props}
            />

            {/* 초기화 버튼 (focus 시 노출) */}
            {showClearButton && (
              <button
                type="button"
                onClick={() => onChange?.('')}
                aria-label="입력값 삭제"
                className={cn(
                  'absolute top-1/2 right-4 -translate-y-1/2',
                  'cursor-pointer hover:opacity-80',
                  'hidden group-focus-within:block'
                )}>
                <Image src={ic_delete} alt="" width={24} height={24} />
              </button>
            )}
          </div>
        )}
      </BaseInput>
    );
  }
);

export default TextInput;
