'use client';

import { useState } from 'react';

import SideMenu from './components/SideMenu';
import { MenuProvider } from './context/MenuContext';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import { cn } from '@/util/cn';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //접속권한 제한
  useRequireAuth();
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  return (
    <MenuProvider value={{ openMenu, closeMenu }}>
      <div className="flex min-h-[calc(100vh-225px)] w-full justify-center">
        <div className="mypage-layout flex w-full max-w-245">
          {/* PC / 태블릿 */}
          <div className="hidden md:block">
            <SideMenu />
          </div>

          {/* 모바일 */}
          <div
            className={cn(
              'fixed inset-0 z-40 shrink-0 shadow-[5px_0_30px_#0000004a] transition-opacity duration-300 md:hidden',
              isOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
            )}>
            {/* 오버레이 */}
            <div className="absolute inset-0 bg-black/40" onClick={closeMenu} />

            {/* 왼쪽 슬라이드 메뉴 */}
            <div
              className={cn(
                'absolute top-0 left-0 flex h-full w-[280px] items-center bg-white transition-transform duration-300',
                isOpen ? 'translate-x-0' : '-translate-x-full'
              )}>
              <SideMenu onClose={closeMenu} />
            </div>
          </div>

          {/* 메인 컨텐츠 */}
          <section className="flex-1 md:ml-12.5">{children}</section>
        </div>
      </div>
    </MenuProvider>
  );
}
