import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { useState } from 'react';

import { cardType } from '../card-type';

import ImgEmpty from '@/assets/images/common/img-empty-thum.svg';
import { cn } from '@/util/cn';

export const cardThumVariants = cva(
  'relative bg-[#F6F6F6] shrink-0 flex-none overflow-hidden aspect-[16/9]',
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
  const [img, setImg] = useState<string>(bannerImageUrl);
  return (
    <div className={cn(cardThumVariants({ type }))}>
      <Image
        src={img}
        onError={() => setImg(ImgEmpty)}
        alt={title}
        fill
        className="left-1/2! -translate-x-1/2 object-cover object-center transition-transform duration-300 ease-out group-hover:scale-110"
        sizes="(max-width: 767px) 100%, (max-width: 1023px) 50%, 25%"
      />
    </div>
  );
}
