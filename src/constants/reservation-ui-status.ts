export const RESERVATION_UI_STATUS = {
  pending: 'pending',
  confirmed: 'confirmed',
  completed: 'completed',
  declined: 'declined',
  canceled: 'canceled',
} as const;

export type ReservationUIStatus = keyof typeof RESERVATION_UI_STATUS;

/** 상태별 라벨 */
export const RESERVATION_UI_STATUS_LABEL: Record<ReservationUIStatus, string> =
  {
    pending: '예약완료',
    confirmed: '예약승인',
    completed: '체험완료',
    declined: '예약거절',
    canceled: '예약취소',
  };

/** 필터 탭 노출 순서 */
export const RESERVATION_UI_FILTER_ORDER: ReservationUIStatus[] = [
  'pending',
  'confirmed',
  'completed',
  'declined',
  'canceled',
];
