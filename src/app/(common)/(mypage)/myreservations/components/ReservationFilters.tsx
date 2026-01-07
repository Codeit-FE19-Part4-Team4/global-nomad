'use client';

import Filter from '@/components/Filter/Filter';
import {
  RESERVATION_UI_FILTER_ORDER,
  RESERVATION_UI_STATUS_LABEL,
} from '@/constants/reservation-ui-status';
import { ReservationStatusType } from '@/types/myreservations';

// 필터 타입: 개별 상태 or 'all' (전체)
type StatusFilter = ReservationStatusType | 'all';

// Props 타입 정의
interface Props {
  selectedStatus: StatusFilter; // 현재 선택된 상태
  onStatusChange: (status: StatusFilter) => void; // 상태 변경 함수
}

/**
 * 예약 필터 버튼 컴포넌트
 *
 * - '전체' + 각 상태별 필터 버튼을 렌더링
 * - 버튼 클릭 시 부모 컴포넌트에 상태 변경 알림
 */
export default function ReservationFilters({
  selectedStatus,
  onStatusChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* '전체' 필터 버튼 */}
      <Filter
        selected={selectedStatus === 'all'}
        onClick={() => onStatusChange('all')}>
        전체
      </Filter>

      {/* 상태별 필터 버튼들 */}
      {RESERVATION_UI_FILTER_ORDER.map((status) => (
        <Filter
          key={status}
          selected={selectedStatus === status}
          onClick={() => onStatusChange(status)}>
          {/* 한글 라벨 표시 */}
          {RESERVATION_UI_STATUS_LABEL[status]}
        </Filter>
      ))}
    </div>
  );
}
