export interface Schedule {
  id: number;
  date: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
}

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
}

export interface ReservationFooterProps {
  disabled: boolean;
  onClick: () => void;
  activityPrice: number;
  count: number;
  date: Date | undefined;
  scheduleId: number | undefined;
  setScheduleId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  isScheduleVisible: boolean;
  setIsScheduleVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTime: string;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export interface ReservationLayoutProps {
  children: React.ReactNode;
  isScheduleVisible: boolean;
}

export interface HandleTimeValueParams {
  id: number;
  startTime: string;
  endTime: string;
}
