'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { useProfileImageContext } from '../mypage/context/ProfileImageContext';

import { useGetMyInfo } from '@/app/(common)/(mypage)/mypage/hooks/useUser';
import closeIcon from '@/assets/icons/sidemenu/ic-close.svg';
import EditableProfile from '@/components/ProfileEditable';
import SideMenuNav from '@/components/SideMenu/SideMenuNav';

export default function SideMenu({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { data: userData } = useGetMyInfo();
  const { handleImageChange } = useProfileImageContext();

  const isMyInfoPage = pathname === '/mypage';

  return (
    <aside className="w-full flex-none rounded-lg bg-white px-3.5 py-4 md:w-45 md:border md:border-gray-100 md:py-6 md:shadow-[3px_3px_20px_3px_#eee] lg:w-72.5">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="사이드 메뉴 닫기"
          className="absolute top-6 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 md:hidden">
          <Image src={closeIcon} alt="닫기" width={24} height={24} />
        </button>
      )}
      <div className="flex flex-col items-center pb-4 md:pb-6">
        <EditableProfile
          src={userData?.profileImageUrl}
          onImageChange={handleImageChange}
          editable={isMyInfoPage}
        />
      </div>
      <SideMenuNav onClose={onClose} />
    </aside>
  );
}
