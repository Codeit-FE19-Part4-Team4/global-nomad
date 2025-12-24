/**
 * Dropdown 상수
 * Dropdown 옵션값을 관리합니다.
 */

// 체험리스트 카테고리
export const CATEGORY_OPTIONS: string[] = [
  '문화 · 예술',
  '식음료',
  '스포츠',
  '투어',
  '관광',
  '웰빙',
];

// 체험리스트 필터
export interface FilterOption {
  label: string;
  value: string;
}
export const FILTER_OPTIONS: FilterOption[] = [
  { label: '최신순', value: 'latest' },
  { label: '가격순', value: 'price_desc' },
];
