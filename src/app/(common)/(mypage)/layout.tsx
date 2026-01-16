'use client';

import { useState } from 'react';

import SideMenu from './components/SideMenu';
import { MenuProvider } from './context/MenuContext';
import { ProfileImageProvider } from './mypage/context/ProfileImageContext';

import { useProfileImage } from '@/app/(common)/(mypage)/mypage/hooks/useProfileImage';
import { useGetMyInfo } from '@/app/(common)/(mypage)/mypage/hooks/useUser';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { cn } from '@/util/cn';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRequireAuth();
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  const { data: userData } = useGetMyInfo();
  const profileImageHook = useProfileImage(userData?.profileImageUrl);

  return (
    <ProfileImageProvider value={profileImageHook}>
      <MenuProvider value={{ openMenu, closeMenu }}>
        <div className="flex min-h-[calc(100vh-(48px+85px))] w-full justify-center md:min-h-[calc(100vh-(80px+145px))]">
          <div className="mypage-layout flex w-full max-w-245 pt-7.5 pb-10 md:pt-10 md:pb-15">
            <div className="hidden md:block">
              <SideMenu />
            </div>

            <div
              className={cn(
                'fixed inset-0 z-40 shrink-0 shadow-[5px_0_30px_#0000004a] transition-opacity duration-300 md:hidden',
                isOpen
                  ? 'pointer-events-auto opacity-100'
                  : 'pointer-events-none opacity-0'
              )}>
              <div
                className="absolute inset-0 bg-black/40"
                onClick={closeMenu}
              />
              <div
                className={cn(
                  'absolute top-0 left-0 flex h-full w-70 items-center bg-white transition-transform duration-300',
                  isOpen ? 'translate-x-0' : '-translate-x-full'
                )}>
                <SideMenu onClose={closeMenu} />
              </div>
            </div>

            <section className="flex-1 md:ml-12.5">{children}</section>
          </div>
        </div>
      </MenuProvider>
    </ProfileImageProvider>
  );
}
