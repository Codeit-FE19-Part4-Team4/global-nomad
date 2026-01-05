'use client';

import { ScheduleRowProps } from '../schedule-type';

import { ScheduleBtn } from './ScheduleBtn';
import { ScheduleDate } from './ScheduleDate';
import { ScheduleTime } from './ScheduleTime';

import { cn } from '@/util/cn';

export default function ScheduleRow({
  onClick,
  onChange,
  isDraft,
  value,
}: ScheduleRowProps) {
  return (
    <div className="mt-[16px] flex flex-wrap items-center gap-[14px] md:mt-[20px] md:flex-nowrap">
      {/* 날짜 */}
      <ScheduleDate isDraft={isDraft} onChange={onChange} value={value.date} />

      {/* 시작시간 & 종료 시간 */}
      <div className="flex w-[calc(100%-(28px+14px))] grow md:w-auto md:flex-none">
        <ScheduleTime
          feildKey="startTime"
          isDraft={isDraft}
          title="시작 시간"
          value={value.startTime}
          onChange={onChange}
        />
        <span
          className={cn(
            isDraft && 'pt-0 md:pt-[29px]',
            'flex w-[28px] items-center justify-center'
          )}>
          <span className="inline-block h-[2px] w-[8px] bg-gray-800" />
        </span>
        <ScheduleTime
          feildKey="endTime"
          isDraft={isDraft}
          title="종료 시간"
          value={value.endTime}
          onChange={onChange}
        />
      </div>

      {/* 추가,삭제 */}
      <ScheduleBtn isDraft={isDraft} onClick={onClick} />
    </div>
  );
}
