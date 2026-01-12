import {
  ReservationProps,
  ReservationSchedule,
} from '@/components/ReservationForm/reservation-type';
import { apiFetch } from '@/config/client';
import type {
  ResponseGetActivities,
  RequestGetActivities,
  ActivityImageResponse,
  PostActivityRequest,
  ResponseActivitiesDetail,
  RequestGetActivitySchedule,
  ResponsePostActivityReservations,
  ResponseGetActivityReviews,
  RequestGetActivityReviews,
} from '@/types/activities';

// 체험 리스트 조회 - GET /{teamId}/activities
export const getActivities = async (params: RequestGetActivities) => {
  return apiFetch<ResponseGetActivities>('/activities', {
    params,
  });
};

// 체험 예약 가능일 조회 - GET /{teamId}/activities/{activityId}/available-schedule
export const getActivitySchedule = async (
  activityId: number,
  params: RequestGetActivitySchedule
) => {
  return apiFetch<ReservationSchedule[]>(
    `/activities/${activityId}/available-schedule`,
    {
      params,
    }
  );
};

// 체험 예약 신청 - POST /{teamId}/activities/{activityId}/reservations
export const postActivityReservations = async (
  activityId: number,
  data: ReservationProps
) => {
  return apiFetch<ResponsePostActivityReservations>(
    `/activities/${activityId}/reservations`,
    {
      method: 'POST',
      body: data,
    }
  );
};

// 체험 리뷰 조회 - GET /{teamId}/activities/{activityId}/reviews
export const getActivityReviews = async (
  activityId: number,
  params: RequestGetActivityReviews
) => {
  return apiFetch<ResponseGetActivityReviews>(
    `/activities/${activityId}/reviews`,
    {
      params,
    }
  );
};

export const postActivityImage = async (data: File) => {
  const formdata = new FormData();
  formdata.append('image', data);
  return apiFetch<ActivityImageResponse>('/activities/image', {
    method: 'POST',
    body: formdata,
  });
};

export const postActivity = async (req: PostActivityRequest) => {
  return apiFetch<ResponseActivitiesDetail>('/activities', {
    method: 'POST',
    body: req,
  });
};
export const getActivityDetail = async (id: number) => {
  return apiFetch<ResponseActivitiesDetail>(`/activities/${id}`);
};
