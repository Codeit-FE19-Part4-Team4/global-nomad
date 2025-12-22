import { cva } from 'class-variance-authority';
import { cn } from '@/util/cn';
import Text from '../Text';

export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
const TitleVariants = cva(
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
    <Text as={as} className={cn(TitleVariants({ type }), className)}>
      {title}
    </Text>
  );
}
