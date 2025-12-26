'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';

import BaseInput from './BaseInput';
import { textAreaStyle } from './input.cva';
import { CommonInputProps } from './input.types';

import Text from '@/components/Text';
import { cn } from '@/util/cn';

type TextAreaProps = CommonInputProps & {
  /** 높이 (줄 수) */
  rows?: number;
  /** 최대 글자 수 */
  maxLength?: number;
  /** 글자 수 표시 */
  showCount?: boolean;
  /** 값 변경 시 호출 */
  onChange?: (value: string) => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>;

/**
 * 여러 줄 텍스트 입력 컴포넌트
 *
 * @example
 * <TextArea label='소개' placeholder='자기소개를 입력하세요' rows={4} /> 👉🏻 기본
 * <TextArea maxLength={100} showCount /> 👉🏻 글자 수 표시
 * <TextArea state='error' errorMessage='필수 입력입니다' /> 👉🏻 에러
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      label,
      state = 'default',
      errorMessage,
      rows = 4,
      maxLength,
      showCount = false,
      onChange,
      disabled,
      value,
      className,
      ...props
    },
    ref
  ) {
    const isDisabled = state === 'disabled' || disabled;
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      // 입력필드 래퍼
      <BaseInput
        label={label}
        state={state}
        errorMessage={errorMessage}
        // 글자 수 카운터
        rightBottom={
          showCount && maxLength ? (
            <Text as="span" className="body-sm text-gray-600">
              {currentLength}/{maxLength}
            </Text>
          ) : undefined
        }>
        {(inputId) => (
          <div className={cn(textAreaStyle({ state }))}>
            {/* 텍스트 입력 필드 */}
            <textarea
              ref={ref}
              id={inputId}
              rows={rows}
              maxLength={maxLength}
              value={value}
              disabled={isDisabled}
              onChange={(e) => onChange?.(e.target.value)}
              className={cn(
                'w-full resize-none bg-transparent outline-none',
                'body-lg text-gray-900 placeholder-gray-300',
                className
              )}
              {...props}
            />
          </div>
        )}
      </BaseInput>
    );
  }
);

export default TextArea;
