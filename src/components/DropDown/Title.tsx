import { cva } from 'class-variance-authority';

import Text from '../Text';

import { cn } from '@/util/cn';

export type TextAs = 'h2' | 'h3' | 'h4' | 'p' | 'span';
const titleVariants = cva(
  'text-body-lg font-[var(--weight-title-lg)] mb-[10px] text-gray-950',
  {
    variants: {
      type: {
        category: 'text-title-sm mb-[12px]',
        apptTime: 'text-body-lg mb-[12px] lg:text-title-sm',
        time: 'font-[var(--weight-title-md)] hidden md:block',
      },
    },
  }
);

export type TitleType = 'category' | 'time' | 'apptTime';
export type TitleProps = {
  as: TextAs;
  title: string;
  className?: string;
  type: TitleType;
};

export default function Title({ as, title, className, type }: TitleProps) {
  return (
    <Text as={as} className={cn(titleVariants({ type }), className)}>
      {title}
    </Text>
  );
}
