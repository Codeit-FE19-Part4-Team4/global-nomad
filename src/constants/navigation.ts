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

//TODO 각 메뉴 href 임시 경로 : 실제 경로 연결 필요
// 일반 메뉴
export const MY_PAGE_MENU_ITEMS = [
  {
    id: 'profile',
    label: '내 정보',
    icon: profileIcon,
    activeIcon: profileActiveIcon,
    href: '/mypage',
  },
  {
    id: 'reservations',
    label: '내 예약내역',
    icon: reservationIcon,
    activeIcon: reservationActiveIcon,
    href: '/myreservations',
  },
  {
    id: 'activity',
    label: '체험 관리',
    icon: activityIcon,
    activeIcon: activityActiveIcon,
    href: '/myactivities',
  },
  {
    id: 'activity-status',
    label: '체험 예약현황',
    icon: activityStatusIcon,
    activeIcon: activityStatusActiveIcon,
    href: '/myactivities-reservations',
  },
] as const;

// 로그아웃
export const LOGOUT_ITEM = {
  id: 'logout',
  label: '로그아웃',
  icon: logoutIcon,
  activeIcon: logoutActiveIcon,
} as const;

// 통합 배열
export const MY_PAGE_NAV_ITEMS = [
  ...MY_PAGE_MENU_ITEMS,
  { ...LOGOUT_ITEM, isLogout: true },
] as const;
