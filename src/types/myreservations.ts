/** ======================
 * Request Types
 ======================= */

export type ReservationStatusType =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'declined'
  | 'canceled';

/**
 * 내 예약 리스트 조회
 * GET /{teamId}/my-reservations
 */
export interface RequestGetMyReservations {
  teamId: string;
  cursorId?: number;
  size?: number;
  status?: ReservationStatusType;
}

/**
 * 내 예약 리뷰 작성
 * POST /{teamId}/my-reservations/{reservationId}/reviews
 */
export interface RequestCreateReview {
  teamId: string;
  reservationId: number;
  rating: number;
  content: string;
}

/** ======================
 * Response Types
 ======================= */

/**
 * 예약에 포함된 체험 정보
 */
export type ReservationActivity = {
  id: number;
  title: string;
  bannerImageUrl: string;
};

/**
 * 내 예약 아이템
 */
export type MyReservation = {
  id: number;
  teamId: string;
  userId: number;
  activity: ReservationActivity;
  scheduleId: number;
  status: ReservationStatusType;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * 내 예약 리스트 조회 응답
 */
export interface ResponseGetMyReservations {
  cursorId: number;
  reservations: MyReservation[];
  totalCount: number;
}

/**
 * 리뷰 작성 응답
 */
export type CreatedReview = {
  id: number;
  teamId: string;
  activityId: number;
  userId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};
