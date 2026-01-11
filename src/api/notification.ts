import { apiFetch } from '@/config/client';
import { Notification } from '@/types/notification';

export type GetMyNotificationsResponse = {
  cursorId: number | null;
  notifications: Notification[];
};
//내 알림리스트 조회
export function getMyNotifications(params: {
  size: number;
  cursorId?: number;
}) {
  return apiFetch<GetMyNotificationsResponse>(`/my-notifications`, {
    params,
    method: 'GET',
  });
}
//내 알림 삭제
export function deleteNotification(notificationId: number) {
  return apiFetch<void>(`/my-notifications/${notificationId}`, {
    method: 'DELETE',
  });
}
