import StatusBadge from '@/components/Badge/StatusBadge';
import Button from '@/components/Button';
import type {
  Reservation,
  ReservationStatusType,
} from '@/types/reserved-schedule';
import { cn } from '@/util/cn';

interface ReservationListCardProps {
  status: ReservationStatusType;
  data: Reservation;
  onConfirm?: () => void;
  onDecline?: () => void;
}

const BUTTON_STYLE = 'h-[29px] w-[68px]';
const ROW_STYLE = 'flex flex-col gap-2.5';
const TITLE_STYLE = 'text-gray-500 text-[16px] bold';
const CONTENT_STYLE = 'text-gray-950 text-[16px] font-medium';

export default function ReservationListCard({
  status,
  data,
  onConfirm,
  onDecline,
}: ReservationListCardProps) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl border border-gray-100 px-4 py-3.5">
      <div className={ROW_STYLE}>
        <span className={TITLE_STYLE}>닉네임</span>
        <span className={TITLE_STYLE}>인원</span>
      </div>
      <div className={cn(ROW_STYLE, 'flex-1')}>
        <span className={CONTENT_STYLE}>{data.nickname}</span>
        <span className={CONTENT_STYLE}>{data.headCount}명</span>
      </div>
      <div className={ROW_STYLE}>
        {status === 'pending' ? (
          <>
            <Button
              size="xs"
              variant="secondary"
              onClick={onConfirm}
              className={BUTTON_STYLE}>
              승인하기
            </Button>
            <Button
              size="xs"
              variant="tertiary"
              onClick={onDecline}
              className={BUTTON_STYLE}>
              거절하기
            </Button>
          </>
        ) : (
          <StatusBadge status={status} />
        )}
      </div>
    </div>
  );
}
