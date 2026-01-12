import Image from 'next/image';

import {
  countBox,
  optionBox,
  timeBox,
  timeRadio,
  countBtn,
  subTitle,
  countArea,
  timeArea,
  title,
} from './reservation-style';
import {
  HandleTimeValueParams,
  ReservationOptionProps,
} from './reservation-type';

import IcoMinus from '@/assets/icons/activities/ic-minus.svg';
import IcoPlus from '@/assets/icons/activities/ic-plus.svg';
import Text from '@/components/Text';
import { cn } from '@/util/cn';

/**
 * 인원수 카운트, 예약 가능한 시간을 입력하는 컴포넌트 입니다.
 */
export default function ReservationOption({
  headCount,
  setHeadCount,
  date,
  selectedDate,
  scheduleId,
  setScheduleId,
  selectedTime,
  setSelectedTime,
}: ReservationOptionProps) {
  const handleIncrease = () => {
    setHeadCount((prev) => prev + 1);
  };
  const handleDecrease = () => {
    if (headCount < 1) return;
    setHeadCount((prev) => prev - 1);
  };
  const handleTimeValue = ({
    id,
    startTime,
    endTime,
  }: HandleTimeValueParams) => {
    const time = `${startTime}~${endTime}`;
    setSelectedTime(time);
    setScheduleId(id);
  };
  return (
    <div className={cn(optionBox)}>
      {/* 인원 안내문구 */}
      <div className={cn(scheduleId === undefined && 'hidden', 'md:hidden')}>
        <Text as="h3" className={cn(title)}>
          인원
        </Text>
        <Text as="p" className="mb-5 text-[#4B4B4B]">
          예약할 인원을 선택해주세요.
        </Text>
      </div>
      {/* 인원수 카운트 */}
      <div
        className={cn(countArea, scheduleId === undefined && 'hidden md:flex')}>
        <Text size="body-lg" as="h3" className={cn(subTitle, 'md:mb-0')}>
          참여 인원 수
        </Text>
        <div className={cn(countBox)}>
          <button onClick={handleDecrease} className={cn(countBtn)}>
            <Image src={IcoMinus} width={20} height={20} alt="감소" />
          </button>
          <span className="text-[16px] font-[var(--weight-title-xl)] text-[#4B4B4B]">
            {headCount}
          </span>
          <button onClick={handleIncrease} className={cn(countBtn)}>
            <Image src={IcoPlus} width={20} height={20} alt="증가" />
          </button>
        </div>
      </div>
      {/* 예약 시간 선택 */}
      <div
        className={cn(timeArea, scheduleId !== undefined && 'hidden md:block')}>
        <Text size="body-lg" as="h3" className={cn(subTitle, 'mb-2')}>
          예약 가능한 시간
        </Text>
        <div className={cn(timeBox)}>
          {date ? (
            selectedDate?.map((item) =>
              item.times.map((time) => {
                const { startTime, endTime, id } = time;
                return (
                  <label
                    key={id}
                    htmlFor={`time` + id}
                    className="relative w-[calc((100%-9px)/2)] md:w-full">
                    <input
                      type="radio"
                      id={`time` + id}
                      name="time"
                      className="peer absolute inset-0 opacity-0"
                      value={selectedTime}
                      checked={scheduleId === id}
                      onChange={() =>
                        handleTimeValue({ id, startTime, endTime })
                      }
                    />
                    <span className={cn(timeRadio)}>
                      {startTime}~{endTime}
                    </span>
                  </label>
                );
              })
            )
          ) : (
            <Text as="p" className="w-full text-center text-[#4B4B4B]">
              날짜를 선택해주세요.
            </Text>
          )}
        </div>
      </div>
    </div>
  );
}
