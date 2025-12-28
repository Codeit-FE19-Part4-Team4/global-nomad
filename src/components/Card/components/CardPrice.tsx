import { cn } from '@/util/cn';
import { formatPrice } from '@/util/format';

interface CardPriceProps {
  price: number;
  headCount?: number;
}

export default function CardPrice({ price, headCount }: CardPriceProps) {
  return (
    <div className="flex items-center gap-1">
      <span
        className={cn(
          'text-[16px] font-[var(--weight-title-lg)] tracking-[-0.5px] text-gray-950',
          'md:text-[18px]'
        )}>
        ₩{formatPrice(price)}
      </span>
      <span
        className={cn(
          'text-[14px] tracking-[-2px] text-gray-400',
          'md:text-[16px]'
        )}>
        / {headCount ? headCount + '명' : '인'}
      </span>
    </div>
  );
}
