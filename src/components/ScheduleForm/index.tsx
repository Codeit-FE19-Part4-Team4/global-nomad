'use client';
import { useEffect, useState } from 'react';

import { useToastContext } from '../toast/ToastProvider';

import ScheduleRow from './components/ScheduleRow';
import { ScheduleUI, ScheduleFormProps } from './schedule-type';

import { ScheduleBase } from '@/types/activities';

const INITIAL_SCHEDULE: ScheduleBase = {
  date: '',
  startTime: '',
  endTime: '',
};

/**
 * @example
 * ```tsx
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
        (schedule) =>
          !(
            schedule.date === item.date &&
            schedule.startTime === item.startTime &&
            schedule.endTime === item.endTime
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
 * ```
 */
export default function ScheduleForm({
  initialSchedules,
  onAdd,
  onDelete,
}: ScheduleFormProps) {
  const { showToast } = useToastContext();
  const [draftData, setDraftData] = useState<ScheduleBase>(INITIAL_SCHEDULE);
  const [scheduleData, setScheduleData] = useState<ScheduleUI[]>([]);
  const isValidSchedule = Object.values(draftData).every(
    (value) => value.trim() !== ''
  );
  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };
  const visibleSchedules = scheduleData.filter((item) => !item.isDeleted);

  // 입력항목 값 변화시
  const handleChangeDraft = (key: keyof ScheduleBase, value: string) => {
    const next = { ...draftData, [key]: value };
    if (next.startTime && next.endTime) {
      const start = timeToMinutes(next.startTime);
      const end = timeToMinutes(next.endTime);
      if (end <= start) {
        showToast('종료 시간은 시작 시간 이후여야 합니다.', 'warning');
        return;
      }
    }
    setDraftData(next);
  };
  // 일정 추가
  const handleRowAdd = () => {
    if (!isValidSchedule) {
      showToast('날짜와 시간을 모두 입력해 주세요.', 'warning');
      return;
    }
    const newSchedule = { ...draftData };
    setScheduleData((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newSchedule,
        isDeleted: false,
      },
    ]);
    onAdd(newSchedule);

    setDraftData(INITIAL_SCHEDULE);
  };
  // 일정 삭제
  const handleRowDelete = (id: number) => {
    // 버튼 누른 타켓 검증
    const target = scheduleData.find((item) => item.id === id);
    if (!target) return;
    const isFromServer = initialSchedules?.some((item) => item.id === id);
    if (isFromServer) {
      // 기존 데이터 삭제
      onDelete(id);
    } else {
      // 추가한 데이터 삭제
      onDelete({
        date: target.date,
        startTime: target.startTime,
        endTime: target.endTime,
      });
    }
    // 화면 내 삭제
    setScheduleData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isDeleted: true } : item))
    );
  };

  // 초기 데이터
  useEffect(() => {
    if (!initialSchedules) return;
    setScheduleData(
      initialSchedules.map((item) => ({
        ...item,
        isDeleted: false,
      }))
    );
  }, []);

  return (
    <>
      {/* 일정 추가 */}
      <ScheduleRow
        isDraft
        value={draftData}
        onChange={handleChangeDraft}
        onClick={handleRowAdd}
      />
      {/* 일정 목록 */}
      <div
        className={`mt-[20px] border-t border-t-gray-100 ${visibleSchedules.length === 0 ? 'hidden' : ''}`}>
        {visibleSchedules.map((item) => (
          <ScheduleRow
            key={item.id}
            value={item}
            onClick={() => handleRowDelete(item.id)}
          />
        ))}
      </div>
    </>
  );
}
