'use client';

import { useId } from 'react';

import { InputState } from './input.types';

import Text from '@/components/Text';

type BaseInputProps = {
  /** 라벨 텍스트 */
  label?: string;
  /** 입력 상태 */
  state?: InputState;
  /** 에러 메시지 */
  errorMessage?: string;
  /** input 렌더 함수 */
  children: (inputId: string) => React.ReactNode;
  /** 하단 우측 요소 (글자 수 등) */
  rightBottom?: React.ReactNode;
};

/**
 * Input 공통 래퍼: 라벨, 에러 메시지, 하단 보조 영역을 관리합니다.
 *
 * @example
 * <BaseInput label="이메일">{(id) => <input id={id} />}</BaseInput> 👉🏻 기본
 * <BaseInput state="error" errorMessage="필수">{...}</BaseInput> 👉🏻 에러
 */
export default function BaseInput({
  label,
  state = 'default',
  errorMessage,
  children,
  rightBottom,
}: BaseInputProps) {
  const inputId = useId();
  const showError = state === 'error' && Boolean(errorMessage);

  return (
    <div className="mx-auto flex w-full max-w-160 flex-col gap-2">
      {/* 라벨 */}
      {label && (
        <Text as="label" htmlFor={inputId} className="body-lg">
          {label}
        </Text>
      )}

      {/* 입력 필드 */}
      {children(inputId)}

      {/* 하단 영역 (에러 메시지, 글자 수 등) */}
      {(showError || rightBottom) && (
        <div className="flex items-center justify-between">
          {showError ? (
            <Text as="span" className="body-sm text-red-500">
              {errorMessage}
            </Text>
          ) : (
            <span />
          )}
          {rightBottom}
        </div>
      )}
    </div>
  );
}
