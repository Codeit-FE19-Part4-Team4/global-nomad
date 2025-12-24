import SidebarNavItem from './SidebarNavItem';

import { MY_PAGE_NAV_ITEMS } from '@/app/mypage/constants/navigation';

export default function SidebarNav() {
  return (
    <nav className="flex flex-col gap-2">
      {MY_PAGE_NAV_ITEMS.map((item) => (
        <SidebarNavItem
          key={item.href}
          label={item.label}
          icon={item.icon}
          activeIcon={item.activeIcon}
          href={item.href}
        />
      ))}
    </nav>
  );
}
