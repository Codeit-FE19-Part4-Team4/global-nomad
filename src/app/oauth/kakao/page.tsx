'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { kakaoSignUp } from '@/api/oauth';
import { KAKAO_REDIRECT_URI } from '@/config/oauth';

export default function KakaoSignupPage() {
  const router = useRouter();
  const hasRequested = useRef(false);

  useEffect(() => {
    if (hasRequested.current) return;
    hasRequested.current = true;

    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return;

    const signup = async () => {
      try {
        const res = await kakaoSignUp({
          nickname: '카카오유저',
          redirectUri: KAKAO_REDIRECT_URI,
          token: code,
        });

        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);

        router.replace('/');
      } catch (e) {
        console.error('카카오 회원가입 실패', e);
      }
    };

    signup();
  }, [router]);

  return <p>카카오 회원가입 처리 중...</p>;
}
