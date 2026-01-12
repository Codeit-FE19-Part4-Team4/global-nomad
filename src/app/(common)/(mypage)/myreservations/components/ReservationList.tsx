'use client';

import { useMemo, useState } from 'react';

import { useCancelModal } from '../hooks/useCancelModal';
import { useReviewModal } from '../hooks/useReviewModal';

import ReservationFilters from './ReservationFilters';

import ReservationCard from '@/components/Card/ReservationCard';
import EmptyState from '@/components/EmptyState';
import { MyReservation, ReservationStatusType } from '@/types/myreservations';

// 필터 타입: 실제 예약 상태 + 전체
type StatusFilter = ReservationStatusType | 'all';

// 화면 상태 타입 상수화
type ViewState = 'TOTAL_EMPTY' | 'FILTER_EMPTY' | 'HAS_DATA';

interface Props {
  reservationList: MyReservation[];
}

/**
 * 예약 리스트 컴포넌트 (UI 전용)
 *
 * - 예약 상태 필터 제공
 * - 예약 없음 상태 처리
 */
export default function ReservationList({ reservationList }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');

  const { openReviewModal } = useReviewModal();
  const { openCancelModal } = useCancelModal();

  /** 전체 예약 자체가 없는지 */
  const isTotalEmpty = reservationList.length === 0;

  /** 상태 필터링 */
  const filteredReservations = useMemo(() => {
    return selectedStatus === 'all'
      ? reservationList
      : reservationList.filter((r) => r.status === selectedStatus);
  }, [reservationList, selectedStatus]);

  const isEmpty = filteredReservations.length === 0;

  /** 화면 상태 결정 */
  const viewState: ViewState = isTotalEmpty
    ? 'TOTAL_EMPTY'
    : isEmpty
      ? 'FILTER_EMPTY'
      : 'HAS_DATA';

  // 리뷰 작성 핸들러
  const handleReviewSubmit = (reservationId: number) => {
    const reservation = filteredReservations.find(
      (r) => r.id === reservationId
    );
    if (!reservation) return;

    openReviewModal(reservation);
  };

  // 예약 취소 핸들러
  const handleReserveCancel = (reservationId: number) => {
    const reservation = filteredReservations.find(
      (r) => r.id === reservationId
    );
    if (!reservation) return;

    openCancelModal(reservationId);
  };

  return (
    <>
      {/* 예약이 있을 때만 필터 노출 */}
      {!isTotalEmpty && (
        <ReservationFilters
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />
      )}

      {/* 전체 예약 없음 */}
      {viewState === 'TOTAL_EMPTY' && (
        <EmptyState
          description="아직 예약 내역이 없어요"
          buttonText="체험 둘러보기"
          buttonHref="/"
        />
      )}

      {/* 필터 결과만 없음 */}
      {viewState === 'FILTER_EMPTY' && (
        <EmptyState description="선택한 조건에 맞는 예약이 없어요" />
      )}

      {/* 예약 목록 */}
      {viewState === 'HAS_DATA' && (
        <div className="mt-7.5 max-w-160 space-y-6 md:w-full">
          {filteredReservations.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="body-lg bold lg:hidden">{item.date}</div>

              <ReservationCard
                item={item}
                onReviewSubmit={handleReviewSubmit}
                onReserveCancel={handleReserveCancel}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
