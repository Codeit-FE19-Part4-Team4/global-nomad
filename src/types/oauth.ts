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
