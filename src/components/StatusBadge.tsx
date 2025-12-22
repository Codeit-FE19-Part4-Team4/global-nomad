/**
 * 예약 상태를 표시하는 단일 StatusBadge 컴포넌트
 *
 * @example
 * <StatusBadge status="pending" /> 👉🏻 기본 상태
 * <StatusBadge status={reservation.status} /> 👉🏻 서버에서 받은 상태 값
 */

import {
  STATUS_BADGE_LABEL,
  StatusBadgeStatus,
} from '@/constants/status-badge';
import { statusBadgeStyle } from '@/styles/cva/status-badge.cva';

interface StatusBadgeProps {
  status: StatusBadgeStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={statusBadgeStyle({ status })}>
      {STATUS_BADGE_LABEL[status]}
    </span>
  );
}
