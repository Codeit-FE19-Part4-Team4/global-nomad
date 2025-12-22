'use client';

import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { useEffect } from 'react';
import IcoDropDown from '@/assets/icons/activities/ic-drop-down.svg';
import IcoDropUp from '@/assets/icons/activities/ic-drop-up.svg';
import IcoMore from '@/assets/icons/activities/ic-more.svg';
import { cn } from '@/util/cn';
import { useDropDownContext } from './index';

// 트리거 스타일 정의
const TriggerVariants = cva('flex items-center relative cursor-pointer ', {
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
  children?: React.ReactNode;
  placeholder?: string;
  className?: string;
};

export default function Trigger({
  children,
  placeholder,
  className,
}: TriggerProps) {
  const { open, toggle, item, type, setItem } = useDropDownContext();
  const value = item || placeholder || children;

  useEffect(() => {
    const val = typeof children === 'string' ? children : '';
    setItem(val);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      onClick={() => toggle(!open)}
      className={cn(TriggerVariants({ type: type }), className)}>
      {type !== 'menu' ? (
        <>
          <span
            className={textVariants({
              color: value === placeholder ? 'placeholder' : 'text',
            })}>
            {value}
          </span>
          <Image
            src={open ? IcoDropUp : IcoDropDown}
            alt=""
            className="absolute right-5"
          />
        </>
      ) : (
        <Image src={IcoMore} alt="메뉴 더보기" />
      )}
    </button>
  );
}
