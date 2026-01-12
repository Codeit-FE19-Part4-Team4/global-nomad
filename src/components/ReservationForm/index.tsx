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
import { ReservationFormProps, ReservationSchedule } from './reservation-type';
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
    schedules={schedules}
    activityPrice={activityPrice}
  />
 */
export default function ReservationForm({
  headCount,
  setHeadCount,
  scheduleId,
  setScheduleId,
  schedules,
  activityPrice,
  handleReservation,
  currentMonth,
  setCurrentMonth,
}: ReservationFormProps) {
  const width = useWindowSize();
  const [today, setToday] = React.useState<Date | null>(null);
  const [mounted, setMounted] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [selectedDate, setSelectedDate] = React.useState<
    ReservationSchedule[] | undefined
  >([]);
  const [selectedTime, setSelectedTime] = React.useState<string>('');
  // 이용가능한 날짜
  const availableDates = React.useMemo(
    () => schedules?.map((s) => new Date(s.date)), // Date[]
    [schedules]
  );
  const availableDateList = React.useMemo(
    () => new Set(schedules?.map((s) => s.date)), // 'yyyy-MM-dd'
    [schedules]
  );
  const isReservation = React.useMemo(
    () => headCount !== 0 && !!scheduleId,
    [headCount, scheduleId]
  );
  const [isScheduleVisible, setIsScheduleVisible] =
    React.useState<boolean>(false);

  // 달력 날짜 선택
  const handleSelectDate = (selectedDate?: Date) => {
    if (!selectedDate) return;
    setDate(selectedDate);
    const selectedDateString = format(selectedDate, 'yyyy-MM-dd');
    const selectedSchedule = schedules?.filter((item) => {
      return item.date === selectedDateString;
    });
    setSelectedDate(selectedSchedule);
    setScheduleId(undefined);
    setSelectedTime('');
  };
  // 달력 월 선택
  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
  };
  useEffect(() => {
    setToday(new Date());
    setMounted(true);
  }, []);
  // 해상도 1024 이하일때 배경 스크롤 제어
  useEffect(() => {
    if (!mounted || width === undefined) return;
    if (width < PC_WIDTH) {
      if (!isScheduleVisible) {
        document.body.classList.remove('modal-open');
        return;
      }
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [mounted, width, isScheduleVisible]);
  if (!mounted) return null;
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
              onMonthChange={handleMonthChange}
              disabled={(day) => {
                if (!today) return true;
                const todayStr = format(today, 'yyyy-MM-dd');
                const dayStr = format(day, 'yyyy-MM-dd');
                const isPast = dayStr < todayStr;
                const isSameMonth =
                  day.getMonth() === currentMonth.getMonth() &&
                  day.getFullYear() === currentMonth.getFullYear();
                const isAvailable = availableDateList.has(
                  format(day, 'yyyy-MM-dd')
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
            setHeadCount={setHeadCount}
            headCount={headCount}
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
        headCount={headCount}
        scheduleId={scheduleId}
        setScheduleId={setScheduleId}
        isScheduleVisible={isScheduleVisible}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        setIsScheduleVisible={setIsScheduleVisible}
        setDate={setDate}
        setHeadCount={setHeadCount}
      />
    </ReservationLayout>
  );
}
