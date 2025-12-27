/**
 * StatusBadge 라벨 상수
 * 예약 상태별 표시 텍스트를 관리합니다.
 */

export const STATUS_BADGE_LABEL = {
  pending: '예약완료',
  confirmed: '예약승인',
  completed: '체험완료',
  declined: '예약거절',
  canceled: '예약취소',
} as const;

/** 예약 상태 타입 */
export type StatusBadgeStatus = keyof typeof STATUS_BADGE_LABEL;
