export interface TimeSlot {
  endTime: string; // "HH:mm"
  startTime: string; // "HH:mm"
  id: number;
}

export interface ReservationSchedule {
  date: string;
  times: TimeSlot[];
}

export interface ReservationFormProps {
  schedules: readonly ReservationSchedule[];
  activityPrice: number;
  activityId: number;
}

export interface ReservationProps {
  scheduleId: number;
  count: number;
}

export interface ReservationOptionProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  date: Date | undefined;
  selectedDate: ReservationSchedule[];
  scheduleId: number | undefined;
  setScheduleId: React.Dispatch<React.SetStateAction<number | undefined>>;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
}

export interface ReservationFooterProps {
  disabled: boolean;
  onClick: (params: ReservationProps) => void;
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
