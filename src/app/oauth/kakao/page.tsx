'use client';

import Image from 'next/image';
import { Suspense } from 'react';

import KakaoCallbackContent from './KakaoCallbackContent';

import kakaoLogo from '@/assets/icons/auth/ic-kakao.svg';

export default function KakaoCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen flex-col items-center justify-center">
          <Image src={kakaoLogo} alt="카카오로고" width={100} height={100} />
          <p className="title-lg mt-5">카카오 인증 처리 중...</p>
        </div>
      }>
      <KakaoCallbackContent />
    </Suspense>
  );
}
