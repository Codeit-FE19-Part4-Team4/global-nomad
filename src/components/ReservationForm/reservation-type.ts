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
  id: number;
  isUser: boolean;
  isOwner: boolean;
  headCount: number;
  setHeadCount: React.Dispatch<React.SetStateAction<number>>;
  scheduleId: number | undefined;
  setScheduleId: React.Dispatch<React.SetStateAction<number | undefined>>;
  schedules: ReservationSchedule[] | undefined;
  activityPrice: number;
  handleReservation: (params: ReservationProps) => void;
  currentMonth: Date;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
}

export interface ReservationProps {
  scheduleId: number;
  headCount: number;
}

export interface ReservationOptionProps {
  headCount: number;
  setHeadCount: React.Dispatch<React.SetStateAction<number>>;
  scheduleId: number | undefined;
  setScheduleId: React.Dispatch<React.SetStateAction<number | undefined>>;
  date: Date | undefined;
  selectedDate: ReservationSchedule[] | undefined;
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
}

export interface ReservationFooterProps {
  id: number;
  isUser: boolean;
  isOwner: boolean;
  disabled: boolean;
  onClick: (params: ReservationProps) => void;
  activityPrice: number;
  headCount: number;
  date: Date | undefined;
  scheduleId: number | undefined;
  setScheduleId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setSelectedTime: React.Dispatch<React.SetStateAction<string>>;
  isScheduleVisible: boolean;
  setIsScheduleVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTime: string;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setHeadCount: React.Dispatch<React.SetStateAction<number>>;
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
