import { useRouter } from 'next/navigation';

import SideMenuNavItem from './SideMenuNavItem';

import { MY_PAGE_MENU_ITEMS, LOGOUT_ITEM } from '@/constants/navigation';
import { logout } from '@/util/logout';

export default function SideMenuNav({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  return (
    <nav className="flex flex-col gap-2">
      {MY_PAGE_MENU_ITEMS.map((item) => (
        <SideMenuNavItem
          key={item.href}
          label={item.label}
          icon={item.icon}
          activeIcon={item.activeIcon}
          href={item.href}
          onClick={onClose}
        />
      ))}
      {/* 로그아웃 버튼 */}
      <button
        key={LOGOUT_ITEM.id}
        onClick={handleLogout}
        className="group hover:bg-primary-100 flex items-center gap-2 rounded-lg px-4 py-3 text-gray-600">
        <div className="relative h-6 w-6">
          <img src={LOGOUT_ITEM.icon.src} alt="" className="object-contain" />
        </div>
        <span className="text-[16px]">{LOGOUT_ITEM.label}</span>
      </button>
    </nav>
  );
}
