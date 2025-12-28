import { cn } from '@/util/cn';

export default function PageButton({
  page,
  isClicked = false,
  onClick,
}: {
  page: number;
  isClicked?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-10 w-10 cursor-pointer items-center justify-center p-2',
        isClicked
          ? 'bg-primary-100 border-primary-500 border-b-2'
          : 'bg-background'
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
