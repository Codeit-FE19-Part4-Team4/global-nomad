'use client';

import { useQuery } from '@tanstack/react-query';

import { getMyNotifications } from '@/api/mynotification';

export function useNotificationsCount() {
  return useQuery({
    queryKey: ['notificationsCount'],
    queryFn: async () => {
      const data = await getMyNotifications({ size: 1 }); // 최소 1개만 조회해 개수 확인
      return data.notifications.length > 0; // true/false 반환 (개수 대신 존재 여부)
    },
    enabled: false, // 수동으로 호출 (로그인 후)
    staleTime: 5 * 60 * 1000, // 5분 캐시
  });
}
