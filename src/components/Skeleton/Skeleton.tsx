'use client';

import { cva } from 'class-variance-authority';

import { cardVariants, cardDetailVariants } from '@/components/Card/card-cva';
import { cardThumVariants } from '@/components/Card/components/CardThumb';
import {
  RatingAreaVariants,
  StarVariants,
  RatingVariants,
  ReviewVariants,
} from '@/components/RatingSummary';
import { cn } from '@/util/cn';

export type SkeletonType = 'card' | 'list' | 'review';

export interface SkeletonProps {
  type?: SkeletonType;
  className?: string;
}

const SKELETON_BASE = 'animate-pulse bg-gray-100 rounded';

// 리뷰 텍스트 라인 width 패턴 상수화
const REVIEW_TEXT_WIDTHS = ['w-full', 'w-full', 'w-3/4'] as const;

// 카드 스켈레톤 bar 사이즈 상수화
const SKELETON_BAR_SIZES = ['sm', 'md', 'lg'] as const;

// Skeleton 막대 스타일
export const skeletonBarVariants = cva(
  `${SKELETON_BASE} h-[14px] md:h-[17px] lg:h-[20px]`,
  {
    variants: {
      variant: {
        sm: 'w-1/3',
        md: 'w-1/2',
        lg: 'w-2/3',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  }
);

/**
 * 카드 로딩 상태를 표시하는 Skeleton 컴포넌트
 *
 * @example
 * <Skeleton /> 👉🏻 기본 카드형(card) 스켈레톤
 * <Skeleton type='list' /> 👉🏻 리스트형(list) 카드 스켈레톤
 * <Skeleton type='review' /> 👉🏻 리스트형(list) 리뷰 형태 스켈레톤
 */
export default function Skeleton({ type = 'card', className }: SkeletonProps) {
  // 리뷰 스켈레톤
  if (type === 'review') {
    return (
      <div className={cn(cardVariants({ type: 'list' }), className)}>
        <div className={cardDetailVariants({ type: 'list' })}>
          {/* 이름 + 날짜 */}
          <div className="mb-2 flex items-center gap-2">
            <div className={cn(SKELETON_BASE, 'h-5 w-16')} />
            <div className={cn(SKELETON_BASE, 'h-4 w-20')} />
          </div>

          {/* 별점 */}
          <div className={cn(RatingAreaVariants({ type: 'default' }), 'mb-3')}>
            <div
              className={cn(StarVariants({ type: 'default' }), SKELETON_BASE)}
            />
            <div
              className={cn(
                RatingVariants({ type: 'default' }),
                SKELETON_BASE,
                'w-6'
              )}>
              &nbsp;
            </div>
            <div
              className={cn(
                ReviewVariants({ type: 'default' }),
                SKELETON_BASE,
                'w-10'
              )}>
              &nbsp;
            </div>
          </div>

          {/* 리뷰 내용 */}
          <div className="space-y-2">
            {REVIEW_TEXT_WIDTHS.map((width, i) => (
              <div key={i} className={cn(SKELETON_BASE, 'h-4', width)} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 카드 및 리스트 스켈레톤
  return (
    <div className={cn(cardVariants({ type }), className)}>
      {/* 썸네일 */}
      <div className={cn(cardThumVariants({ type }), SKELETON_BASE)} />

      {/* 텍스트 영역 */}
      <div className={cardDetailVariants({ type })}>
        {SKELETON_BAR_SIZES.map((variant) => (
          <div key={variant} className={skeletonBarVariants({ variant })} />
        ))}
      </div>
    </div>
  );
}
