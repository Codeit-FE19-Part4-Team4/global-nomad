import { cn } from '@/util/cn';

interface CardScheduleProps {
  date: string;
  startTime: string;
  endTime: string;
}

export default function CardSchedule({
  date,
  startTime,
  endTime,
}: CardScheduleProps) {
  return (
    <div
      className={cn([
        'mt-1 mb-2 text-[13px] leading-[16px] text-gray-500',
        'md:mt-[6px] md:mb-[10px]',
        'lg:mt-[10px] lg:mb-[17px] lg:text-[16px] lg:leading-[19px]',
      ])}>
      <span className="hidden lg:inline-block">{date} · </span>
      <span>
        {startTime} - {endTime}
      </span>
    </div>
  );
}
