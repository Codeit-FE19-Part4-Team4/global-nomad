import { cva } from 'class-variance-authority';

import { useDropDownContext } from './index';

import { cn } from '@/util/cn';

const itemVariants = cva(
  'w-full text-[16px] cursor-pointer overflow-hidden wrap-normal whitespace-nowrap hover:bg-primary-100',
  {
    variants: {
      type: {
        menu: 'h-[44px] rounded-[8px] text-center',
        filter: 'h-[48px] rounded-[16px] text-left px-[20px]',
        select: 'h-[48px] rounded-[16px] text-left px-[20px]',
      },
    },
    defaultVariants: {
      type: 'select',
    },
  }
);

export type ItemProps = {
  children: string;
  onSelect?: (value: string) => void;
};

export default function Item({ children, onSelect }: ItemProps) {
  const { currentItem, setCurrentItem, setIsOpen, type } = useDropDownContext();
  const value = children;

  const handleClickItem = () => {
    setIsOpen(false);
    setCurrentItem(value);
    onSelect?.(value); //params 조작 or 데이터 페칭에 필요한 함수
  };

  return (
    <li>
      <button
        onClick={handleClickItem}
        className={cn(
          itemVariants({ type }),
          currentItem === value && 'bg-primary-100'
        )}>
        {children}
      </button>
    </li>
  );
}
