// src/api/oauth.ts
import { apiFetch } from '@/config/client';
import { OAuthSignupResponse } from '@/types/oauth';

export function kakaoSignUp(params: {
  nickname: string;
  redirectUri: string;
  token: string;
}) {
  return apiFetch<OAuthSignupResponse>('/oauth/sign-up/kakao', {
    method: 'POST',
    body: params,
    skipAuthRefresh: true,
  });
}
