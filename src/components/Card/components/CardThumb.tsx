import { cva } from 'class-variance-authority';
import Image from 'next/image';

import { cardType } from '../card-type';

import { cn } from '@/util/cn';

export const cardThumVariants = cva(
  'relative bg-gray-50 shrink-0 flex-none overflow-hidden',
  {
    variants: {
      type: {
        card: 'h-[142px] md:h-[287px] lg:h-[230px]',
        list: 'w-[98px] md:w-[130px] lg:w-[155px] ',
      },
    },
  }
);

interface CardThumbProps {
  type: cardType;
  bannerImageUrl: string;
  title: string;
}

export default function CardThumb({
  type,
  bannerImageUrl,
  title,
}: CardThumbProps) {
  return (
    <div className={cn(cardThumVariants({ type }))}>
      <Image
        src={bannerImageUrl}
        alt={title}
        fill
        className="object-cover object-center transition-transform duration-300 ease-out group-hover:scale-110"
      />
    </div>
  );
}
