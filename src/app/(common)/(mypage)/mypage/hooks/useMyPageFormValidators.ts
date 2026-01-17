import { MyPageFormData, MyPageFormErrors } from './useMyPageFormTypes';

import {
  validateEmail,
  validateNickname,
  validatePassword,
  validatePasswordConfirm,
} from '@/util/validations';

/**
 * 마이페이지 폼 유효성 검사
 * - 닉네임, 이메일은 필수 검증
 * - 비밀번호는 입력 시에만 검증 (선택적)
 */
export function validateForm(formData: MyPageFormData): {
  errors: MyPageFormErrors;
  isValid: boolean;
} {
  // 기본 필드 검증 (닉네임, 이메일)
  const errors: MyPageFormErrors = {
    nickname: validateNickname(formData.nickname),
    email: validateEmail(formData.email),
    password: '',
    passwordConfirm: '',
  };

  // 비밀번호 입력 시에만 검증
  if (formData.password || formData.passwordConfirm) {
    errors.password = validatePassword(formData.password);
    errors.passwordConfirm = validatePasswordConfirm(
      formData.password,
      formData.passwordConfirm
    );
  }

  // 모든 에러가 없으면 유효
  const isValid = !Object.values(errors).some((error) => error !== '');

  return { errors, isValid };
}
