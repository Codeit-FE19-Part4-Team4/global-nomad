import { apiFetch } from '@/config/client';
import type {
  ResponseGetActivities,
  RequestGetActivities,
  ActivityImageResponse,
  PostActivityRequest,
  ResponsePostActivities,
} from '@/types/activities';

export async function getActivities(params: RequestGetActivities) {
  return apiFetch<ResponseGetActivities, RequestGetActivities>('/activities', {
    params,
  });
}

export const postActivityImage = async (data: File) => {
  const formdata = new FormData();
  formdata.append('image', data);
  return apiFetch<ActivityImageResponse>('/activities/image', {
    method: 'POST',
    body: formdata,
  });
};

export const postActivity = async (req: PostActivityRequest) => {
  return apiFetch<ResponsePostActivities>('/activities', {
    method: 'POST',
    body: req,
  });
};
