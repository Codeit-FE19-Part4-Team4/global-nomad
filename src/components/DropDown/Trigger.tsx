'use client';

import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { useEffect } from 'react';

import { useDropDownContext } from './index';

import IcoDropDown from '@/assets/icons/activities/ic-drop-down.svg';
import IcoDropUp from '@/assets/icons/activities/ic-drop-up.svg';
import IcoMore from '@/assets/icons/activities/ic-more.svg';
import { cn } from '@/util/cn';

// 트리거 스타일 정의
const triggerVariants = cva('flex items-center relative cursor-pointer ', {
  variants: {
    type: {
      menu: 'w-[28px] h-[28px] justify-center',
      filter: 'w-full h-[54px] pl-[20px] pr-[44px] rounded-[16px] border-none',
      select:
        'w-full h-[54px] pl-[20px] pr-[44px] rounded-[16px] border border-gray-100',
    },
  },
  defaultVariants: {
    type: 'select',
  },
});

// 텍스트 색상 정의
const textVariants = cva(
  'block text-[16px] overflow-hidden wrap-normal whitespace-nowrap',
  {
    variants: {
      color: {
        placeholder: 'text-gray-400',
        text: 'text-gray-950',
      },
    },
    defaultVariants: {
      color: 'text',
    },
  }
);

export type TriggerProps = {
  placeholder?: string;
  className?: string;
};

export default function Trigger({ placeholder, className }: TriggerProps) {
  const { isOpen, setIsOpen, currentItem, type } = useDropDownContext();
  const displayValue = currentItem || placeholder;
  const isPlaceholder = !currentItem;

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={cn(triggerVariants({ type: type }), className)}>
      {type !== 'menu' ? (
        <>
          <span
            className={textVariants({
              color: isPlaceholder ? 'placeholder' : 'text',
            })}>
            {displayValue}
          </span>
          <Image
            src={isOpen ? IcoDropUp : IcoDropDown}
            alt={isOpen ? '드롭다운 닫기' : '드롭다운 열기'}
            className="absolute right-5"
          />
        </>
      ) : (
        <Image src={IcoMore} alt="메뉴 더보기" />
      )}
    </button>
  );
}
