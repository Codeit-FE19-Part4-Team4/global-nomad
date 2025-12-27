import { CALENDAR_BADGE_LABEL, CalendarBadgeStatus } from './calendar-badge';
import { CalendarBadgeStyle } from './calendar-badge.cva';

interface CalendarBadgeProps {
  status: CalendarBadgeStatus;
  count: number;
}

/**
 * 내 체험 월별 예약 상태를 표시하는 CalendarBadge 컴포넌트
 * 예약 상태(status)와 해당 상태의 개수(count)를 함께 표시합니다.
 *
 * @example
 * <CalendarBadge status="pending" count={2} /> 👉🏻 예약 2
 * <CalendarBadge status="completed" count={3} /> 👉🏻 완료 3
 * <CalendarBadge status="confirmed" count={1} /> 👉🏻 승인 1
 */
export default function CalendarBadge({ status, count }: CalendarBadgeProps) {
  return (
    <span className={CalendarBadgeStyle({ status })}>
      {CALENDAR_BADGE_LABEL[status]} {count}
    </span>
  );
}
