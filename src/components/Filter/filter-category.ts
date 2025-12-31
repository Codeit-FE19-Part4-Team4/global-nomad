/**
 * Filter 카테고리 상수
 * 메인 체험 필터에서 사용하는
 * 카테고리 라벨과 아이콘 매핑을 관리합니다.
 */

import IcArtActive from '@/assets/icons/activities/ic-art-active.svg';
import IcBusActive from '@/assets/icons/activities/ic-bus-active.svg';
import IcFoodActive from '@/assets/icons/activities/ic-food-active.svg';
import IcTourActive from '@/assets/icons/activities/ic-tour-active.svg';
import IcWellbeingActive from '@/assets/icons/activities/ic-wellbeing-active.svg';
import IcArt from '@/assets/icons/main/ic-art.svg';
import IcBus from '@/assets/icons/main/ic-bus.svg';
import IcFood from '@/assets/icons/main/ic-food.svg';
import IcTour from '@/assets/icons/main/ic-tour.svg';
import IcWellbeing from '@/assets/icons/main/ic-wellbeing.svg';

export const FILTER_CATEGORIES = [
  '문화·예술',
  '식음료',
  '투어',
  '관광',
  '웰빙',
] as const;

export const CATEGORY_ICON: Record<
  FilterCategoryType,
  {
    default: string;
    active: string;
  }
> = {
  '문화·예술': {
    default: IcArt,
    active: IcArtActive,
  },
  식음료: {
    default: IcFood,
    active: IcFoodActive,
  },
  투어: {
    default: IcTour,
    active: IcTourActive,
  },
  관광: {
    default: IcBus,
    active: IcBusActive,
  },
  웰빙: {
    default: IcWellbeing,
    active: IcWellbeingActive,
  },
};

export type FilterCategoryType = (typeof FILTER_CATEGORIES)[number];
