import Link from 'next/link';
import { useEffect, useState } from 'react';

import Button from '../Button';

import {
  footerBox,
  footerTextBtn,
  footerInr,
  infoPrice,
  mobileBtns,
  txtPrice,
  txtPerson,
} from './reservation-style';
import { ReservationFooterProps } from './reservation-type';

import useWindowSize from '@/hooks/useWindowSize';
import { cn } from '@/util/cn';
import { formatDateYYMMDD, formatPrice } from '@/util/format';

export default function ReservationFooter({
  id,
  isUser,
  isOwner,
  disabled,
  onClick,
  activityPrice,
  headCount,
  scheduleId,
  setScheduleId,
  setSelectedTime,
  isScheduleVisible,
  setIsScheduleVisible,
  selectedTime,
  date,
  setDate,
  setHeadCount,
}: ReservationFooterProps) {
  const width = useWindowSize();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || width === undefined) return null;
  const isMobile = width < 767;
  const isNotPC = width < 1024;

  // 확인
  const handleConfirmSchedule = () => {
    setIsScheduleVisible(false);
  };
  // 닫기
  const handleCloseSchedule = () => {
    setSelectedTime('');
    setScheduleId(undefined);
    setIsScheduleVisible(false);
    setDate(undefined);
    setHeadCount(0);
  };
  // 뒤로
  const handleBackSchedule = () => {
    setSelectedTime('');
    setScheduleId(undefined);
  };
  const shouldShowInfo = isScheduleVisible && isMobile;
  const shouldShowPrice =
    !isNotPC || (isNotPC && headCount > 0) || (isMobile && isScheduleVisible);
  return (
    <div
      className={cn(footerBox, !isScheduleVisible && 'border-t border-[#ddd]')}>
      {/* 인당가격 */}
      <div className={cn(infoPrice, shouldShowPrice && 'hidden')}>
        <strong className={cn(txtPrice, 'lg:text-[24px]')}>
          ₩ {formatPrice(activityPrice)}
        </strong>
        <span
          className={cn(
            txtPerson,
            'lg:block lg:text-[20px] lg:tracking-[-1px]'
          )}>
          /{' '}
          <span className="text-[16px] tracking-[-1px] lg:hidden lg:text-[20px]">
            1
          </span>
          {isNotPC ? '명' : '인'}
        </span>
      </div>

      <div className={cn(footerInr, shouldShowInfo && 'hidden')}>
        {/* 총합계 (가격,인원) */}
        <div className="flex items-center">
          <span className="hidden text-[16px] text-[#79747e] lg:mr-[6px] lg:inline-block">
            총 합계
          </span>
          {shouldShowPrice && (
            <>
              <strong className={cn(txtPrice)}>
                ₩ {formatPrice(activityPrice * headCount)}
              </strong>
              <span className={cn(txtPerson)}>/ {headCount}명</span>
            </>
          )}
        </div>
        {/* 날짜시간정보 or 날짜선택하기 */}
        {!isOwner && (
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
        )}
      </div>
      {/* 하단 예약하기 버튼 */}
      {isOwner ? (
        <Button
          as={Link}
          href={`/activity/${id}/edit`}
          variant="primary"
          size="lg"
          className="w-full lg:w-[135px]">
          체험 편집
        </Button>
      ) : isUser ? (
        <Button
          variant="primary"
          size="lg"
          disabled={disabled}
          onClick={() => {
            if (scheduleId == null || headCount == null) return;
            onClick({ scheduleId, headCount });
          }}
          className={cn(
            isScheduleVisible && 'hidden lg:flex',
            'w-full lg:w-[135px]'
          )}>
          예약하기
        </Button>
      ) : (
        <Button
          as={Link}
          href={`/login`}
          variant="primary"
          size="lg"
          className={cn(
            isScheduleVisible && 'hidden lg:flex',
            'w-full lg:w-[170px]'
          )}>
          로그인 후 예약
        </Button>
      )}
      {/* 하단 뒤로/닫기 + 확인 버튼 (only 모바일,탭) */}
      <div className={cn(mobileBtns, isScheduleVisible && 'grid lg:hidden')}>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleBackSchedule}
          className={cn(scheduleId === undefined && 'hidden', 'md:hidden')}>
          뒤로
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={handleCloseSchedule}
          className={cn(
            isMobile && scheduleId === undefined ? 'flex' : 'hidden',
            'md:flex'
          )}>
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
