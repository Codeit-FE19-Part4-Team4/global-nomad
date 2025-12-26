'use client';

import Image from 'next/image';
import { forwardRef, InputHTMLAttributes, useState } from 'react';

import BaseInput from './BaseInput';
import { inputStyle } from './input.cva';
import { CommonInputProps } from './input.types';

import ic_password_hidden from '@/assets/icons/auth/ic-password-hidden.svg';
import ic_password_show from '@/assets/icons/auth/ic-password-show.svg';
import { cn } from '@/util/cn';

type PasswordInputProps = CommonInputProps & {
  /** 값 변경 시 호출 */
  onChange?: (value: string) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'>;

/**
 * 비밀번호 입력 컴포넌트
 *
 * @example
 * <PasswordInput label='비밀번호' placeholder='비밀번호를 입력하세요' /> 👉🏻 기본
 * <PasswordInput state='error' errorMessage='8자 이상 입력하세요' /> 👉🏻 에러
 */
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      label,
      state = 'default',
      errorMessage,
      onChange,
      disabled,
      value,
      className,
      ...props
    },
    ref
  ) {
    const isDisabled = state === 'disabled' || disabled;
    const [showPassword, setShowPassword] = useState(false);

    return (
      <BaseInput label={label} state={state} errorMessage={errorMessage}>
        {(inputId) => (
          <div className={cn(inputStyle({ state }), 'group relative')}>
            {/* 입력 필드 */}
            <input
              ref={ref}
              id={inputId}
              type={showPassword ? 'text' : 'password'}
              value={value}
              disabled={isDisabled}
              onChange={(e) => onChange?.(e.target.value)}
              className={cn(
                'w-full bg-transparent pr-12 outline-none',
                'body-lg text-gray-900 placeholder-gray-300',
                className
              )}
              {...props}
            />

            {/* 보기/숨기기 토글 */}
            {!isDisabled && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                className={cn(
                  'absolute top-1/2 right-4 -translate-y-1/2',
                  'cursor-pointer hover:opacity-80'
                )}>
                <Image
                  src={showPassword ? ic_password_show : ic_password_hidden}
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>
        )}
      </BaseInput>
    );
  }
);

export default PasswordInput;
