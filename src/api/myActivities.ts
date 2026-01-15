import { apiFetch } from '@/config/client';
import type {
  UpdateActivityRequest,
  ResponseActivitiesDetail,
} from '@/types/activities';
import {
  RequestMyActivities,
  ResponseMyActivities,
} from '@/types/myactivities';
import type {
  ReservationDashboardRes,
  ReservationListResponse,
  ReservationStatusType,
  ReservedScheduleList,
} from '@/types/reserved-schedule';

//내 체험 수정
export const updateActivity = async (
  req: UpdateActivityRequest,
  id: number
) => {
  return apiFetch<ResponseActivitiesDetail>(`/my-activities/${id}`, {
    method: 'PATCH',
    body: req,
  });
};

// 내 체험 리스트 조회 - GET /{teamId}/my-activities
export async function getMyActivities(params?: RequestMyActivities) {
  return apiFetch<ResponseMyActivities>('/my-activities', {
    params,
  });
}

// 내 체험 삭제 - DELETE /{teamId}/my-activities/{activityId}
export const deleteMyActivities = async (activityId: number) => {
  return apiFetch(`/my-activities/${activityId}`, {
    method: 'DELETE',
  });
};

//체험 예약 현황 월별 예약 조회
interface GetMonthlyReservationsParams {
  year: string;
  month: string;
}
export const getMonthlyReservations = (
  activityId: number,
  params: GetMonthlyReservationsParams
) => {
  return apiFetch<ReservationDashboardRes[]>(
    `/my-activities/${activityId}/reservation-dashboard`,
    {
      params,
    }
  );
};

//날짜별 예약 정보 조회
export const getDailyReservationInfo = (
  activityId: number,
  params: { date: string }
) => {
  return apiFetch<ReservedScheduleList>(
    `/my-activities/${activityId}/reserved-schedule`,
    {
      params,
    }
  );
};

//체험 예약 현황 시간대별 예약 정보 조회
interface GetReservationByScheduleParams {
  cursorId?: number | null;
  size?: number;
  scheduleId: number;
  status: ReservationStatusType;
}
export const getReservationBySchedule = (
  activityId: number,
  params: GetReservationByScheduleParams
) => {
  return apiFetch<ReservationListResponse>(
    `/my-activities/${activityId}/reservations`,
    {
      params,
    }
  );
};
