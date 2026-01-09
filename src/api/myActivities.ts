import { apiFetch } from '@/config/client';
import type { UpdateActivityRequest } from '@/types/activities';

export const updateActivity = async (
  req: UpdateActivityRequest,
  id: number
) => {
  return apiFetch<UpdateActivityRequest>(`/my-activities/${id}`, {
    method: 'PATCH',
    body: req,
  });
};
