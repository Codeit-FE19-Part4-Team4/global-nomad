import {
  reservationBox,
  reservationBoxHide,
  reservationDimmed,
  reservationWrap,
} from './reservation-style';
import { ReservationLayoutProps } from './reservation-type';

import { cn } from '@/util/cn';

export default function ReservationLayout({
  children,
  isScheduleVisible,

  date,
}: ReservationLayoutProps) {
  return (
    <div className={cn(reservationWrap)}>
      <div className={cn(reservationDimmed)}></div>
      <div
        className={cn(
          reservationBox,
          !date && !isScheduleVisible && reservationBoxHide,
          !isScheduleVisible && reservationBoxHide
        )}>
        {children}
      </div>
    </div>
  );
}
