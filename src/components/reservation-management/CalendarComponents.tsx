import moment from 'moment';
import Image from 'next/image';
import type {
  ToolbarProps,
  DateHeaderProps,
  HeaderProps,
  DateCellWrapperProps,
  EventProps,
  Event,
  ShowMoreProps,
} from 'react-big-calendar';

import CalendarBadge from '../Badge/CalendarBadge';

import ic_next from '@/assets/icons/activities/ic-calender-next.svg';
import ic_prev from '@/assets/icons/activities/ic-calender-prev.svg';
import { cn } from '@/util/cn';

export const Toolbar = ({ date, onNavigate }: ToolbarProps) => {
  const customLabel = moment(date).format('YYYY년 M월');
  return (
    <div className="flex h-11 justify-end">
      <div className="flex h-full flex-1 items-center justify-center gap-[30px]">
        <button onClick={() => onNavigate('PREV')} className="cursor-pointer">
          <Image src={ic_prev} alt="이전 달" />
        </button>
        <span className="bold text-[20px]">{customLabel}</span>
        <button onClick={() => onNavigate('NEXT')} className="cursor-pointer">
          <Image src={ic_next} alt="다음 달" />
        </button>
      </div>
      <button
        onClick={() => onNavigate('TODAY')}
        className="bold mr-4 cursor-pointer text-[12px] text-gray-600 hover:text-gray-950">
        오늘
      </button>
    </div>
  );
};

export const MyDateHeader = ({ date, isOffRange }: DateHeaderProps) => {
  const day = date.getDate();
  return (
    <div
      className={cn(
        'px-3 pt-[18px] text-center text-[16px] font-normal',
        isOffRange ? 'text-gray-400' : 'text-gray-800'
      )}>
      {day}
    </div>
  );
};

export const MonthHeader = ({ label }: HeaderProps) => {
  return <div className="bold border-0 p-3 text-[16px]">{label}</div>;
};

export const MyDateCellWrapper = ({ children }: DateCellWrapperProps) => {
  return (
    <div className="h-full w-full px-3 pt-[18px] pb-[10px]">{children}</div>
  );
};

export type CalendarEventData = Event & {
  status: 'completed' | 'confirmed' | 'pending';
  count: number;
};

export const CalendarEvent = ({ event }: EventProps<Event>) => {
  const calendarEvent = event as CalendarEventData;

  return (
    <CalendarBadge status={calendarEvent.status} count={calendarEvent.count} />
  );
};

export const ShowMore = ({ events }: ShowMoreProps) => {
  return (
    <button className="text-primary-500 max-h-5 overflow-y-hidden px-3 text-sm">
      +{events.length - 2} more
    </button>
  );
};
