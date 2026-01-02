'use client';

import Image from 'next/image';
import { useState } from 'react';

import ProfileButton from './ProfileButton';
import ProfileMenu from './ProfileMenu';

import imgBell from '@/assets/icons/common/ic-bell.svg';
import useClickOutside from '@/hooks/useClickOutside';

export default function HeaderAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useClickOutside(() => setIsOpen(false));
  const hasNotification = true; // 알림 버튼 임시 TODO

  const handleLogout = () => {
    // TODO: 실제 로그아웃 로직 구현
    console.log('logout');
  };

  return (
    <div className="flex items-center gap-5">
      <button aria-label="알림" className="relative h-7 w-7">
        <Image src={imgBell} alt="알림" fill className="object-contain" />

        {hasNotification && (
          <span className="absolute top-1 right-0.5 h-2 w-2 rounded-full border border-white bg-red-500" />
        )}
      </button>
      <span className="text-[17px] leading-[30px] text-gray-100">|</span>
      <div className="relative" ref={profileRef}>
        <ProfileButton
          name="홍길동"
          onClick={() => setIsOpen((prev) => !prev)}
        />

        {isOpen && (
          <ProfileMenu
            onClose={() => setIsOpen(false)}
            onLogout={handleLogout}
          />
        )}
      </div>
    </div>
  );
}
