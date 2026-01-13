import { FormData } from './useMyPageFormTypes';

import { UpdateUserRequest } from '@/api/users';
import { ApiError } from '@/config/client';

export function isUnauthorizedError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 401;
}

/**
 * 폼 데이터를 API 요청 형식으로 변환
 * 비밀번호는 입력했을 때만 포함
 */
export function createUpdatePayload(formData: FormData): UpdateUserRequest {
  const payload: UpdateUserRequest = {
    nickname: formData.nickname,
  };

  if (formData.password) {
    payload.newPassword = formData.password;
  }

  return payload;
}
