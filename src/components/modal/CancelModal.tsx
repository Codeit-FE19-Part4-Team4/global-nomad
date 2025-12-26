'use client';
import Image from 'next/image';

import Button from '../Button';

import { useModal } from './useModal';

import imgWarning from '@/assets/images/common/img-warning.svg';
interface CancelModalProps {
  message: string;
  rightBtnText: string;
  onClickRightBtn: () => void;
}

const buttonStyle = 'h-[41px] w-[113px] sm:h-[47px] sm:w-[135px]';

export default function CancelModal({
  message,
  rightBtnText,
  onClickRightBtn,
}: CancelModalProps) {
  const { closeModal } = useModal();
  return (
    <div className="bg-background h-fit w-[320px] rounded-3xl px-7.5 pt-7.5 pb-6 sm:w-100 sm:rounded-[30px] sm:p-7.5">
      <div className="flex flex-col items-center gap-[20px] sm:gap-6">
        <div className="flex flex-col items-center gap-0.5">
          <Image
            src={imgWarning}
            alt="경고"
            className="h-[49px] w-[49px] sm:h-[88px] sm:w-[88px]"
          />
          <span className="text-[16px] font-bold sm:text-[18px]">
            {message}
          </span>
        </div>
        <div className="flex w-full justify-center gap-2 sm:gap-3">
          <Button
            variant={'tertiary'}
            onClick={() => closeModal(CancelModal)}
            className={buttonStyle}>
            아니오
          </Button>
          <Button
            variant={'primary'}
            onClick={onClickRightBtn}
            className={buttonStyle}>
            {rightBtnText}
          </Button>
        </div>
      </div>
    </div>
  );
}
