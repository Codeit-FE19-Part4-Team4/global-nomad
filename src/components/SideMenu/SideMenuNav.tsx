import { useRouter } from 'next/navigation';

import SideMenuNavItem from './SideMenuNavItem';

import { MY_PAGE_MENU_ITEMS, LOGOUT_ITEM } from '@/constants/navigation';
import { logout } from '@/util/logout';

export default function SideMenuNav({ onClose }: { onClose?: () => void }) {
  const router = useRouter();
  const handleLogout = () => {
    logout();
    if (typeof window !== 'undefined' && window.Kakao?.Auth) {
      window.Kakao.Auth.logout(() => {
        console.log('카카오 세션 로그아웃 완료');
      });
    }
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
      <SideMenuNavItem
        label={LOGOUT_ITEM.label}
        icon={LOGOUT_ITEM.icon}
        activeIcon={LOGOUT_ITEM.activeIcon}
        onClick={handleLogout}
      />
    </nav>
  );
}
