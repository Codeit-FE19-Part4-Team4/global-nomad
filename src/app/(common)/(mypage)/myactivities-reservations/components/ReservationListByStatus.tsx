import ReservationListCard from './ReservationListCard';

import type {
  ReservationListResponse,
  ReservationStatusType,
} from '@/types/reserved-schedule';

interface ReservationListByStatusProps {
  activityId: number;
  scheduleId: number;
  status: ReservationStatusType;
  handleReservation: (
    reservationId: number,
    status: ReservationStatusType
  ) => Promise<void>;
  reservationListData: ReservationListResponse;
}

const STATUS_TO_KO = {
  pending: '신청',
  confirmed: '승인',
  declined: '거절',
};

export default function ReservationListByStatus({
  handleReservation,
  status,
  reservationListData,
}: ReservationListByStatusProps) {
  if (!reservationListData) {
    return null;
  }

  const { reservations } = reservationListData;

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
            onConfirm={() => {
              handleReservation(reservation.id, 'confirmed');
            }}
            onDecline={() => {
              handleReservation(reservation.id, 'declined');
            }}
          />
        ))}
      </div>
    </div>
  );
}
