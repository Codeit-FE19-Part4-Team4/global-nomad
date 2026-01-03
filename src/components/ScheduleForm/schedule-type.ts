export interface ScheduleBase {
  date: string;
  startTime: string;
  endTime: string;
}
export type ScheduleServer = ScheduleBase & {
  id: number;
  isNew?: boolean;
  isDeleted?: boolean;
};

export type ScheduleFormProps = {
  initialSchedules: ScheduleServer[];
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

export const TIME_OPTIONS = [
  '0:00',
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];
