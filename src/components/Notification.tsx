'use client';
import Image from 'next/image';
import { useState } from 'react';

import NotificationCard from './NotificationCard';

import ic_bell_on from '@/assets/icons/common/ic-bell-on.svg';
import ic_bell from '@/assets/icons/common/ic-bell.svg';
import ic_close from '@/assets/icons/common/ic-close.svg';
import useClickOutside from '@/hooks/useClickOutside';
import { type Notification } from '@/types/notification';

//TODO: 데이터 연결시 삭제
const mockdata = {
  cursorId: 3,
  notifications: [
    {
      id: 3,
      teamId: 'team_101',
      userId: 12,
      content: '함께하면 즐거운 (2026-01-06 15:00~18:00) 예약이 승인되었어요.',
      createdAt: '2025-12-31T07:10:00.000Z',
      updatedAt: '2025-12-31T07:10:00.000Z',
      deletedAt: null,
    },
    {
      id: 2,
      teamId: 'team_101',
      userId: 12,
      content: '가나다라마 체험 (2026-01-05 10:00~12:00) 예약이 승인되었어요.',
      createdAt: '2025-12-30T23:40:00.000Z',
      updatedAt: '2025-12-30T23:40:00.000Z',
      deletedAt: null,
    },
    {
      id: 1,
      teamId: 'team_102',
      userId: 12,
      content: '테스트 예약 (2026-01-05 10:00~12:00) 예약이 거절되었어요.',
      createdAt: '2025-12-29T09:20:00.000Z',
      updatedAt: '2025-12-29T09:20:00.000Z',
      deletedAt: null,
    },
  ],
  totalCount: 3,
};

export default function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useClickOutside(() => setIsOpen(false));
  //TODO 데이터 조회 연결
  const notifications = mockdata.notifications;
  const hasNotification = notifications?.length > 0;
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
              알림 {mockdata.totalCount}개
            </span>
            {/* 모두읽음 처리 TODO */}
            <button className="text-[12px]">모두 읽음</button>
            <button onClick={() => setIsOpen(false)}>
              <Image src={ic_close} alt="알림 닫기" />
            </button>
          </div>
          {notifications.length > 0 ? (
            <ul className="scrollbar-hidden max-h-[241px] overflow-scroll">
              {notifications?.map((notification: Notification) => (
                <NotificationCard
                  key={notification.id}
                  content={notification.content}
                  timeAgo="5분"
                  onDelete={() => console.log('삭제요청')}
                />
              ))}
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
