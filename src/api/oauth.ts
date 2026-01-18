// src/api/oauth.ts
import { apiFetch } from '@/config/client';
import { OAuthAuthResponse } from '@/types/oauth';

type OAuthProvider = 'kakao';

type OAuthSignInParams = {
  provider: OAuthProvider;
  redirectUri: string;
  token: string;
};

type OAuthSignUpParams = {
  provider: OAuthProvider;
  redirectUri: string;
  token: string;
  nickname: string;
};

/**
 * OAuth 로그인
 * POST /oauth/sign-in/{provider}
 */
export function oauthSignIn({
  provider,
  redirectUri,
  token,
}: OAuthSignInParams) {
  return apiFetch<OAuthAuthResponse>(`/oauth/sign-in/${provider}`, {
    method: 'POST',
    body: {
      redirectUri,
      token,
    },
    skipAuthRefresh: true,
  });
}

/**
 * OAuth 회원가입
 * POST /oauth/sign-up/{provider}
 */
export function oauthSignUp({
  provider,
  redirectUri,
  token,
  nickname,
}: OAuthSignUpParams) {
  return apiFetch<OAuthAuthResponse>(`/oauth/sign-up/${provider}`, {
    method: 'POST',
    body: {
      redirectUri,
      token,
      nickname,
    },
    skipAuthRefresh: true,
  });
}
