import { Notification } from './notification';

/** ======================
 * Response Types
 ======================= */

export interface GetMyNotificationsResponse {
  cursorId: number | null;
  notifications: Notification[];
}
