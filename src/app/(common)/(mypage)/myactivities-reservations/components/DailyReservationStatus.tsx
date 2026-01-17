'use client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useEffect, useState } from 'react';

import ReservationListByStatus from './ReservationListByStatus';

import {
  getDailyReservationInfo,
  getReservationBySchedule,
  updateReservationApproval,
} from '@/api/myActivities';
import Button from '@/components/Button';
import {
  DropDownTrigger,
  DropDown,
  DropDownList,
  DropDownItem,
} from '@/components/DropDown';
import Tab from '@/components/Tab';
import useClickOutside from '@/hooks/useClickOutside';
import useWindowSize from '@/hooks/useWindowSize';
import type {
  ReservationStatusType,
  UpdateReservationApprovalReq,
} from '@/types/reserved-schedule';
import { cn } from '@/util/cn';
export interface BoxType {
  clientX: number;
  clientY: number;
  x: number;
  y: number;
}

interface DailyReservationStatusProps {
  activityId: number;
  date?: Date;
  box?: BoxType;
  onClose: () => void;
}

const STATUS_TO_EN: Record<string, ReservationStatusType> = {
  신청: 'pending',
  승인: 'confirmed',
  거절: 'declined',
};

export default function DailyReservationStatus({
  activityId,
  date,
  box,
  onClose,
}: DailyReservationStatusProps) {
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);
  const formatDate = date ? moment(date).format('YYYY-MM-DD') : '';
  const params = {
    date: formatDate,
  };
  const screenWidth = useWindowSize();
  const [time, setTime] = useState('');
  const [status, setStatus] = useState<ReservationStatusType>('pending');
  const popupCloseRef = useClickOutside(onClose);
  const { data: dailyReservationData, refetch: dailyReservationRefetch } =
    useQuery({
      queryKey: ['DailyReservationStatus', activityId, formatDate],
      queryFn: () => getDailyReservationInfo(activityId, params),
      enabled: !!date && !!activityId && !!box,
    });

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (dailyReservationData && dailyReservationData.length > 0) {
      setTime(
        `${dailyReservationData[0].startTime} - ${dailyReservationData[0].endTime}`
      );
    }
  }, [dailyReservationData]);

  const startToEndTimes = dailyReservationData?.map(
    (schedule) => `${schedule.startTime} - ${schedule.endTime}`
  );

  const filteredStatus = dailyReservationData?.filter(
    (data) => `${data.startTime} - ${data.endTime}` === time
  );

  const scheduleId = filteredStatus?.[0]?.scheduleId ?? null;

  const reservationListDataParams = {
    scheduleId: scheduleId ?? 0,
    status,
  };

  const { data: reservationListData, refetch: reservationListRefetch } =
    useQuery({
      queryKey: ['ReservationListByStatus', status, scheduleId],
      queryFn: () =>
        getReservationBySchedule(activityId, reservationListDataParams),
      enabled: !!scheduleId && scheduleId > 0,
    });

  const handleReservation = async (
    reservationId: number,
    status: ReservationStatusType
  ) => {
    const req: UpdateReservationApprovalReq = {
      status,
    };
    try {
      await updateReservationApproval(activityId, reservationId, req);
      await Promise.all([dailyReservationRefetch(), reservationListRefetch()]);
    } catch (error) {
      alert(error);
    }
  };

  const getDesktopPosition = () => {
    if (!isMounted) return;
    if (!box || !screenWidth || screenWidth < 1024) return undefined;

    const POPUP_WIDTH = 375;
    const POPUP_HEIGHT = dailyReservationData?.length === 0 ? 400 : 580;

    let left = box.clientX + 20;
    let top = box.clientY + 20;

    if (left + POPUP_WIDTH > window.innerWidth) {
      left = left - POPUP_WIDTH - 40;
    }

    if (top + POPUP_HEIGHT > window.innerHeight) {
      top = box.y;
      top = top - POPUP_HEIGHT + 20;
    }
    return {
      left,
      top,
    };
  };
  if (!startToEndTimes || !filteredStatus) return null;
  return (
    <>
      {isMounted && screenWidth && screenWidth < 1024 && (
        <div className="fixed inset-0 z-40 bg-black/50" />
      )}
      <div
        ref={popupCloseRef}
        className={cn(
          //기본 스타일
          'bg-background fixed z-50',
          //위치, 크기
          'top-auto right-0 bottom-0 left-0 min-h-[420px]',
          //모양
          'rounded-t-[30px] px-6 py-7.5',
          //데스크탑 스타일
          'lg:shadow-calendar lg:absolute lg:right-auto lg:bottom-auto lg:left-auto lg:h-fit lg:w-[375px] lg:rounded-[30px]'
        )}
        style={getDesktopPosition()}>
        <div
          className={cn(
            'flex flex-col gap-4.5',
            dailyReservationData?.length === 0 ? 'h-100' : 'h-full'
          )}>
          <span className="bold text-[20px] text-gray-950">{formatDate}</span>
          {dailyReservationData?.length === 0 ? (
            <div className="flex flex-1 items-center justify-center lg:min-h-auto">
              <span className="text-[20px] font-medium">
                해당 날짜에 예약 내역이 없습니다.
              </span>
            </div>
          ) : (
            <>
              <div className="mb-2.5 flex flex-col gap-3">
                <span className="bold text-[18px] text-gray-950">
                  예약 시간
                </span>
                <DropDown>
                  <DropDownTrigger placeholder={time || startToEndTimes?.[0]} />
                  <DropDownList>
                    {startToEndTimes?.map((time) => (
                      <DropDownItem
                        key={time}
                        onSelect={(selected) => setTime(selected)}>
                        {time}
                      </DropDownItem>
                    ))}
                  </DropDownList>
                </DropDown>
              </div>
              {filteredStatus[0] && (
                <>
                  <Tab
                    data={filteredStatus[0]}
                    onClick={(status) =>
                      setStatus(STATUS_TO_EN[status] ?? 'pending')
                    }
                  />
                  {reservationListData && scheduleId ? (
                    <ReservationListByStatus
                      reservationListData={reservationListData}
                      handleReservation={handleReservation}
                      activityId={activityId}
                      scheduleId={scheduleId}
                      status={status}
                    />
                  ) : null}
                </>
              )}
            </>
          )}
          <Button
            size="xl"
            variant="secondary"
            className="mt-[14px]"
            onClick={onClose}>
            닫기
          </Button>
        </div>
      </div>
    </>
  );
}
