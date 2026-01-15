import { useQuery } from '@tanstack/react-query';

import ReservationListCard from './ReservationListCard';

import { getReservationBySchedule } from '@/api/myActivities';
import type { ReservationStatusType } from '@/types/reserved-schedule';

interface ReservationListByStatusProps {
  activityId: number;
  scheduleId: number;
  status: ReservationStatusType;
}

const STATUS_TO_KO = {
  pending: '신청',
  confirmed: '승인',
  declined: '거절',
};

export default function ReservationListByStatus({
  activityId,
  scheduleId,
  status,
}: ReservationListByStatusProps) {
  const params = {
    scheduleId,
    status,
  };
  const { data: ReservationListData } = useQuery({
    queryKey: ['ReservationListByStatus', scheduleId, status],
    queryFn: () => getReservationBySchedule(activityId, params),
    enabled: scheduleId !== undefined,
  });

  if (!ReservationListData) {
    return null;
  }

  const { reservations } = ReservationListData;

  if (reservations.length === 0) {
    return (
      <div className="flex h-67 items-center justify-center">
        <span className="text-[18px] font-medium">
          {STATUS_TO_KO[status]} 내역이 존재하지 않습니다
        </span>
      </div>
    );
  }

  return (
    <div className="scrollbar-hidden flex h-67 flex-col gap-2.5 overflow-scroll">
      <span className="bold text-[18px] text-gray-950">예약 내역</span>
      <div className="flex flex-col gap-3.5">
        {reservations.map((reservation) => (
          <ReservationListCard
            status={status}
            key={reservation.id}
            data={reservation}
            onConfirm={() => console.log('confirm')}
            onDecline={() => console.log('decline')}
          />
        ))}
      </div>
    </div>
  );
}
