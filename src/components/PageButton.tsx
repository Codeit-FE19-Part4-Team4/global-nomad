import { cn } from '@/util/cn';

interface PageButtonProps {
  page: number;
  isClicked?: boolean;
  onClick?: () => void;
}

export default function PageButton({
  page,
  isClicked = false,
  onClick,
}: PageButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-10 w-10 cursor-pointer items-center justify-center border-b-2 p-2',
        isClicked
          ? 'bg-primary-100 border-primary-500'
          : 'bg-background border-background'
      )}>
      <span
        className={cn(
          isClicked ? 'bold text-primary-500' : 'text-gray-300',
          'text-[14px]'
        )}>
        {page}
      </span>
    </button>
  );
}
