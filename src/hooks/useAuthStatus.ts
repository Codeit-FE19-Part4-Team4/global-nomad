//로그인 상태 판단용 훅
'use client';

import { useEffect, useState } from 'react';

export function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (typeof token === 'string' && token.length > 0) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading };
}
