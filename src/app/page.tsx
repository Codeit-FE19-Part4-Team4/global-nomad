'use client';

import { useState } from 'react';

import ScheduleForm from '@/components/ScheduleForm';
import { ScheduleBase } from '@/types/activities';
const data = {
  schedules: [
    {
      id: 1,
      date: '2023-12-01',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      id: 2,
      date: '2023-12-05',
      startTime: '12:00',
      endTime: '13:00',
    },
  ],
};
export default function TestPage() {
  const [schedulesToAdd, setSchedulesToAdd] = useState<ScheduleBase[]>([]);
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  const handleAddSchedule = (schedule: ScheduleBase) => {
    setSchedulesToAdd((prev) => [...prev, schedule]);
  };
  const handleDeleteSchedule = (item: number | ScheduleBase) => {
    if (typeof item === 'number') {
      setScheduleIdsToRemove((prev) =>
        prev.includes(item) ? prev : [...prev, item]
      );
      return;
    }
    setSchedulesToAdd((prev) =>
      prev.filter(
        (item) =>
          !(
            item.date === item.date &&
            item.startTime === item.startTime &&
            item.endTime === item.endTime
          )
      )
    );
  };
  return (
    <ScheduleForm
      initialSchedules={data.schedules}
      onAdd={handleAddSchedule}
      onDelete={handleDeleteSchedule}
    />
  );
}
