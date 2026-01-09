import { apiFetch } from '@/config/client';
import type {
  ResponseGetActivities,
  RequestGetActivities,
  ActivityImageResponse,
  PostActivityRequest,
  ResponseActivitiesDetail,
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
  return apiFetch<ResponseActivitiesDetail>('/activities', {
    method: 'POST',
    body: req,
  });
};

export const getActivityDetail = async (id: number) => {
  return apiFetch<ResponseActivitiesDetail>(`/activities/${id}`);
};
