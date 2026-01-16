import { LoginRequest, LoginResponse } from '../types/auth';

import { apiFetch } from '@/config/client';

// 로그인-POST /{teamId}/auth/login
export function login(payload: LoginRequest) {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  });
}

// 토큰 리프레시 - POST /{teamId}/auth/tokens
export function refreshTokens(refreshToken: string) {
  return apiFetch<{ accessToken: string; refreshToken: string }>(
    '/auth/tokens',
    {
      method: 'POST',
      body: { refreshToken },
      skipAuthRefresh: true,
    }
  );
}
