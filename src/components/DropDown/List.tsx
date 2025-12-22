import { cva } from 'class-variance-authority';
import { useDropDownContext } from './index';

const ListVariants = cva(
  'absolute flex flex-col align gap-1 text-text-primary max-h-[250px] overflow-x-hidden overflw-y-auto border-gray-100 border bg-white z-10',
  {
    variants: {
      type: {
        menu: 'p-[6px] top-0 right-5 rounded-[8px] w-[95px]',
        filter: 'p-[12px] top-[64px] left-0 rounded-[16px] w-full',
        select: 'p-[12px] top-[64px] left-0 rounded-[16px] w-full',
      },
    },
    defaultVariants: {
      type: 'select',
    },
  }
);

export type ListProps = {
  children: React.ReactNode;
};

export default function List({ children }: ListProps) {
  const { open, type } = useDropDownContext();
  return open && <ul className={ListVariants({ type })}>{children}</ul>;
}
