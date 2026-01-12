'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ProfileButton from './ProfileButton';
import ProfileMenu from './ProfileMenu';

import Notification from '@/components/Notification';
import { logout } from '@/features/auth/logout';
import useClickOutside from '@/hooks/useClickOutside';

export default function HeaderAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useClickOutside(() => setIsOpen(false));
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push('/login');
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
