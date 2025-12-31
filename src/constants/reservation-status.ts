export const RESERVATION_STATUS = {
  pending: '신청',
  confirmed: '승인',
  declined: '거절',
} as const;

// 뱃지 + 필터용
export const RESERVATION_STATUS_LABEL = {
  pending: '예약완료',
  confirmed: '예약승인',
  completed: '체험완료',
  declined: '예약거절',
  canceled: '예약취소',
} as const;

export type ReservationStatus =
  (typeof RESERVATION_STATUS)[keyof typeof RESERVATION_STATUS];

// 뱃지 + 필터용 타입
export type StatusBadgeStatus = keyof typeof RESERVATION_STATUS_LABEL;
