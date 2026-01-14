import Button from '@/components/Button';
import ExperienceManageCard from '@/components/Card/ExperienceManageCard';
import EmptyState from '@/components/EmptyState';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { ActivityType } from '@/types/activities';
import { cn } from '@/util/cn';

interface MyActivitiesClientProps {
  data: ActivityType[];
  onDelete: (id: number) => void;
  onCreate: () => void;
  onEdit: (id: number) => void;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function MyActivitiesClient({
  data,
  onDelete,
  onCreate,
  onEdit,
  loadMoreRef,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: MyActivitiesClientProps) {
  useInfiniteScroll({
    loadMoreRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
  return (
    <>
      {/* 내 체험 목록 있을 경우 */}
      {data.length > 0 ? (
        <>
          {/* 체험 등록하기 */}
          <Button
            type="button"
            variant="primary"
            size="lg"
            className={cn(
              'mb-5 h-12 w-full',
              'md:absolute md:top-0 md:right-0 md:mb-0 md:w-34.5'
            )}
            onClick={onCreate}>
            체험 등록하기
          </Button>

          {/* 내 체험 목록 */}
          <div>
            {data.map((item) => {
              return (
                <ExperienceManageCard
                  key={item.id}
                  item={item}
                  onEdit={() => onEdit(item.id)}
                  onDelete={() => onDelete(item.id)}
                />
              );
            })}
            <div ref={loadMoreRef} className="h-3" />
          </div>
        </>
      ) : (
        // 내 체험 목록 없을 경우
        <EmptyState
          description="아직 등록한 체험이 없어요."
          buttonText="체험 등록하기"
          buttonHref="/activity/post"
        />
      )}
    </>
  );
}
