import { ActivityType } from './activities';

/** ======================
 * Request Types
 ======================= */
export interface RequestMyActivities {
  cursorId?: number | null;
  size?: number;
}

/** ======================
 * Response Types
 ======================= */
export interface ResponseMyActivities {
  activities: ActivityType[];
  totalCount: number;
  cursorId: number | null;
}
