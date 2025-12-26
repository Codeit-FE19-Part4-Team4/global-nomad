/**
 * Input 컴포넌트 공통 타입
 * TextInput, PasswordInput, TextArea에서 공유하는 타입을 관리합니다.
 */

export type InputState = 'default' | 'error' | 'disabled';

export type CommonInputProps = {
  /** 라벨 텍스트 */
  label?: string;
  /** 입력 상태 */
  state?: InputState;
  /** 에러 메시지 */
  errorMessage?: string;
};
