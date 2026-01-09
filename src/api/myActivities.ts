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
