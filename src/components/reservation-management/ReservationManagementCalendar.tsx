'use client';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer, type SlotInfo } from 'react-big-calendar';

import {
  Toolbar,
  MonthHeader,
  MyDateHeader,
  MyDateCellWrapper,
  CalendarEvent,
  ShowMore,
} from './CalendarComponents';
import type { CalendarEventData } from './CalendarComponents';

import { getMonthlyReservations } from '@/api/myActivities';
import type { ReservationDashboardRes } from '@/types/reserved-schedule';
moment.locale('ko');

const localizer = momentLocalizer(moment);

moment.updateLocale('en', {
  weekdaysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
});

interface ReservationManagementCalendarProps {
  activityId: number;
  onSelectSlot: (slotInfo: SlotInfo) => void;
}
export default function ReservationManagementCalendar({
  activityId,
  onSelectSlot,
}: ReservationManagementCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  const currentYear = currentDate ? moment(currentDate).format('YYYY') : '2026';
  const currentMonth = currentDate ? moment(currentDate).format('MM') : '01';

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const { data: MonthlyReservationData } = useQuery({
    queryKey: ['MonthlyReservationData', currentMonth, activityId],
    queryFn: () =>
      getMonthlyReservations(activityId, {
        year: currentYear.toString(),
        month: currentMonth.toString(),
      }),
    enabled: !!activityId,
  });

  if (!currentDate) return null;

  const convertApiToEvent = (apiData: ReservationDashboardRes[]) => {
    return apiData.flatMap((item) => {
      const event: CalendarEventData[] = [];
      const date = new Date(item.date);
      if (item.reservations.completed > 0) {
        event.push({
          title: '',
          start: date,
          end: date,
          status: 'completed',
          count: item.reservations.completed,
        });
      }
      if (item.reservations.confirmed > 0) {
        event.push({
          title: '',
          start: date,
          end: date,
          status: 'confirmed',
          count: item.reservations.confirmed,
        });
      }
      if (item.reservations.pending > 0) {
        event.push({
          title: '',
          start: date,
          end: date,
          status: 'pending',
          count: item.reservations.pending,
        });
      }
      return event;
    });
  };

  const event = MonthlyReservationData
    ? convertApiToEvent(MonthlyReservationData)
    : [];

  return (
    <div className="md:shadow-calendar bg-background h-fit w-full rounded-3xl pt-5 pb-2.5">
      <Calendar<CalendarEventData>
        date={currentDate}
        onNavigate={setCurrentDate}
        formats={{
          weekdayFormat: 'dd',
        }}
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={onSelectSlot}
        selectable={true}
        views={['month']}
        defaultView="month"
        messages={{
          today: '오늘',
          previous: '이전',
          next: '다음',
          month: '월',
          week: '주',
          day: '일',
          agenda: '일정',
        }}
        style={{ height: 'fit-content' }}
        components={{
          toolbar: (props) => (
            <Toolbar
              {...props}
              onClickNextMonth={() => console.log(currentDate)}
              onClickPrevMonth={() => console.log(currentDate)}
            />
          ),
          event: CalendarEvent,
          dateCellWrapper: MyDateCellWrapper,
          showMore: ShowMore,
          month: {
            header: MonthHeader,
            dateHeader: (props) => <MyDateHeader {...props} event={event} />,
          },
        }}
      />
    </div>
  );
}
