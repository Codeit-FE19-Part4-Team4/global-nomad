'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import * as React from 'react';

import { ScheduleDateProps } from '../schedule-type';

import IcoCalendar from '@/assets/icons/activities/ic-calendar.svg';
import { TextInput } from '@/components/Input';
import Text from '@/components/Text';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/util/cn';
import { formatDateYYMMDD, parseDate } from '@/util/format';

export function ScheduleDate({ isDraft, onChange, value }: ScheduleDateProps) {
  const [open, setOpen] = React.useState(false);
  const [today, setToday] = React.useState<Date | null>(null);
  const [month, setMonth] = React.useState<Date | null>(null);
  React.useEffect(() => {
    setToday(new Date());
    setMonth(new Date());
  }, []);
  if (!month) return null;

  const selectedDate = value ? new Date(value) : undefined;
  const isIsoDate = (value: string) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  };
  return (
    <div className="w-full">
      {isDraft ? (
        <div className="relative flex gap-2 pt-[26px] md:pt-[29px]">
          <Text
            as="span"
            className={cn(
              'absolute top-0 text-[14px] font-[var(--weight-title-sm)] text-gray-950',
              'md:text-body-lg md:block'
            )}>
            날짜
          </Text>
          <TextInput
            title="날짜"
            readOnly
            value={value}
            placeholder="yy/mm/dd"
            className={cn('cursor-pointer pr-[64px]')}
            onClick={() => setOpen(true)}
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date-picker"
                className="absolute top-[26px] right-0 h-[54px] w-[64px] cursor-pointer p-0 transition-none md:top-[29px]">
                <Image src={IcoCalendar} alt="" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="mt-[6px] w-auto overflow-hidden rounded-[16px] border border-gray-100 bg-white p-0"
              align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                month={month}
                onMonthChange={setMonth}
                disabled={(day) => {
                  if (!today) return true;
                  const todayStr = format(today, 'yyyy-MM-dd');
                  const dayStr = format(day, 'yyyy-MM-dd');
                  const isPast = dayStr < todayStr;
                  const isSameMonth =
                    day.getMonth() === month.getMonth() &&
                    day.getFullYear() === month.getFullYear();
                  return !isSameMonth || isPast;
                }}
                onSelect={(selectedDate) => {
                  if (!selectedDate) return;
                  onChange?.('date', formatDateYYMMDD(selectedDate));
                  setOpen(false);
                }}
                className="[&_button[data-selected]]:bg-primary-500 rounded-lg [&_button[data-selected]]:text-white"
              />
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <TextInput
          title="날짜"
          value={isIsoDate(value) ? formatDateYYMMDD(parseDate(value)) : value}
          readOnly
        />
      )}
    </div>
  );
}
