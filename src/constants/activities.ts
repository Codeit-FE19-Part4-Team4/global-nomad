import { SortType } from '@/types/activities';

export const SORT_OPTIONS: Record<string, SortType> = {
  최신순: 'latest',
  '가격 낮은순': 'price_asc',
  '가격 높은순': 'price_desc',
  인기순: 'most_reviewed',
};

// 예약 시간
export const TIME_OPTIONS = [
  '0:00',
  '1:00',
  '2:00',
  '3:00',
  '4:00',
  '5:00',
  '6:00',
  '7:00',
  '8:00',
  '9:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];
