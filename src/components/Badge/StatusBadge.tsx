import { statusBadgeStyle } from './status-badge.cva';

import {
  RESERVATION_STATUS_LABEL,
  StatusBadgeStatus,
} from '@/constants/reservation-status';

interface StatusBadgeProps {
  status: StatusBadgeStatus;
}

/**
 * 예약 상태를 표시하는 단일 StatusBadge 컴포넌트
 *
 * @example
 * <StatusBadge status="pending" /> 👉🏻 기본 상태
 * <StatusBadge status={reservation.status} /> 👉🏻 서버에서 받은 상태 값
 */
export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={statusBadgeStyle({ status })}>
      {RESERVATION_STATUS_LABEL[status]}
    </span>
  );
}
