export interface ScheduleBase {
  date: string;
  startTime: string;
  endTime: string;
}

/** ======================
 * Request Types
 ======================= */
export type MethodType = 'offset' | 'cursor';
export type CategoryType = '문화·예술' | '식음료' | '투어' | '관광' | '웰빙';
export type SortType = 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';

export interface RequestGetActivities {
  method: MethodType;
  cursorId?: number;
  category?: CategoryType;
  keyword?: string;
  sort?: SortType;
  page?: number;
  size?: number;
}

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
