import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  getMyReservationList,
  cancelReservation,
  createReview,
  MyReservation,
} from '@/api/myreservations';

// Query Key
const QUERY_KEYS = {
  reservations: ['reservations'] as const,
};

// 예약 목록 조회 (무한 스크롤)
export function useReservations() {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.reservations,
    queryFn: ({ pageParam }) =>
      getMyReservationList({
        cursorId: pageParam,
        size: 10,
      }),
    enabled: !!token,
    retry: false,
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId ?? undefined;
    },
    select: (data) => {
      const allReservations = data.pages.flatMap(
        (page) => page.reservations
      ) as MyReservation[];

      return {
        reservations: allReservations,
        totalCount: data.pages[0]?.totalCount ?? 0,
      };
    },
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
