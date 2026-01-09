import { cn } from '@/util/cn';
import { formatPrice } from '@/util/format';

interface CardPriceProps {
  price: number;
  headCount?: number;
}

export default function CardPrice({ price, headCount }: CardPriceProps) {
  return (
    <div className="-mr-6 flex flex-wrap items-center gap-[2px]">
      <span
        className={cn(
          'flex flex-nowrap text-[16px] font-[var(--weight-title-lg)] tracking-[-1px] whitespace-nowrap text-gray-950',
          'md:text-[18px]'
        )}>
        ₩ {formatPrice(price)}
      </span>
      <span
        className={cn(
          'mt-[2px] flex flex-nowrap text-[12px] tracking-[-1px] whitespace-nowrap text-gray-400',
          'md:mt-0 md:text-[16px]'
        )}>
        / {headCount ? headCount + '명' : '인'}
      </span>
    </div>
  );
}
