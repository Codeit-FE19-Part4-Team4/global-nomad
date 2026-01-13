import { apiFetch } from '@/config/client';
import { ResponseGetUsersMe } from '@/types/users';

// 사용자 정보 타입
export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// 사용자 정보 수정 요청 타입
export interface UpdateUserRequest {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}

// 내 정보 조회 - GET /{teamId}/users/me
export const getUsersMe = async () => {
  return apiFetch<ResponseGetUsersMe>(`/users/me`);
};

// 내 정보 수정
export async function updateMe(body: UpdateUserRequest): Promise<User> {
  return apiFetch<User>('/users/me', {
    method: 'PATCH',
    body,
  });
}
