'use client';

import Image from 'next/image';
import { forwardRef } from 'react';

import { CATEGORY_ICON, type FilterCategoryType } from './filter-category';
import { filterStyle } from './filter.cva';

interface FilterProps {
  /** 선택 상태 */
  selected?: boolean;
  /** 카테고리 (아이콘 표시용) */
  category?: FilterCategoryType;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 버튼 라벨 */
  children: React.ReactNode;
}

/**
 * 필터 버튼 컴포넌트
 *
 * @example
 * <Filter>전체</Filter> 👉🏻 기본
 * <Filter selected> 선택됨 </Filter> 👉🏻 선택 상태
 * <Filter category="문화·예술"> 문화·예술 </Filter> 👉🏻 아이콘 포함
 */
const Filter = forwardRef<HTMLButtonElement, FilterProps>(
  ({ children, selected = false, category, onClick }, ref) => {
    const icon = category && CATEGORY_ICON[category];

    return (
      <button
        ref={ref}
        type="button"
        className={filterStyle({ selected })}
        onClick={onClick}>
        {icon && (
          <Image
            src={selected ? icon.active : icon.default}
            alt=""
            width={24}
            height={24}
          />
        )}
        {children}
      </button>
    );
  }
);

Filter.displayName = 'Filter';

export default Filter;
