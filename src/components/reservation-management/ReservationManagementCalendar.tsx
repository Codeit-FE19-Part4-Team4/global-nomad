'use client';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import {
  Toolbar,
  MonthHeader,
  MyDateHeader,
  MyDateCellWrapper,
  CalendarEvent,
  ShowMore,
} from './CalendarComponents';
import type { CalendarEventData } from './CalendarComponents';
moment.locale('ko');

const localizer = momentLocalizer(moment);

moment.updateLocale('en', {
  weekdaysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
});

//TODO: 이벤트(내 체험 월별 예약 조회) api 가져오기
export const mockEvents: CalendarEventData[] = [
  {
    title: '완료 1',
    start: new Date(2026, 0, 9),
    end: new Date(2026, 0, 9),
    allDay: true,
    status: 'completed',
    count: 1,
  },
  {
    title: '대기 1',
    start: new Date(2026, 0, 9),
    end: new Date(2026, 0, 9),
    allDay: true,
    status: 'pending',
    count: 1,
  },
  {
    title: '완료 2',
    start: new Date(2026, 0, 12),
    end: new Date(2026, 0, 12),
    allDay: true,
    status: 'completed',
    count: 2,
  },
  {
    title: '확정 1',
    start: new Date(2026, 0, 15),
    end: new Date(2026, 0, 15),
    allDay: true,
    status: 'confirmed',
    count: 1,
  },
  {
    title: '대기 2',
    start: new Date(2026, 0, 15),
    end: new Date(2026, 0, 15),
    allDay: true,
    status: 'pending',
    count: 2,
  },
  {
    title: '대기 2',
    start: new Date(2026, 0, 15),
    end: new Date(2026, 0, 15),
    allDay: true,
    status: 'pending',
    count: 2,
  },
  {
    title: '대기 2',
    start: new Date(2026, 0, 15),
    end: new Date(2026, 0, 15),
    allDay: true,
    status: 'pending',
    count: 2,
  },
  {
    title: '대기 2',
    start: new Date(2026, 0, 15),
    end: new Date(2026, 0, 15),
    allDay: true,
    status: 'pending',
    count: 2,
  },
  {
    title: '대기 2',
    start: new Date(2026, 0, 15),
    end: new Date(2026, 0, 15),
    allDay: true,
    status: 'pending',
    count: 2,
  },
];

export default function ReservationManagementCalendar() {
  //TODO: 이벤트 클릭시 팝업
  const handleSelectEvent = (event: any) => {
    console.log('클릭한 이벤트:', event);
    alert(`이벤트: ${event.title}`);
  };

  //TODO: 날짜 클릭시 팝업
  const handleSelectSlot = (slotInfo: any) => {
    console.log('클릭한 날짜:', slotInfo);
    alert(`날짜 클릭: ${moment(slotInfo.start).format('YYYY-MM-DD')}`);
  };
  return (
    <div className="shadow-calendar bg-background h-fit w-full rounded-3xl pt-5 pb-2.5">
      <Calendar
        formats={{
          weekdayFormat: 'dd',
        }}
        localizer={localizer}
        events={mockEvents}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
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
          toolbar: Toolbar,
          event: CalendarEvent,
          dateCellWrapper: MyDateCellWrapper,
          showMore: ShowMore,
          month: {
            header: MonthHeader,
            dateHeader: MyDateHeader,
          },
        }}
      />
    </div>
  );
}
