import { ScheduleBase } from '@/types/activities';

export type ScheduleUI = ScheduleBase & {
  id: number;
  isDeleted: boolean;
};

export type ScheduleFormProps = {
  initialSchedules?: {
    id: number;
    date: string;
    startTime: string;
    endTime: string;
  }[];
  onAdd: (schedule: ScheduleBase) => void;
  onDelete: (payload: number | ScheduleBase) => void;
};

export type ScheduleRowProps = {
  value: ScheduleUI | ScheduleBase;
  isDraft?: boolean;
  onClick: () => void;
  onChange?: (key: keyof ScheduleBase, value: string) => void;
};

export type ScheduleBtnProp = {
  onClick: () => void;
  isDraft?: boolean;
};

export type ScheduleDateProps = {
  isDraft?: boolean;
  onChange?: (key: keyof ScheduleBase, value: string) => void;
  value: string;
};

export type ScheduleTimeProps = {
  feildKey: keyof ScheduleBase;
  isDraft?: boolean;
  title?: string;
  value: string;
  onChange?: (key: keyof ScheduleBase, value: string) => void;
};
