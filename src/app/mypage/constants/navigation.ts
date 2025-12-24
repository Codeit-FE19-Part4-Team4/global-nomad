import activityStatusActiveIcon from '@/assets/icons/sidemenu/ic-calendar-active.svg';
import activityStatusIcon from '@/assets/icons/sidemenu/ic-calendar.svg';
import reservationActiveIcon from '@/assets/icons/sidemenu/ic-list-active.svg';
import reservationIcon from '@/assets/icons/sidemenu/ic-list.svg';
import logoutActiveIcon from '@/assets/icons/sidemenu/ic-logout-active.svg';
import logoutIcon from '@/assets/icons/sidemenu/ic-logout.svg';
import activityActiveIcon from '@/assets/icons/sidemenu/ic-setting-active.svg';
import activityIcon from '@/assets/icons/sidemenu/ic-setting.svg';
import profileActiveIcon from '@/assets/icons/sidemenu/ic-user-active.svg';
import profileIcon from '@/assets/icons/sidemenu/ic-user.svg';

//TODO 각 메뉴 href 경로 연결
export const MY_PAGE_NAV_ITEMS = [
  {
    label: '내 정보',
    icon: profileIcon,
    activeIcon: profileActiveIcon,
    href: '내 정보',
  },
  {
    label: '내 예약내역',
    icon: reservationIcon,
    activeIcon: reservationActiveIcon,
    href: '내 예약내역',
  },
  {
    label: '체험 관리',
    icon: activityIcon,
    activeIcon: activityActiveIcon,
    href: '체험 관리',
  },
  {
    label: '체험 예약현황',
    icon: activityStatusIcon,
    activeIcon: activityStatusActiveIcon,
    href: '체험 예약현황',
  },
  {
    label: '로그아웃',
    icon: logoutIcon,
    activeIcon: logoutActiveIcon,
    href: '/logout',
    isLogout: true, // 로그아웃 플래그
  },
] as const;
