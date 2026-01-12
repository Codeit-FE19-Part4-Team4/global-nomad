import { apiFetch } from '@/config/client';
import type {
  UpdateActivityRequest,
  ResponseActivitiesDetail,
} from '@/types/activities';

export const updateActivity = async (
  req: UpdateActivityRequest,
  id: number
) => {
  return apiFetch<ResponseActivitiesDetail>(`/my-activities/${id}`, {
    method: 'PATCH',
    body: req,
  });
};

// 내 체험 삭제 - DELETE /{teamId}/my-activities/{activityId}
export const deleteMyActivities = async (activityId: number) => {
  return apiFetch(`/my-activities/${activityId}`);
};
