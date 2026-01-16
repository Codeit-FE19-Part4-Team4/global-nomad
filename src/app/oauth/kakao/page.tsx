// src/app/oauth/kakao/page.tsx
'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { oauthSignIn, oauthSignUp } from '@/api/oauth';
import kakaoLogo from '@/assets/icons/auth/ic-kakao.svg';
import { useToast } from '@/components/toast/useToast';
import { KAKAO_REDIRECT_URI } from '@/config/oauth';

export default function KakaoCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasRequested = useRef(false);
  const toast = useToast();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      router.replace('/login');
      return;
    }

    if (hasRequested.current) return;
    hasRequested.current = true;

    window.history.replaceState({}, '', '/oauth/kakao');

    const processOAuth = async () => {
      try {
        let res;

        if (state === 'signup') {
          res = await oauthSignUp({
            provider: 'kakao',
            nickname: '임시닉네임',
            redirectUri: KAKAO_REDIRECT_URI,
            token: code,
          });
        } else {
          res = await oauthSignIn({
            provider: 'kakao',
            redirectUri: KAKAO_REDIRECT_URI,
            token: code,
          });
        }

        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);

        router.replace('/');
      } catch (e) {
        console.error('카카오 인증 실패', e);
        // 에러 처리
        if (e instanceof Error) {
          if (state === 'signup' && e.message.includes('이미')) {
            toast.warning('이미 가입된 계정입니다. 로그인을 진행해 주세요.');
            router.replace('/login');
          } else if (state === 'login' && e.message.includes('않은')) {
            toast.warning(
              '가입되지 않은 계정입니다. 회원가입을 진행해 주세요.'
            );
            router.replace('/signup');
          } else {
            toast.error('인증에 실패했습니다. 다시 시도해주세요.');
            router.replace(state === 'signup' ? '/signup' : '/login');
          }
        }
      }
    };

    processOAuth();
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Image src={kakaoLogo} alt="카카오로고" width={100} height={100} />
      <p className="mt-5 text-[22px]">카카오 인증 처리 중...</p>
      <p className="mt-5 text-[18px]">잠시만 기다려주세요</p>
    </div>
  );
}
