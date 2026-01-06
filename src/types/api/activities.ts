/** ======================
 * Request Types
 ======================= */
export type methodType = 'offset' | 'cursor';
export type categoryType = '문화·예술' | '식음료' | '투어' | '관광' | '웰빙';
export type sortType = 'most_reviewed' | 'price_asc' | 'price_desc' | 'latest';

export interface RequestGetActivities {
  method: methodType;
  cursorId?: number;
  category?: categoryType;
  keyword?: string;
  sort?: sortType;
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
  category: categoryType;
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
