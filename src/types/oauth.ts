// src/types/oauth.ts
export interface OAuthUser {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface OAuthAuthResponse {
  user: OAuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface KakaoAuth {
  logout: (callback?: () => void) => void;
  login: (options: {
    success?: (res: any) => void;
    fail?: (err: any) => void;
  }) => void;
}

export interface KakaoStatic {
  Auth: KakaoAuth;
}

// window.Kakao 타입 확장
declare global {
  interface Window {
    Kakao: KakaoStatic;
  }
}
