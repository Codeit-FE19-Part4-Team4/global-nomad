export interface Notification {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NotificationListResponse {
  cursorId: number;
  notifications: Notification[];
  totalCount: number;
}
