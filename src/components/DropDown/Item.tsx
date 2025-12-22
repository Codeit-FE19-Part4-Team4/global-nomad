import { cva } from 'class-variance-authority';

import { useDropDownContext } from './index';

import { cn } from '@/util/cn';

const ItemVariants = cva(
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
  children: React.ReactNode;

  onSelect?: (value: string) => void;
};

export default function Item({ children, onSelect }: ItemProps) {
  const { item, setItem, toggle, open, type } = useDropDownContext();

  const value = typeof children === 'string' ? children : '';

  const handleClickItem = () => {
    toggle(!open);
    setItem(value);
    onSelect?.(value); //params 조작 or 데이터 페칭에 필요한 함수
  };

  return (
    <li>
      <button
        onClick={handleClickItem}
        className={cn(
          ItemVariants({ type }),
          item === value && 'bg-primary-100'
        )}>
        {children}
      </button>
    </li>
  );
}
