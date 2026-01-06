'use client';

import Image from 'next/image';

import { ScheduleBtnProp } from '../schedule-type';

import IcoDelete from '@/assets/icons/activities/ic-minus.svg';
import IcoAdd from '@/assets/icons/activities/ic-plus-white.svg';
import { cn } from '@/util/cn';

export function ScheduleBtn({ isDraft, onClick }: ScheduleBtnProp) {
  return (
    <div
      className={cn(
        isDraft && 'box-content pt-0 md:pt-[29px]',
        'flex min-h-[54px] shrink-0 items-center'
      )}>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-[50%]',
          'md:h-[42px] md:w-[42px]',
          isDraft ? 'bg-primary-500' : 'bg-gray-50'
        )}>
        <Image
          src={isDraft ? IcoAdd : IcoDelete}
          alt={isDraft ? '추가' : '삭제'}
        />
      </button>
    </div>
  );
}
