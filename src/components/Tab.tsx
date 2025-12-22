'use client';
import { useState } from 'react';

import {
  RESERVATION_STATUS,
  type ReservationStatus,
} from '@/constants/reservation-status';
import { type ReservedSchedule } from '@/types/reserved-schedule';
import { cn } from '@/util/cn';

interface TabPropsType {
  data: ReservedSchedule;
  onClick?: (status: ReservationStatus) => void;
}
interface TabDataType {
  id: number;
  status: ReservationStatus;
  count: number;
}

const { pending, confirmed, declined } = RESERVATION_STATUS;
/**
 * props의 data는
 * GET /my-activities/{activityId}/reserved-schedule
 * 응답을 그대로 사용합니다.
 */
export default function Tab({ data, onClick }: TabPropsType) {
  const tabData: TabDataType[] = [
    { id: 1, status: pending, count: data.count.pending },
    { id: 2, status: confirmed, count: data.count.confirmed },
    { id: 3, status: declined, count: data.count.declined },
  ];
  const [activeTab, setActiveTab] = useState(tabData[0].id);

  return (
    <div className="flex justify-start">
      {tabData.map((tab) => (
        <button
          type="button"
          key={tab.id}
          className={cn(
            'flex flex-1 justify-center gap-1 border-b px-3.5 py-[11px]',
            tab.id === activeTab
              ? 'border-primary-500 text-primary-500'
              : 'border-gray-100'
          )}
          onClick={() => {
            onClick?.(tab.status);
            setActiveTab(tab.id);
          }}>
          <span
            className={cn(
              'text-[16px]',
              activeTab === tab.id ? 'font-bold' : 'font-normal'
            )}>
            {tab.status}
          </span>
          <span
            className={cn(
              'text-[16px]',
              activeTab === tab.id ? 'font-bold' : 'font-normal'
            )}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
