'use client';

import { useQuery } from '@tanstack/react-query';

import { apiFetch, ApiError } from '@/config/client';
import type { UserResponse } from '@/features/auth/types';

/**
 * 로그인 상태 확인 + 사용자 정보 조회 훅
 *
 * @returns
 *   user: UserResponse | null (로그인 안 한 경우 null)
 *   isLoading: boolean
 *   error: ApiError | null
 */
export function useUser() {
  // 클라이언트 환경에서만 localStorage 접근
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const query = useQuery<UserResponse | null, ApiError>({
    queryKey: ['user'],
    queryFn: async () => {
      if (!token) return null; // 비로그인 상태
      try {
        return await apiFetch<UserResponse>('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401 || error.status === 404) {
            // 토큰 만료 또는 유저 존재하지 않으면 비로그인 처리
            return null;
          }
        }
        throw error; // 그 외 에러
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error ?? null,
  };
}
