'use client';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

import NotificationCard from './NotificationCard';

import ic_bell_on from '@/assets/icons/common/ic-bell-on.svg';
import ic_bell from '@/assets/icons/common/ic-bell.svg';
import ic_close from '@/assets/icons/common/ic-close.svg';
import useClickOutside from '@/hooks/useClickOutside';
import { useInfiniteNotifications } from '@/hooks/useInfiniteNotifications';
import { type Notification } from '@/types/notification';

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useClickOutside(() => setIsOpen(false));
  const bottomRef = useRef<HTMLLIElement | null>(null);

  const {
    notifications,
    loadMore,
    removeNotification,
    clearNotifications,
    isLoading,
    hasMore,
    error,
  } = useInfiniteNotifications();

  // 최초 로딩
  useEffect(() => {
    if (isOpen && notifications.length === 0 && !isLoading) {
      loadMore();
    }
  }, [isOpen]);

  // 무한 스크롤
  useEffect(() => {
    if (!isOpen || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [isOpen, hasMore, isLoading, loadMore]);

  const hasNotification = notifications.length > 0;

  const handleClearAll = async () => {
    try {
      await clearNotifications();
    } catch (err) {
      console.error('전체 삭제 실패:', err);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      await removeNotification(id);
    } catch (err) {
      console.error('삭제 실패:', err);
      // 필요시 토스트 메시지 표시
    }
  };

  return (
    <div className="h-6 w-6 md:relative md:flex md:w-[231px] md:justify-end">
      {/* 알림 아이콘 */}
      <button
        className="relative h-6 w-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}>
        <Image src={isOpen ? ic_bell_on : ic_bell} alt={'알림'} />
        {hasNotification && (
          <div className="border-background absolute top-[4.5px] right-[8px] h-1.5 w-1.5 rounded-full border bg-red-500" />
        )}
      </button>
      {/* 알림 리스트 */}
      {isOpen && (
        <div
          ref={notificationRef}
          className="bg-background shadow-notification absolute top-[80px] z-10 h-fit rounded-[10px] pt-4 pb-2 max-md:right-6 max-md:left-6 md:top-[39px] md:mx-0 md:w-full">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 pt-0 pb-[14px]">
            <span className="bold flex-1 text-[16px] text-gray-950">
              알림 {notifications.length}개
            </span>
            {/* 모두읽음 처리 */}
            <button
              className="text-[12px]"
              onClick={handleClearAll}
              disabled={isLoading}>
              모두 읽음
            </button>
            <button onClick={() => setIsOpen(false)}>
              <Image src={ic_close} alt="알림 닫기" />
            </button>
          </div>
          {error && (
            <div className="px-5 py-2 text-center text-[12px] text-red-500">
              {error}
            </div>
          )}
          {notifications.length > 0 ? (
            <ul className="scrollbar-hidden max-h-[241px] overflow-scroll">
              {notifications?.map((notification: Notification) => (
                <NotificationCard
                  key={notification.id}
                  content={notification.content}
                  timeAgo="5분"
                  onDelete={() => handleDelete(notification.id)}
                />
              ))}

              {/* 무한 스크롤 트리거 */}
              <li ref={bottomRef} />

              {/* 로딩 표시 */}
              {isLoading && (
                <li className="py-2 text-center text-[12px] text-gray-400">
                  불러오는 중...
                </li>
              )}
            </ul>
          ) : (
            // 알림이 없을 때 화면
            <div className="flex h-[54px] items-center justify-center pt-2">
              <span className="text-center">새로운 알림이 없습니다.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
