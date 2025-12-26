import { cva } from 'class-variance-authority';
import Image from 'next/image';

import { cardType } from './Card/card-type';

import starUrl from '@/assets/icons/main/ic-start-on.svg';

export const RatingAreaVariants = cva('flex items-center gap-0.5', {
  variants: {
    type: {
      card: ' ',
      list: 'mt-1 md:mt-[6px] lg:mt-2',
    },
  },
});
export const StartVariants = cva('', {
  variants: {
    type: {
      card: 'h-[11.25px] w-[11.25px] md:h-5 md:w-5',
      list: 'h-[14px] w-[14px] lg:h-4 lg:w-4',
    },
  },
});
export const RatingVariants = cva('font-[var(--weight-title-sm)]', {
  variants: {
    type: {
      card: 'ml-[2px] text-[12px] text-gray-950 md:text-[14px] ',
      list: 'text-[13px] text-gray-500 md:text-[16px]',
    },
  },
});
export const ReviewVariants = cva('', {
  variants: {
    type: {
      card: 'text-[12px] md:text-[14px] text-gray-400',
      list: 'text-[13px] md:text-[16px] text-gray-500',
    },
  },
});

interface RatingSummaryProps {
  type: cardType;
  rating: number;
  reviewCount: number;
}

export default function RatingSummary({
  rating,
  reviewCount,
  type,
}: RatingSummaryProps) {
  return (
    <div className={RatingAreaVariants({ type })}>
      <Image src={starUrl} alt="" className={StartVariants({ type })} />
      <span className={RatingVariants({ type })}>{rating}</span>
      <span className={ReviewVariants({ type })}>({reviewCount})</span>
    </div>
  );
}
