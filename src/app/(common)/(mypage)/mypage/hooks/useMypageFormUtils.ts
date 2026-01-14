import { FormData } from './useMyPageFormTypes';

import { UpdateUserRequest } from '@/api/users';
import { ApiError } from '@/config/client';

/**
 * 401 Unauthorized 에러 확인
 */
export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401;
}

/**
 * 사용자 정보 수정 API용 payload 생성
 * - 비밀번호는 입력 시에만 포함
 * 폼 데이터를 API 요청 형식으로 변환
 * 비밀번호는 입력했을 때만 포함
 */
export function createUpdatePayload(formData: FormData): UpdateUserRequest {
  const payload: UpdateUserRequest = {
    nickname: formData.nickname,
  };

  // 비밀번호 입력한 경우에만 추가
  if (formData.password) {
    payload.newPassword = formData.password;
  }

  return payload;
}
