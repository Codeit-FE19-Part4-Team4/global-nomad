'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ProfileButton from './ProfileButton';
import ProfileMenu from './ProfileMenu';

import Notification from '@/components/Notification';
import useClickOutside from '@/hooks/useClickOutside';
import { useUser } from '@/hooks/useUser';
import { logout } from '@/util/logout';

export default function HeaderAuth() {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useClickOutside(() => setIsOpen(false));
  const router = useRouter();
  const { user } = useUser();

  const handleLogout = () => {
    logout();
    if (typeof window !== 'undefined' && window.Kakao?.Auth) {
      window.Kakao.Auth.logout(() => {
        console.log('카카오 로그아웃 완료');
      });
    }
    router.push('/login');
  };

  return (
    <div className="flex items-center gap-5">
      <Notification />
      <span className="text-[17px] leading-[30px] text-gray-100">|</span>
      <div className="relative" ref={profileRef}>
        <ProfileButton
          name={user?.nickname}
          url={user?.profileImageUrl}
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
