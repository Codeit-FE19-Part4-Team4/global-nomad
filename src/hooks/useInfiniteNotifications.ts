'use client';

import { useCallback, useState, useRef, useEffect } from 'react';

import { getMyNotifications, deleteNotification } from '@/api/mynotification';
import { Notification } from '@/types/notification';

export const useInfiniteNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [cursorId, setCursorId] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  //무한 루프 방지
  const cursorIdRef = useRef(cursorId);
  const hasMoreRef = useRef(hasMore);
  const isLoadingRef = useRef(false);
  useEffect(() => {
    cursorIdRef.current = cursorId;
    hasMoreRef.current = hasMore;
  }, [cursorId, hasMore]);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMoreRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      const data = await getMyNotifications({
        size: 10,
        cursorId: cursorIdRef.current,
      });

      setNotifications((prev) => [...prev, ...data.notifications]);
      setCursorId(data.cursorId ?? undefined);

      // 더 이상 가져올 데이터가 없을 때
      if (data.notifications.length === 0 || data.cursorId === null) {
        setHasMore(false);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알림을 불러오는데 실패했습니다.'
      );
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  //개별 삭제
  const removeNotification = useCallback(async (id: number) => {
    try {
      await deleteNotification(id);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알림 삭제에 실패했습니다.'
      );
      throw err;
    }
  }, []);

  // 전체 삭제
  const clearNotifications = useCallback(async () => {
    try {
      const ids = notifications.map((n) => n.id);
      await Promise.all(ids.map((id) => deleteNotification(id)));
      setNotifications([]);
      setCursorId(undefined);
      setHasMore(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '전체 삭제에 실패했습니다.'
      );
      throw err;
    }
  }, [notifications]);

  return {
    notifications,
    loadMore,
    removeNotification,
    clearNotifications,
    isLoading,
    hasMore,
    error,
  };
};
