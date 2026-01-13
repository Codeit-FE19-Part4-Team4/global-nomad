import { apiFetch } from '@/config/client';
import type {
  UpdateActivityRequest,
  ResponseActivitiesDetail,
} from '@/types/activities';
import {
  RequestMyActivities,
  ResponseMyActivities,
} from '@/types/myactivities';

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
export async function getMyActivities(params: RequestMyActivities) {
  return apiFetch<ResponseMyActivities>('/my-activities', {
    params,
  });
}

// 내 체험 삭제 - DELETE /{teamId}/my-activities/{activityId}
export const deleteMyActivities = async (activityId: number) => {
  return apiFetch(`/my-activities/${activityId}`);
};
