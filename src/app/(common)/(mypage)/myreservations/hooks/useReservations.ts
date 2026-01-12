import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  getMyReservationList,
  cancelReservation,
  createReview,
} from '@/api/myreservations';

// Query Key
const QUERY_KEYS = {
  reservations: ['reservations'] as const,
};

// 예약 목록 조회
export function useReservations() {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return useQuery({
    queryKey: QUERY_KEYS.reservations,
    queryFn: () => getMyReservationList(),
    enabled: !!token, // 토큰 있을 때만 호출
    retry: false,
  });
}

// 예약 취소
export function useCancelReservation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: number) => cancelReservation(reservationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.reservations,
      });
    },
  });
}

// 리뷰 작성
export function useSubmitReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reservationId,
      rating,
      content,
    }: {
      reservationId: number;
      rating: number;
      content: string;
    }) => createReview(reservationId, { rating, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.reservations,
      });
    },
  });
}
