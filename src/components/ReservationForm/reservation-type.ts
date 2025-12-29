export interface Schedule {
  id: number;
  date: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
}

export const PC_WIDTH = 1024;

export interface ReservationFormProps {
  schedules: readonly Schedule[];
  activityPrice: number;
}

export interface ReservationOptionProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  date: Date | undefined;
  selectedDate: Schedule[];
  scheduleId: number | undefined;
  setScheduleId: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  toggleMobile: boolean;
}

export interface ReservationFooterProps {
  disabled: boolean;
  activityPrice: number;
  count: number;
  date: Date | undefined;
  isScheduleVisible: boolean;
  setIsScheduleVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTime: string;
}

export interface ReservationLayoutProps {
  children: React.ReactNode;
  date: Date | undefined;
  isScheduleVisible: boolean;
}

export interface HandleTimeValueParams {
  id: number;
  startTime: string;
  endTime: string;
}
