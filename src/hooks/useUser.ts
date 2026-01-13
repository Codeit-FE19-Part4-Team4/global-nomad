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
  const query = useQuery<UserResponse | null, ApiError>({
    queryKey: ['user'],
    queryFn: async () => {
      // 쿼리 실행 시점마다 최신 토큰 확인
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null;

      if (!token) return null;

      try {
        return await apiFetch<UserResponse>('/users/me');
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401 || error.status === 404) {
            return null;
          }
        }
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
  };
}
