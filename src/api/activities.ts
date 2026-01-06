import { apiFetch } from '@/config/client';
import {
  ResponseGetActivities,
  RequestGetActivities,
} from '@/types/activities';

export async function getActivities(params: RequestGetActivities) {
  return apiFetch<ResponseGetActivities, RequestGetActivities>('/activities', {
    params,
  });
}
