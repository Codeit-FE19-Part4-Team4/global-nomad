import { cva } from 'class-variance-authority';

import { cardType } from '../card-type';

import { cn } from '@/util/cn';

export const cardTitleVariants = cva(
  'font-[var(--weight-title-lg)] text-gray-950 tracking-[var(--tracking-title-xl)] overflow-hidden line-clamp-2',
  {
    variants: {
      type: {
        card: [
          'mb-4px text-[14px] leading-[19px]',
          'md:mb-[2px] md:text-[18px] md:leading-[23px]',
          'lg:mb-[2px]',
        ],
        list: [
          'mb-4px text-[14px] leading-[17px]',
          'md:mb-[6px] md:text-[16px] md:leading-[17px]',
          'lg:mb-[10px] lg:text-[18px] lg:leading-[21px]',
        ],
      },
    },
  }
);

interface CardTitleProps {
  type: cardType;
  title: string;
  className?: string;
}

export default function CardTitle({ title, type, className }: CardTitleProps) {
  return (
    <div className={cn(cardTitleVariants({ type }), className)}>{title}</div>
  );
}
