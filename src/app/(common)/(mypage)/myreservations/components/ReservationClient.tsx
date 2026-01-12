'use client';

import { useReservations } from '../hooks/useReservations';

import ReservationErrorState from './ReservationErrorState';
import ReservationList from './ReservationList';
import ReservationLoadingState from './ReservationLoadingState';

/**
 * 예약 목록 페이지의 데이터 흐름을 담당하는 컴포넌트입니다.
 *
 * - 서버에서 예약 목록을 조회합니다.
 * - 로딩/에러/성공 상태에 따라 각각의 UI를 렌더링합니다.
 * - 성공 시 ReservationList 컴포넌트에 데이터만 전달합니다.
 */
export default function ReservationClient() {
  const { data, isLoading, isError, refetch } = useReservations();

  if (isLoading) {
    return <ReservationLoadingState />;
  }

  if (isError) {
    return <ReservationErrorState onRetry={refetch} />;
  }

  return <ReservationList reservationList={data ?? []} />;
}
