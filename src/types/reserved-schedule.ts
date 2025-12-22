interface ScheduleCount {
  declined: number;
  confirmed: number;
  pending: number;
}

export interface ReservedSchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: ScheduleCount;
}

export type ReservedScheduleList = ReservedSchedule[];
