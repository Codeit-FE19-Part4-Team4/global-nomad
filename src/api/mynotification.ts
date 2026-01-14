import { apiFetch } from '@/config/client';
import { GetMyNotificationsResponse } from '@/types/mynotifications';

//내 알림리스트 조회 /{teamId}/my-notifications
export function getMyNotifications(params: {
  size: number;
  cursorId?: number;
}) {
  return apiFetch<GetMyNotificationsResponse>(`/my-notifications`, {
    params,
    method: 'GET',
  });
}
//내 알림 삭제 /{teamId}/my-notifications/{notificationId}
export function deleteNotification(notificationId: number) {
  return apiFetch<void>(`/my-notifications/${notificationId}`, {
    method: 'DELETE',
  });
}
