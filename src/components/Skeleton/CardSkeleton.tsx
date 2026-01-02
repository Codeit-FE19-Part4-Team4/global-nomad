import { cardThumVariants, skeletonBarVariants } from './skeleton-cva';
import { SkeletonProps } from './skeleton-type';

import { cardVariants, cardDetailVariants } from '@/components/Card/card-cva';
import { cn } from '@/util/cn';

/**
 * 로딩 상태에서 카드 UI를 대체하는 CardSkeleton 컴포넌트
 *
 * @example
 * <CardSkeleton /> 👉🏻 기본 카드형(card) 스켈레톤
 * <CardSkeleton type='list' /> 👉🏻 리스트형(list) 카드 스켈레톤
 */
export default function CardSkeleton({
  type = 'card',
  className,
}: SkeletonProps) {
  return (
    <div className={cn(cardVariants({ type }), className)}>
      {/* 섬네일 이미지 */}
      <div className={cn(cardThumVariants({ type }))} />

      {/* 텍스트 영역을 대체하는 Skeleton 막대 */}
      <div className={cn(cardDetailVariants({ type }))}>
        {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
          <div key={variant} className={cn(skeletonBarVariants({ variant }))} />
        ))}
      </div>
    </div>
  );
}
