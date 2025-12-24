'use client';

import Image from 'next/image';
import { forwardRef, useId } from 'react';

import Text from './Text';

import ic_delete from '@/assets/icons/common/ic-delete.svg';
import { textInputStyle } from '@/styles/cva/text-input.cva';
import { cn } from '@/util/cn';

type InputProps = {
  /** 라벨 텍스트 */
  label?: string;
  /** 상태: 기본 / 에러 / 비활성화 */
  state?: 'default' | 'error' | 'disabled';
  /** X 버튼 표시 */
  clearable?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 값 변경 시 호출 */
  onChange?: (value: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

/**
 * TextInput 컴포넌트
 * 라벨, 상태별 스타일, 삭제 버튼을 지원하는 텍스트 입력 컴포넌트
 * 사용용도: 이메일, 닉네임, 제목, 가격, 주소 등
 *
 * @example
 * <TextInput label="이메일" placeholder="이메일을 입력하세요" /> 👉🏻 기본
 * <TextInput value={email} onChange={setEmail} clearable /> 👉🏻 X 버튼
 * <TextInput state="error" errorMessage="이메일 형식이 아닙니다" /> 👉🏻 에러
 * <TextInput state="disabled" value="수정불가" /> 👉🏻 비활성화
 */
const TextInput = forwardRef<HTMLInputElement, InputProps>(function TextInput(
  {
    label,
    state = 'default',
    value,
    clearable,
    errorMessage,
    onChange,
    disabled,
    className,
    ...props
  },
  ref
) {
  // label과 input을 연결하기 위한 고유 ID 생성
  const inputId = useId();

  // 조건 변수 분리
  const isDisabled = state === 'disabled' || disabled;
  const showClearButton = clearable && value && !isDisabled;
  const showError = state === 'error' && errorMessage;

  return (
    // 전체 wrapper: 라벨, 인풋, 에러메시지를 세로로 배치
    <div className="mx-auto flex w-full max-w-160 flex-col gap-2">
      {/* 라벨 */}
      {label && (
        <Text as="label" htmlFor={inputId} size="body-lg" className="regular">
          {label}
        </Text>
      )}

      {/* 인풋 컨테이너: state에 따라 스타일 변경 */}
      <div className={cn(textInputStyle({ state }), 'group relative')}>
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

        {/* X 버튼 (포커스 시 표시) */}
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
            <Image src={ic_delete} alt="삭제 아이콘" width={24} height={24} />
          </button>
        )}
      </div>

      {/* 에러 메시지 */}
      {showError && (
        <Text as="span" size="body-sm" className="text-red-500">
          {errorMessage}
        </Text>
      )}
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
