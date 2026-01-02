import SideMenuNavItem from './SideMenuNavItem';

import { MY_PAGE_MENU_ITEMS, LOGOUT_ITEM } from '@/constants/navigation';

export default function SideMenuNav({ onClose }: { onClose?: () => void }) {
  const handleLogout = () => {
    // TODO: 로그아웃 처리
    console.log('logout');
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
      {/* 로그아웃 */}
      <SideMenuNavItem
        key={LOGOUT_ITEM.id}
        label={LOGOUT_ITEM.label}
        icon={LOGOUT_ITEM.icon}
        activeIcon={LOGOUT_ITEM.activeIcon}
        href={LOGOUT_ITEM.href}
        onClick={handleLogout}
      />
    </nav>
  );
}
