import { ScheduleBase } from '@/types/activities';

export type ScheduleServer = ScheduleBase & {
  id: number;
  isNew?: boolean;
  isDeleted?: boolean;
};

export type ScheduleFormProps = {
  initialSchedules?: ScheduleServer[];
  setSchedulesToAdd: React.Dispatch<React.SetStateAction<ScheduleBase[]>>;
  setScheduleIdsToRemove: React.Dispatch<React.SetStateAction<number[]>>;
};

export type ScheduleRowProps = {
  value: ScheduleBase;
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
