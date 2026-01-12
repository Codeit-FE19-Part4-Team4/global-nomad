import { apiFetch } from '@/config/client';
import { ResponseGetUsersMe } from '@/types/users';

// 내 정보 조회 - GET /{teamId}/users/me
export const getUsersMe = async () => {
  return apiFetch<ResponseGetUsersMe>(`/users/me`);
};
