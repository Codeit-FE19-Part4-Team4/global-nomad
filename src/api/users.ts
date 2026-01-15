import { SignupRequest, SignupResponse, UserResponse } from '../types/auth';

import { apiFetch } from '@/config/client';

// 사용자 정보 수정 요청 타입
export interface UpdateUserRequest {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

// 내 정보 조회 - GET /{teamId}/users/me
export const getUsersMe = async () => {
  return apiFetch<UserResponse>('/users/me');
};

// 회원가입 - POST /{teamId}/users
export function signup(payload: SignupRequest) {
  return apiFetch<SignupResponse>('/users', {
    method: 'POST',
    body: payload,
  });
}

// 내 정보 수정
export async function updateMe(body: UpdateUserRequest): Promise<UserResponse> {
  return apiFetch<UserResponse>('/users/me', {
    method: 'PATCH',
    body,
  });
}
