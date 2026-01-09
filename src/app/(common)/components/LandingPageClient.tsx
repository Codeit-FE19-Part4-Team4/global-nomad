'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { getActivities } from '../../../api/activities';

import BannerActivities from './BannerActivities';
import BestActivities from './BestActivities';
import TotalActivities from './TotalActivities';

import Searchbar from '@/components/Searchbar';
import { SORT_OPTIONS } from '@/constants/activities';
import useWindowSize from '@/hooks/useWindowSize';
import {
  CategoryType,
  RequestGetActivities,
  SortType,
} from '@/types/activities';

export default function LandingPageClient() {
  const searchParams = useSearchParams();
  const initialKeyword = searchParams.get('search');
  const width = useWindowSize();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortType>('latest');
  const [selectedFilter, setSelectedFilter] = useState<CategoryType | null>(
    null
  );
  const [value, setValue] = useState(searchParams.get('search') ?? '');
  const [keyword, setKeyword] = useState<string | null>(initialKeyword);
  const [mounted, setMounted] = useState(false);
  const [allLength, setAllLength] = useState<number>(8);

  // 검색
  const handleSearch = () => {
    setSort('latest');
    setSelectedFilter(null);
    setPage(1);
    setKeyword(value);
  };

  // 배너 체험
  const bannerParams: RequestGetActivities = {
    method: 'offset',
    sort: 'price_desc',
    category: '투어',
    page: 1,
    size: 3,
  };
  const { data: bannerData } = useQuery({
    queryKey: ['activities', 'banner'],
    queryFn: () => getActivities(bannerParams),
  });

  // 인기 체험
  const bestParams: RequestGetActivities = {
    method: 'offset',
    sort: 'most_reviewed',
    page: 1,
    size: 8,
  };
  const { data: bestData, isLoading: isBestLoading } = useQuery({
    queryKey: ['activities', 'best'],
    queryFn: () => getActivities(bestParams),
  });

  // 모든 체험
  const allParams: RequestGetActivities = {
    method: 'offset',
    sort: sort,
    page: page,
    size: allLength,
    ...(selectedFilter && { category: selectedFilter }),
    ...(keyword && { keyword: keyword }),
  };
  const { data: allData, isLoading: isAllLoading } = useQuery({
    queryKey: [
      'activities',
      'all',
      page,
      allLength,
      sort,
      selectedFilter,
      keyword,
    ],
    queryFn: () => getActivities(allParams),
    enabled: !!allLength,
    placeholderData: (previousData) => previousData,
  });
  const totalPage = Math.ceil((allData?.totalCount ?? 0) / allLength);
  const handleClickPage = (page: number) => {
    setPage(page);
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted || width === undefined) return;
    if (width < 768) {
      setAllLength(6);
    } else if (width < 1024) {
      setAllLength(4);
    } else {
      setAllLength(8);
    }
  }, [mounted, width]);

  useEffect(() => {
    const search = searchParams.get('search');
    if (!search) {
      setValue('');
      setKeyword(null);
    }
  }, [searchParams]);

  return (
    <>
      {/* 배너 */}
      <BannerActivities data={bannerData?.activities} />

      {/* 검색영역 */}
      <Searchbar
        title="무엇을 체험하고 싶으신가요?"
        placeholder="검색어를 입력하세요"
        onSearch={handleSearch}
        value={value}
        setValue={setValue}
      />

      {/* 인기 체험 */}
      {!keyword && (
        <BestActivities data={bestData?.activities} isLoading={isBestLoading} />
      )}

      {/* 모든 체험 */}
      <TotalActivities
        data={allData?.activities}
        isLoading={isAllLoading}
        currentPage={page}
        totalCount={allData?.totalCount}
        totalPage={totalPage}
        pagesPerGroup={allLength}
        handleClickPage={handleClickPage}
        keyword={keyword}
        sort={sort}
        setSort={setSort}
        setPage={setPage}
        SORT_OPTIONS={SORT_OPTIONS}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
    </>
  );
}
