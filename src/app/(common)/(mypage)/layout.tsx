'use client';

import Image from 'next/image';
import { useState } from 'react';

import SideMenu from './components/SideMenu';

import closeIcon from '@/assets/icons/sidemenu/ic-close.svg';
import menuIcon from '@/assets/icons/sidemenu/ic-menu.svg';
import { cn } from '@/util/cn';

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  return (
    <div className="mypage-layout relative flex min-h-screen">
      {/* 플로팅 버튼 */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-15 left-6 z-[100] flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 md:hidden"
        aria-label="사이드 메뉴 토글">
        <Image
          src={isOpen ? closeIcon : menuIcon}
          alt={isOpen ? '메뉴 닫기' : '메뉴 열기'}
          width={30}
          height={30}
        />
      </button>

      {/* PC / 태블릿 */}
      <aside className="hidden w-[280px] md:block">
        <SideMenu />
      </aside>

      {/* 모바일 */}
      <div
        className={cn(
          'fixed inset-0 z-40 shadow-[5px_0_30px_#0000004a] transition-opacity duration-300 md:hidden',
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        )}>
        {/* 오버레이 */}
        <div className="absolute inset-0 bg-black/40" onClick={closeMenu} />

        {/* 왼쪽 슬라이드 메뉴 */}
        <aside
          className={cn(
            'absolute top-0 left-0 h-full w-[280px] bg-white transition-transform duration-300',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}>
          <SideMenu onClose={closeMenu} />
        </aside>
      </div>

      {/* 메인 컨텐츠 */}
      <section className="flex-1">{children}</section>
    </div>
  );
}
