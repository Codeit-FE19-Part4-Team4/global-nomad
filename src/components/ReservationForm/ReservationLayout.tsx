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
}: ReservationLayoutProps) {
  return (
    <div className={cn(reservationWrap)}>
      {isScheduleVisible && <div className={cn(reservationDimmed)}></div>}
      <div
        className={cn(
          reservationBox,
          !isScheduleVisible && reservationBoxHide
        )}>
        {children}
      </div>
    </div>
  );
}
