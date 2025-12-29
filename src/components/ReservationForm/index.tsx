'use client';

import { format } from 'date-fns';
import { useEffect } from 'react';
import * as React from 'react';

import Text from '../Text';

import {
  calendar,
  calendarClasses,
  calendarStyle,
  title,
  reservationArea,
  reservationInner,
} from './reservation-style';
import { ReservationFormProps, Schedule } from './reservation-type';
import ReservationFooter from './ReservationFooter';
import ReservationLayout from './ReservationLayout';
import ReservationOption from './ReservationOption';

import { Calendar } from '@/components/ui/calendar';
import useWindowSize from '@/hooks/useWindowSize';
import { cn } from '@/util/cn';

const PC_WIDTH = 1024;

/**
 * 체험 예약현황 화면의 카드 컴포넌트 입니다.
 * : 모바일,태블릿 화면에선 하단 고정영역이 있기때문에 부모div에 하단패딩값(ex:pb-[130px] lg:pb-0) 필요함. 
 *
 * @param schedules 체험가능날짜
 * @param activityPrice 체험 가격
 * 
 * @example
 * <ReservationForm
    schedules={API_DATA.schedules}
    activityPrice={API_DATA.price}
  />
 */
export default function ReservationForm({
  schedules,
  activityPrice,
}: ReservationFormProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [count, setCount] = React.useState<number>(0);
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = React.useState<Schedule[]>([]);
  const [selectedTime, setSelectedTime] = React.useState<string>('');
  const [scheduleId, setScheduleId] = React.useState<number | undefined>(
    undefined
  );
  const availableDates = React.useMemo(
    () => schedules.map((schedule) => new Date(schedule.date)),
    [schedules]
  );
  const isReservation = React.useMemo(
    () => count !== 0 && !!scheduleId,
    [count, scheduleId]
  );
  const [isScheduleVisible, setIsScheduleVisible] =
    React.useState<boolean>(false);
  const width = useWindowSize();

  // POST /reservations 요청 payload
  const reservationData = {
    scheduleId,
    headCount: count,
  };
  // POST /reservations
  const handleReservation = () => {};

  // 달력 날짜 선택
  const handleSelectDate = (selectedDate?: Date) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
    const selectedSchedule = schedules.filter((item) => {
      return item.date === selectedDateString;
    });
    setSelectedDate(selectedSchedule);
    setScheduleId(undefined);
    setSelectedTime('');
  };

  // 해상도 1024 이하일때 배경 스크롤 제어
  useEffect(() => {
    if (width === undefined) return;
    const isMobile = width < PC_WIDTH;
    if (isMobile) {
      if (!isScheduleVisible) {
        document.body.classList.remove('modal-open');
        return;
      }
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [width, isScheduleVisible]);
  if (width === undefined) return null;
  return (
    <ReservationLayout isScheduleVisible={isScheduleVisible}>
      <div
        className={cn(
          reservationInner,
          !date && 'hidden',
          isScheduleVisible ? 'block' : 'hidden'
        )}>
        <Text
          size="body-lg"
          as="h3"
          className={cn(title, scheduleId !== undefined && 'hidden md:block')}>
          날짜
        </Text>
        <div className={cn(reservationArea)}>
          {/* 캘린더 */}
          <div className={cn(scheduleId !== undefined && 'hidden md:block')}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelectDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              disabled={(day) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const isPast = day < today;
                const isSameMonth =
                  day.getMonth() === currentMonth.getMonth() &&
                  day.getFullYear() === currentMonth.getFullYear();
                const isAvailable = availableDates.some(
                  (available) => available.toDateString() === day.toDateString()
                );
                return !isSameMonth || !isAvailable || isPast;
              }}
              modifiers={{
                available: availableDates,
              }}
              modifiersClassNames={{
                available:
                  'bg-primary-100 text-primary-500 rounded-[50%] [&>button]:cursor-pointer',
                disabled: 'opacity-100',
              }}
              className={cn(calendar)}
              buttonVariant="ghost"
              typeVariant="page"
              classNames={calendarClasses}
              style={calendarStyle}
            />
          </div>

          {/* 예약가능한 시간 & 인원 */}
          <ReservationOption
            setCount={setCount}
            count={count}
            date={date}
            selectedDate={selectedDate}
            scheduleId={scheduleId}
            setScheduleId={setScheduleId}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
      </div>

      {/* 총합계 & 예약하기 */}
      <ReservationFooter
        disabled={!isReservation}
        onClick={handleReservation}
        date={date}
        activityPrice={activityPrice}
        count={count}
        scheduleId={scheduleId}
        setScheduleId={setScheduleId}
        isScheduleVisible={isScheduleVisible}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        setIsScheduleVisible={setIsScheduleVisible}
        setDate={setDate}
        setCount={setCount}
      />
    </ReservationLayout>
  );
}
