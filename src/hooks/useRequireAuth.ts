// 로그인 필수 페이지용 훅
// 로그인 안 되어 있으면 /login 으로 이동
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ACCESS_TOKEN_KEY = 'accessToken';

export function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!token) {
      router.replace('/login');
    }
  }, [router]);
}
