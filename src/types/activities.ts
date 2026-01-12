/** ======================
 * Request Types
 ======================= */
export type MethodType = 'offset' | 'cursor';

export type CategoryType =
  | '문화 · 예술'
  | '식음료'
  | '스포츠'
  | '투어'
  | '관광'
  | '웰빙';

export type SortType = 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';
export type ActivityImageResponse = {
  activityImageUrl: string;
};

export interface ScheduleBase {
  date: string;
  startTime: string;
  endTime: string;
}

export interface PostActivityRequest {
  title: string;
  category: CategoryType | '';
  description: string;
  address: string;
  price: number;
  schedules: ScheduleBase[];
  bannerImageUrl: string;
  subImageUrls: string[];
}

export interface RequestGetActivities {
  method: MethodType;
  cursorId?: number;
  category?: CategoryType | null;
  keyword?: string;
  sort?: SortType;
  page?: number;
  size?: number;
}

export type UpdateActivityRequest = {
  title: string;
  category: CategoryType;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageIdsToRemove: number[];
  subImageUrlsToAdd: string[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: ScheduleBase[];
};

/** ======================
 * Response Types
 ======================= */
export type ActivityType = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: CategoryType;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export interface ResponseGetActivities {
  activities: ActivityType[];
  totalCount: number;
}

export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface Schedule {
  id: number;
  date: string; // ISO date string (YYYY-MM-DD)
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export interface ResponseActivitiesDetail extends ActivityType {
  subImages: SubImage[];
  schedules: Schedule[];
}
