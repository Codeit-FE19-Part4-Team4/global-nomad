'use client';

import { useMemo, useState } from 'react';

import ReservationFilters from './ReservationFilters';

import ReservationCard from '@/components/Card/ReservationCard';
import EmptyState from '@/components/EmptyState';
import { MyReservation, ReservationStatusType } from '@/types/myreservations';

// 필터 타입: 실제 예약 상태 + 전체
type StatusFilter = ReservationStatusType | 'all';

// 전체 예약 목록 (필터링 전 원본 데이터)
interface Props {
  reservationList: MyReservation[];
}

/**
 * 예약 리스트 컴포넌트 (UI 전용)
 *
 * - 예약 상태 필터 제공
 * - 예약 없음 상태 처리
 * - 카드 UI 렌더링만 담당 (모달 / API 로직 없음)
 */
export default function ReservationList({ reservationList }: Props) {
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');

  // 선택된 상태에 따른 예약 목록 필터링 (메모이제이션)
  const filteredReservations = useMemo(() => {
    return selectedStatus === 'all'
      ? reservationList
      : reservationList.filter((r) => r.status === selectedStatus);
  }, [reservationList, selectedStatus]);

  return (
    <>
      {/* 예약 상태 필터 영역 */}
      <ReservationFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* 필터링 결과가 없을 경우 */}
      {filteredReservations.length === 0 ? (
        <EmptyState
          description="아직 예약 내역이 없어요"
          buttonText="체험 둘러보기"
          buttonHref="/"
        />
      ) : (
        /* 예약 목록 영역 */
        <div className="mt-7.5 max-w-160 space-y-6 md:w-full">
          {filteredReservations.map((item) => (
            <div key={item.id} className="space-y-2">
              {/* 모바일 날짜 표시 */}
              <div className="body-lg bold lg:hidden">{item.date}</div>

              {/* 예약 카드 (UI만) */}
              <ReservationCard item={item} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
