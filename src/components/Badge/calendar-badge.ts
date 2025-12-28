/**
 * CalendarBadge 라벨 상수
 * 내 체험 월별 예약 상태별 표시 텍스트를 관리합니다.
 */

export const CALENDAR_BADGE_LABEL = {
  pending: '예약',
  completed: '완료',
  confirmed: '승인',
} as const;

export type CalendarBadgeStatus = keyof typeof CALENDAR_BADGE_LABEL;
