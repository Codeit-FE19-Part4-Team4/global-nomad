import { Dispatch, SetStateAction } from 'react';

import ExperienceCard from '@/components/Card/ExperienceCard';
import {
  DropDown,
  DropDownItem,
  DropDownList,
  DropDownTrigger,
} from '@/components/DropDown';
import EmptyState from '@/components/EmptyState';
import Filter from '@/components/Filter/Filter';
import { FILTER_CATEGORIES } from '@/components/Filter/filter-category';
import Pagination from '@/components/Pagination';
import Skeleton from '@/components/Skeleton/Skeleton';
import { ActivityType, CategoryType, SortType } from '@/types/activities';
import { cn } from '@/util/cn';

interface TotalActivitiesProp {
  data: ActivityType[] | undefined;
  isLoading: boolean;
  currentPage: number;
  totalCount: number | undefined;
  totalPage: number;
  pagesPerGroup: number;
  handleClickPage: (page: number) => void;
  keyword: string | null;
  sort: SortType;
  setSort: Dispatch<SetStateAction<SortType>>;
  setPage: Dispatch<SetStateAction<number>>;
  selectedFilter: CategoryType | null;
  setSelectedFilter: Dispatch<SetStateAction<CategoryType | null>>;
  SORT_OPTIONS: Record<string, string>;
}

export default function TotalActivities({
  data = [],
  isLoading,
  currentPage,
  totalCount,
  totalPage,
  pagesPerGroup,
  handleClickPage,
  keyword,
  sort,
  setSort,
  selectedFilter,
  setSelectedFilter,
  setPage,
  SORT_OPTIONS,
}: TotalActivitiesProp) {
  const displayLabel =
    Object.entries(SORT_OPTIONS).find(
      ([label, value]) => value === sort
    )?.[0] || '최신순';
  const handleFilter = (filter: CategoryType | null) => {
    setSelectedFilter(filter);
    setPage(1);
    setSort('latest');
  };
  return (
    <div className="mb-[130px] md:mb-[200px]">
      {/* 타이틀 */}
      {!keyword ? (
        /* 검색 전 타이틀 + 필터 + 검색소팅 */
        <div className="relative">
          <h2 className="title-sm lg:title-lg flex h-10 items-center font-[var(--weight-title-lg)]">
            🛼 모든 체험
          </h2>
          <div className="absolute top-0 right-0 lg:top-15">
            <DropDown type="filter" value={displayLabel}>
              <DropDownTrigger />
              <DropDownList>
                {Object.entries(SORT_OPTIONS).map(([label, value]) => {
                  return (
                    <DropDownItem
                      key={value}
                      onSelect={() => setSort(value as SortType)}>
                      {label}
                    </DropDownItem>
                  );
                })}
              </DropDownList>
            </DropDown>
          </div>
          <div
            className={cn(
              'mt-2.5 -mr-[24px] flex gap-2 overflow-x-auto pr-[24px]',
              'md:mt-4 md:mr-0 md:gap-5 md:pr-0',
              'lg:mt-5',
              '[&::-webkit-scrollbar]:h-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-transparent'
            )}>
            {FILTER_CATEGORIES.map((filter, i) => {
              const isSelected = filter === selectedFilter;
              return (
                <Filter
                  category={filter}
                  key={i}
                  onClick={() => {
                    handleFilter(isSelected ? null : filter);
                  }}
                  selected={isSelected}>
                  {filter}
                </Filter>
              );
            })}
          </div>
        </div>
      ) : (
        /* 검색 후 타이틀 */
        <div className="mt-7.5 md:mt-10 lg:mt-15">
          <h2 className="lg:title-lg text-lg">
            <strong className="font-[var(--weight-title-lg)]">{keyword}</strong>
            으로 검색한 결과입니다.
          </h2>
          <div className="body-sm mt-2.5 text-gray-700 md:text-lg">
            총 {totalCount}개의 결과
          </div>
        </div>
      )}

      {/* 로딩 전 스켈렌톤 UI */}
      {isLoading ? (
        <div
          className={cn(
            '-mx-[28px] flex flex-wrap gap-4.5 overflow-hidden px-[28px] pt-[24px] pb-6',
            'md:gap-5 md:pt-[30px] md:pb-7.5',
            'lg:gap-6 lg:pb-7.5'
          )}>
          {Array.from({ length: pagesPerGroup }).map((_, idx) => (
            <Skeleton
              key={idx}
              className={cn(
                'w-[calc((100%-18px)/2)] md:w-[calc((100%-20px)/2)] lg:w-[calc((100%-24px*3)/4)]'
              )}
            />
          ))}
        </div>
      ) : (
        <>
          {/* 데이터 있는 경우 */}
          {data.length > 0 ? (
            <>
              <div
                className={cn(
                  '-mx-[28px] flex flex-wrap gap-4.5 overflow-hidden px-[28px] pt-[24px] pb-6',
                  'md:gap-5 md:pt-[30px] md:pb-7.5',
                  'lg:gap-6 lg:pb-7.5'
                )}>
                {data.map((item) => {
                  return (
                    <ExperienceCard
                      key={item.id}
                      item={item}
                      className={cn(
                        'w-[calc((100%-18px)/2)] md:w-[calc((100%-20px)/2)] lg:w-[calc((100%-24px*3)/4)]'
                      )}
                    />
                  );
                })}
              </div>
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPage={totalPage}
                  pagesPerGroup={pagesPerGroup}
                  handleClickPage={handleClickPage}
                />
              </div>
            </>
          ) : (
            /* 데이터 없는 경우 */
            <div className="flex w-full justify-center">
              <EmptyState
                description={
                  keyword
                    ? '검색된 체험이 없어요.'
                    : '아직 등록된 체험이 없어요.'
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
