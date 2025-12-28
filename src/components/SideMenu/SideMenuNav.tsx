import { MY_PAGE_NAV_ITEMS } from './navigation';
import SideMenuNavItem from './SideMenuNavItem';

export default function SideMenuNav() {
  return (
    <nav className="flex flex-col gap-2">
      {MY_PAGE_NAV_ITEMS.map((item) => (
        <SideMenuNavItem
          key={item.href}
          label={item.label}
          icon={item.icon}
          activeIcon={item.activeIcon}
          href={item.href}
          onClick={
            'isLogout' in item && item.isLogout
              ? () => {
                  /* TODO: 로그아웃 처리 */
                }
              : undefined
          }
        />
      ))}
    </nav>
  );
}
