'use client';

import Image from 'next/image';
import { useState } from 'react';

import ProfileButton from './ProfileButton';
import ProfileMenu from './ProfileMenu';

import imgBell from '@/assets/icons/common/ic-bell.svg';
import Notification from '@/components/Notification';
import useClickOutside from '@/hooks/useClickOutside';

export default function HeaderAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useClickOutside(() => setIsOpen(false));

  const handleLogout = () => {
    // TODO: 실제 로그아웃 로직 구현
    console.log('logout');
  };

  return (
    <div className="flex items-center gap-5">
      <Notification />
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
