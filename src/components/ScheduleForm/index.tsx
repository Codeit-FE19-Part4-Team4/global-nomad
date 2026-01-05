'use client';
import { useEffect, useState } from 'react';

import { useToastContext } from '../toast/ToastProvider';

import ScheduleRow from './components/ScheduleRow';
import { ScheduleServer, ScheduleFormProps } from './schedule-type';

import { ScheduleBase } from '@/types/activities';
import { formatToServerDate } from '@/util/format';

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
  return (
    <ScheduleForm
      initialSchedules={data.schedules}
      setSchedulesToAdd={setSchedulesToAdd}
      setScheduleIdsToRemove={setScheduleIdsToRemove}
    />
  );
 * ```
 */
export default function ScheduleForm({
  initialSchedules,
  setSchedulesToAdd,
  setScheduleIdsToRemove,
}: ScheduleFormProps) {
  const { showToast } = useToastContext();
  const [draftData, setDraftData] = useState<ScheduleBase>(INITIAL_SCHEDULE);
  const [scheduleData, setScheduleData] = useState<ScheduleServer[]>([]);
  const isValidSchedule = Object.values(draftData).every(
    (value) => value.trim() !== ''
  );
  const visibleSchedules = scheduleData.filter((item) => !item.isDeleted);

  // 입력항목 값 변화시
  const handleChangeDraft = (key: keyof ScheduleBase, value: string) => {
    if (key === 'endTime') {
      const endTime = value;
      const startTime = draftData.startTime;
      if (startTime && endTime <= startTime) {
        showToast('종료 시간은 시작 시간 이후여야 합니다.', 'warning');
        return;
      }
    }
    setDraftData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  // 일정 추가
  const handleRowAdd = () => {
    if (!isValidSchedule) {
      showToast('날짜와 시간을 모두 입력해 주세요.', 'warning');
      return;
    }
    setScheduleData((prev) => [
      ...prev,
      { id: Date.now(), ...draftData, isNew: true, isDeleted: false },
    ]);
    setSchedulesToAdd((prev) => [...prev, draftData]);
    setDraftData(INITIAL_SCHEDULE);
  };
  // 일정 삭제
  const handleRowDelete = (id: number) => {
    // 버튼 누른 타켓 검증
    const target = scheduleData.find((item) => item.id === id);
    if (!target) return;

    // 서버 삭제 데이터 ID 저장
    if (!target.isNew) {
      setScheduleIdsToRemove((prev) =>
        prev.includes(id) ? prev : [...prev, id]
      );
    }
    // 화면 내 삭제
    setScheduleData((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          isDeleted: true,
        };
      })
    );
  };

  // 서버에 보낼 데이터
  useEffect(() => {
    const toAdd = scheduleData
      .filter((item) => item.isNew && !item.isDeleted)
      .map(({ date, startTime, endTime }) => ({
        date: formatToServerDate(date),
        startTime,
        endTime,
      }));
    setSchedulesToAdd(toAdd);
  }, [scheduleData, setSchedulesToAdd]);

  // 초기 서버 데이터
  useEffect(() => {
    if (!initialSchedules) return;
    setScheduleData(initialSchedules);
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
        {scheduleData
          .filter((item) => !item.isDeleted)
          .map((item) => {
            return (
              <ScheduleRow
                key={item.id}
                value={item}
                onClick={() => handleRowDelete(item.id)}
              />
            );
          })}
      </div>
    </>
  );
}
