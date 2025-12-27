/**
 * Input 컴포넌트 공통 타입
 * TextInput, PasswordInput, TextArea에서 공유하는 타입을 관리합니다.
 */

export type CommonInputProps = {
  /** 라벨 텍스트 */
  label?: string;
  /** 에러 메시지 (있으면 에러 상태) */
  errorMessage?: string;
};
