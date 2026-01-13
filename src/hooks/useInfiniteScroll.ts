import { useEffect, RefObject } from 'react';

interface UseInfiniteScrollProps {
  loadMoreRef: RefObject<HTMLDivElement | null>; // 스크롤 감지할 DOM 요소 ref
  hasNextPage?: boolean; // 다음 페이지 존재 여부
  isFetchingNextPage: boolean; // 다음 페이지 로딩 중 여부
  fetchNextPage: () => void; // 다음 페이지 fetch 함수
}
/**
 * 무한 스크롤을 위한 Intersection Observer 훅
 * @description 지정된 요소가 화면에 보이면 자동으로 다음 페이지를 로드합니다
 */
export function useInfiniteScroll({
  loadMoreRef,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollProps) {
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // 요소가 화면에 보이고 && 다음 페이지가 있고 && 로딩중이 아닐 때
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, loadMoreRef]);
}
