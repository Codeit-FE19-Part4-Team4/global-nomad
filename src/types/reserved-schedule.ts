export interface ReservationDashboardRes {
  date: string; // YYYY-MM-DD
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

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

export type ReservationStatusType = 'pending' | 'confirmed' | 'declined';

export interface Reservation {
  id: number;
  status: ReservationStatusType;
  totalPrice: number;
  headCount: number;
  nickname: string;
  userId: number;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm or H:mm
  endTime: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  activityId: number;
  scheduleId: number;
  reviewSubmitted: boolean;
  teamId: string;
}

export interface ReservationListResponse {
  reservations: Reservation[];
  totalCount: number;
  cursorId: number | null;
}

export type UpdateReservationApprovalReq = {
  status: ReservationStatusType;
};
