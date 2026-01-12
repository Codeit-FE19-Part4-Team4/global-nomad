import Skeleton from '@/components/Skeleton/Skeleton';

interface Props {
  count?: number;
}

/**
 * 예약 목록 로딩 상태 컴포넌트
 *
 * - 스켈레톤 UI 표시
 * - 기본 4개 스켈레톤 렌더링
 */
export default function ReservationLoadingState({ count = 4 }: Props) {
  return (
    <div className="mt-7.5 space-y-6 pb-24 md:w-full">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} type="list" />
      ))}
    </div>
  );
}
