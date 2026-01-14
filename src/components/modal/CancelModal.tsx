'use client';
import Image from 'next/image';

import Button from '../Button';

import imgWarning from '@/assets/images/common/img-warning.svg';
import { useModal } from '@/hooks/useModal';

interface CancelModalProps {
  message: string | React.ReactNode;
  rightBtnText: string;
  onConfirmDelete: () => Promise<void> | void;
  onCloseModal?: () => void;
}

const buttonStyle = 'h-[41px] w-[113px] md:h-[47px] md:w-[135px]';

export default function CancelModal({
  message,
  rightBtnText,
  onConfirmDelete,
  onCloseModal,
}: CancelModalProps) {
  const { closeModal } = useModal();
  return (
    <div className="bg-background h-fit w-[320px] rounded-3xl px-7.5 pt-7.5 pb-6 md:w-100 md:rounded-[30px] md:p-7.5">
      <div className="flex flex-col items-center gap-[20px] md:gap-6">
        <div className="flex flex-col items-center gap-0.5">
          <Image
            src={imgWarning}
            alt="경고"
            className="h-[49px] w-[49px] md:h-[88px] md:w-[88px]"
          />
          <div className="text-center text-[16px] font-bold **:text-center **:text-[18px] **:font-bold md:text-[18px]">
            {message}
          </div>
        </div>
        <div className="flex w-full justify-center gap-2 md:gap-3">
          <Button
            variant={'tertiary'}
            onClick={() => {
              onCloseModal?.();
              closeModal(CancelModal);
            }}
            className={buttonStyle}>
            아니오
          </Button>
          <Button
            variant={'primary'}
            onClick={onConfirmDelete}
            className={buttonStyle}>
            {rightBtnText}
          </Button>
        </div>
      </div>
    </div>
  );
}
