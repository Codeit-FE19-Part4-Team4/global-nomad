export const RESERVATION_STATUS = {
  pending: '신청',
  confirmed: '승인',
  declined: '거절',
} as const;

export type ReservationStatus =
  (typeof RESERVATION_STATUS)[keyof typeof RESERVATION_STATUS];
