// 비로그인 전용 페이지용 훅
// 이미 로그인 되어 있으면 / 으로 이동
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ACCESS_TOKEN_KEY = 'accessToken';

export function useGuestOnly() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (token) {
      router.replace('/');
    }
  }, [router]);
}
