import { SignupRequest, SignupResponse } from '../types/auth';

import { apiFetch } from '@/config/client';
import { ResponseGetUsersMe } from '@/types/users';

// 내 정보 조회 - GET /{teamId}/users/me
export const getUsersMe = async () => {
  return apiFetch<ResponseGetUsersMe>(`/users/me`);
};

// 회원가입 - POST /{teamId}/users
export function signup(payload: SignupRequest) {
  return apiFetch<SignupResponse>('/users', {
    method: 'POST',
    body: payload,
  });
}
