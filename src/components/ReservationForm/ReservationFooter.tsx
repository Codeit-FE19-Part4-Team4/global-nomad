import Button from '../Button';

import {
  footerBox,
  footerTextBtn,
  footerInr,
  infoPrice,
  mobileBtns,
} from './reservation-style';
import { PC_WIDTH, ReservationFooterProps } from './reservation-type';

import useWindowSize from '@/hooks/useWindowSize';
import { cn } from '@/util/cn';
import { formatDateYYMMDD, formatPrice } from '@/util/format';

export default function ReservationFooter({
  disabled,
  activityPrice,
  count,
  isScheduleVisible,
  setIsScheduleVisible,
  selectedTime,
  date,
}: ReservationFooterProps) {
  const width = useWindowSize();
  const isMobile = PC_WIDTH > width;

  // 확인 (스케줄 선택 영역 숨김 + 예약버튼 노출)
  const handleConfirmSchedule = () => {
    setIsScheduleVisible(false);
  };
  return (
    <div className={cn(footerBox)}>
      <div className={cn(infoPrice)}>
        <span className="text-[24px] font-[var(--weight-title-md)] tracking-[-1px]">
          ₩ {formatPrice(activityPrice)}
        </span>
        <span className="text-[20px] tracking-[-3px] text-[#79747E]">/ 인</span>
      </div>
      <div className={cn(footerInr)}>
        <div className="flex items-center">
          <span className="hidden text-[16px] text-[#79747e] lg:mr-[6px] lg:inline-block">
            총 합계
          </span>
          <strong className="text-[20px] leading-1 tracking-[-1px]">
            ₩ {formatPrice(activityPrice * count)}
          </strong>
          <span className="ml-[6px] text-[16px] tracking-[-2px] text-[#79747e]">
            / {count} 명
          </span>
        </div>
        <div>
          {date ? (
            <button
              onClick={() => setIsScheduleVisible(true)}
              className={cn(footerTextBtn)}>
              {formatDateYYMMDD(date)} {selectedTime}
            </button>
          ) : (
            <button
              onClick={() => setIsScheduleVisible(true)}
              className={cn(footerTextBtn, isScheduleVisible && 'hidden')}>
              날짜 선택하기
            </button>
          )}
        </div>
      </div>
      <Button
        variant="primary"
        size="lg"
        disabled={disabled}
        className={cn(
          isScheduleVisible && 'hidden lg:flex',
          'w-full lg:w-[135px]'
        )}>
        예약하기
      </Button>
      <div className={cn(mobileBtns, isScheduleVisible && 'grid lg:hidden')}>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => setIsScheduleVisible(false)}>
          닫기
        </Button>
        <Button
          variant="primary"
          size="lg"
          disabled={disabled}
          onClick={handleConfirmSchedule}>
          확인
        </Button>
      </div>
    </div>
  );
}
