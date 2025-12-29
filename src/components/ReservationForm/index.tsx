'use client';

import { useEffect, useRef } from 'react';
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
import { PC_WIDTH, ReservationFormProps, Schedule } from './reservation-type';
import ReservationFooter from './ReservationFooter';
import ReservationLayout from './ReservationLayout';
import ReservationOption from './ReservationOption';

import { Calendar } from '@/components/ui/calendar';
import useWindowSize from '@/hooks/useWindowSize';
import { cn } from '@/util/cn';

/**
 * 체험 예약현황 화면의 카드 컴포넌트 입니다.
 *
 * @param availableDates 체험가능날짜 배열
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
  const availableDates = schedules.map((schedule) => new Date(schedule.date)); //이용 가능한 날짜
  const isReservation = count !== 0 && !!scheduleId;
  const [isScheduleVisible, setIsScheduleVisible] =
    React.useState<boolean>(false); // 날짜+인원+시간 영역 노출컨트롤
  const [toggleMobile, setToggleMobile] = React.useState<boolean>(false);

  // POST /reservations 요청 payload
  const reservationData = {
    scheduleId,
    headCount: count,
  };

  // 달력 날짜 선택
  const handleSelectDate = (selectedDate?: Date) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    const selectedDateString = selectedDate.toLocaleDateString('sv-SE');
    const selectedSchedule = schedules.filter((item) => {
      return item.date === selectedDateString;
    });
    setSelectedDate(selectedSchedule);
    setScheduleId(undefined);
  };

  // 해상도 1024 이하일때 배경 스크롤 제어
  const width = useWindowSize();
  const prevWidthRef = useRef(width);
  useEffect(() => {
    if (prevWidthRef.current === 0) {
      document.body.classList.toggle('modal-open', width < PC_WIDTH);
      prevWidthRef.current = width;
      return;
    }
    const prevWidth = prevWidthRef.current;
    if (
      (prevWidth >= PC_WIDTH && width < PC_WIDTH) ||
      (prevWidth < PC_WIDTH && width >= PC_WIDTH)
    ) {
      document.body.classList.toggle('modal-open', width < PC_WIDTH);
    }
    prevWidthRef.current = width; // 현재 width를 저장
  }, [width]);
  return (
    <ReservationLayout date={date} isScheduleVisible={isScheduleVisible}>
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
          <div
            className={cn(
              toggleMobile && 'hidden md:block',
              scheduleId !== undefined && 'hidden md:block'
            )}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelectDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              disabled={(day) => {
                const isSameMonth =
                  day.getMonth() === currentMonth.getMonth() &&
                  day.getFullYear() === currentMonth.getFullYear();
                const isAvailable = availableDates.some(
                  (available) => available.toDateString() === day.toDateString()
                );
                return !isSameMonth || !isAvailable;
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
            toggleMobile={toggleMobile}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>
      </div>

      {/* 총합계 & 예약하기 */}
      <ReservationFooter
        disabled={!isReservation}
        activityPrice={activityPrice}
        count={count}
        date={date}
        isScheduleVisible={isScheduleVisible}
        selectedTime={selectedTime}
        setIsScheduleVisible={setIsScheduleVisible}
      />
    </ReservationLayout>
  );
}
