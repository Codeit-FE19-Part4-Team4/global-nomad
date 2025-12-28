import { cva } from 'class-variance-authority';
import Image from 'next/image';

import { cardType } from './Card/card-type';

import starUrl from '@/assets/icons/main/ic-start-on.svg';

export const RatingAreaVariants = cva('flex items-center gap-0.5', {
  variants: {
    type: {
      card: null,
      list: 'mt-1 md:mt-[6px] lg:mt-2',
      default: 'gap-[4px]',
    },
  },
});
export const StartVariants = cva('', {
  variants: {
    type: {
      card: 'h-[11.25px] w-[11.25px] md:h-5 md:w-5',
      list: 'h-[14px] w-[14px] lg:h-4 lg:w-4',
      default: 'h-[16px] w-[16px]',
    },
  },
});
export const RatingVariants = cva('font-[var(--weight-title-sm)]', {
  variants: {
    type: {
      card: 'ml-[2px] text-[12px] text-gray-950 md:text-[14px] ',
      list: 'text-[13px] text-gray-500 md:text-[16px]',
      default: 'text-[14px] text-gray-700',
    },
  },
});
export const ReviewVariants = cva('', {
  variants: {
    type: {
      card: 'text-[12px] md:text-[14px] text-gray-400',
      list: 'text-[13px] md:text-[16px] text-gray-500',
      default: 'text-[14px] text-gray-700',
    },
  },
});

interface RatingSummaryProps {
  type?: cardType | 'default';
  rating: number;
  reviewCount: number;
}
/**
 * 평점을 표시하는 컴포넌트
 *
 * @param type cardType | 'default' 스타일
 * @param rating 별점
 * @param reviewCount 리뷰 수
 *
 * @example
  <RatingSummary
    type={type}
    rating={rating}
    reviewCount={reviewCount}
  />
 */
export default function RatingSummary({
  rating,
  reviewCount,
  type = 'default',
}: RatingSummaryProps) {
  return (
    <div className={RatingAreaVariants({ type })}>
      <Image src={starUrl} alt="" className={StartVariants({ type })} />
      <span className={RatingVariants({ type })}>{rating}</span>
      <span className={ReviewVariants({ type })}>({reviewCount})</span>
    </div>
  );
}
