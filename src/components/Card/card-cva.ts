import { cva } from 'class-variance-authority';

import { cn } from '@/util/cn';

// 카드 card,list 타입별 형태
export const cardVariants = cva(
  'flex overflow-hidden cursor-pointer shadow-[0px_4px_24px_0px_#9CB4CA33] group',
  {
    variants: {
      type: {
        card: [
          'flex-col',
          'min-h-[242px] md:min-h-[423px] lg:min-h-[366px]',
          'rounded-[18px] lg:rounded-[32px]',
        ],
        list: [
          'flex-row',
          'min-h-[136px] md:min-h-[151px] lg:min-h-[181px]',
          'rounded-[24px] lg:rounded-[32px]',
        ],
      },
    },
  }
);

// 카드 상세 영역 스타일
export const cardDetailVariants = cva(
  'flex flex-col justify-between flex-1 min-w-0',
  {
    variants: {
      type: {
        card: ['py-[16px] px-[17px]', 'lg:py-[20px] lg:px-[30px]'],
        list: [
          'py-[23px] px-[20px]',
          'md:py-[20px] md:px-[37px]',
          'lg:py-[25px] lg:px-[38px]',
        ],
      },
    },
  }
);

// 카드 리스트(list 타입) 전체를 감싸는 wrapper
export const cardListWrap = cn('relative mb-[20px] md:mb-[30px] lg:mb-[24px]');

// list 타입 카드에서 사용되는 버튼 영역 위치
export const btnPosition = cn(
  'flex',
  'mt-[14px] gap-3',
  'md:bottom-[20px] md:right-[20px] md:mt-[0] md:gap-2 md:absolute',
  'lg:bottom-[25px] lg:right-[40px]'
);
