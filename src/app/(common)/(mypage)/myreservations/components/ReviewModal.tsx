'use client';

import { useMemo, useState } from 'react';

import ReservationFilters from './ReservationFilters';

import ReservationCard from '@/components/Card/ReservationCard';
import EmptyState from '@/components/EmptyState';
import { MyReservation, ReservationStatusType } from '@/types/myreservations';

// UI 필터 상태 타입 (API 상태 + 전체)
type StatusFilter = ReservationStatusType | 'all';

// 예약 목록 props (필터링 전 원본 데이터)
interface Props {
  reservationList: MyReservation[];
}

/**
 * 예약 리스트 컴포넌트 (UI 전용)
 *
 * 역할:
 * - 예약 상태 필터 UI 제공
 * - 필터링된 예약 목록 렌더링
 * - 예약이 없을 경우 Empty State 표시
 *
 * 책임 범위:
 * - UI 렌더링만 담당
 * - 모달 제어, API 호출, 데이터 패칭 로직은 상위 컴포넌트에서 처리
 */
export default function ReservationList({ reservationList }: Props) {
  // 선택된 예약 상태 (UI 필터 상태)
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');

  // 선택된 상태에 따라 예약 목록 필터링 (메모이제이션)
  const filteredReservations = useMemo(
    () =>
      selectedStatus === 'all'
        ? reservationList
        : reservationList.filter((r) => r.status === selectedStatus),
    [reservationList, selectedStatus]
  );

  const isEmpty = filteredReservations.length === 0;

  return (
    <>
      {/* 예약 상태 필터 UI */}
      <ReservationFilters
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {/* 필터링 결과가 없을 경우 Empty State 표시 */}
      {isEmpty ? (
        <EmptyState
          description="아직 예약 내역이 없어요"
          buttonText="체험 둘러보기"
          buttonHref="/"
        />
      ) : (
        /* 예약 카드 리스트 영역 */
        <div className="mt-7.5 max-w-160 space-y-6 md:w-full">
          {filteredReservations.map((item) => (
            <div key={item.id} className="space-y-2">
              {/* 모바일 전용 날짜 표시 */}
              <div className="body-lg bold lg:hidden">{item.date}</div>

              {/* 예약 카드 (UI 컴포넌트) */}
              <ReservationCard item={item} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
