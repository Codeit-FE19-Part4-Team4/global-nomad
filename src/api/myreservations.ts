// api/myreservations.ts
import { apiFetch } from '@/config/client';
import {
  RequestGetMyReservations,
  ResponseGetMyReservations,
  RequestCreateReview,
  CreatedReview,
  MyReservation,
} from '@/types/myreservations';

// 예약 목록 조회
export async function getMyReservations(
  params?: Omit<RequestGetMyReservations, 'teamId'>
): Promise<ResponseGetMyReservations> {
  return apiFetch<ResponseGetMyReservations>('/my-reservations', {
    params,
  });
}

// React Query 전용 리스트
export async function getMyReservationList(
  params?: Omit<RequestGetMyReservations, 'teamId'>
): Promise<MyReservation[]> {
  const res = await getMyReservations(params);
  return res.reservations;
}

// 예약 취소
export async function cancelReservation(reservationId: number): Promise<void> {
  return apiFetch(`/my-reservations/${reservationId}`, {
    method: 'PATCH',
  });
}

// 리뷰 작성
export async function createReview(
  reservationId: number,
  body: Omit<RequestCreateReview, 'teamId' | 'reservationId'>
): Promise<CreatedReview> {
  return apiFetch<CreatedReview>(`/my-reservations/${reservationId}/reviews`, {
    method: 'POST',
    body,
  });
}
