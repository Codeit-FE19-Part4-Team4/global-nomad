'use client';

import { useRef } from 'react';

import { useReservations } from '../hooks/useReservations';

import ReservationErrorState from './ReservationErrorState';
import ReservationList from './ReservationList';
import ReservationLoadingState from './ReservationLoadingState';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

/**
 * 예약 목록 페이지의 데이터 흐름을 담당하는 컴포넌트입니다.
 *
 * - 서버에서 예약 목록을 조회합니다.
 * - 로딩/에러/성공 상태에 따라 각각의 UI를 렌더링합니다.
 * - 성공 시 ReservationList 컴포넌트에 데이터만 전달합니다.
 */
export default function ReservationClient() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useReservations();

  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  useInfiniteScroll({
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (isLoading) {
    return <ReservationLoadingState />;
  }

  if (isError) {
    return <ReservationErrorState onRetry={refetch} />;
  }

  return (
    <>
      <ReservationList reservationList={data?.reservations ?? []} />

      <div ref={loadMoreRef} className="py-10">
        {isFetchingNextPage && <ReservationLoadingState count={2} />}
      </div>
    </>
  );
}
