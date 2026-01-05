'use client';

import Image from 'next/image';

import { useMenu } from '../context/MenuContext';

import menuIcon from '@/assets/icons/sidemenu/ic-menu.svg';

type PageHeaderProps = {
  title: string;
  description?: string;
};

export default function PageHeader({ title, description }: PageHeaderProps) {
  const { openMenu } = useMenu();
  return (
    <div className="mb-6 flex items-center gap-[10px] border-b border-gray-100 pb-4">
      <button
        onClick={openMenu}
        className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-gray-100 md:hidden"
        aria-label="사이드 메뉴 열기">
        <Image src={menuIcon} alt="메뉴 열기" width={24} height={24} />
      </button>
      {/* 타이틀 영역 */}
      <div>
        <h1 className="text-[20px] font-bold text-gray-950">{title}</h1>

        {description && (
          <p className="mt-1 text-[14px] text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
}
