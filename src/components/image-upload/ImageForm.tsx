'use client';
import Image from 'next/image';
import { useRef } from 'react';

import BasicModal from '../modal/BasicModal';

import ic_add from '@/assets/icons/activities/ic-plus.svg';
import ic_add_disable from '@/assets/icons/activities/icon_plus_disable.svg';
import { useModal } from '@/hooks/useModal';
import { cn } from '@/util/cn';
interface ImageFormProps {
  imgCount: number;
  maxImages: number;
  onSelectFiles: (files: FileList) => void;
  multiple?: boolean;
}

export default function ImageForm({
  imgCount = 0,
  maxImages,
  onSelectFiles,
  multiple = true,
}: ImageFormProps) {
  const { openModal, closeModal } = useModal();
  const inputRef = useRef<HTMLInputElement>(null);
  const disabled = imgCount === maxImages;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const remainImages = maxImages - imgCount;
    if (!files) return;
    if (files?.length > remainImages) {
      openModal({
        component: BasicModal,
        props: {
          message: `이미지는 최대 ${maxImages}개까지 등록 가능합니다.`,
          buttonText: '확인',
          onClick: () => closeModal(BasicModal),
        },
      });
      return;
    }
    onSelectFiles(files);
    //연속으로 같은 파일 선택시 onChange 이벤트를 트리거 하기 위해서 추가함
    e.target.value = '';
  };
  return (
    <button
      type="button"
      disabled={disabled}
      className={'inline-block h-fit w-fit'}
      onClick={() => inputRef.current?.click()}>
      {!disabled && (
        <input
          accept="image/*"
          multiple={multiple}
          ref={inputRef}
          type="file"
          className="peer sr-only"
          onChange={handleChange}
        />
      )}
      <div
        className={cn(
          'flex h-20 w-20 flex-col items-center justify-center gap-[1px] rounded-2xl border border-gray-100 text-gray-600 sm:h-32 sm:w-32 sm:gap-[10px]',
          disabled
            ? 'cursor-not-allowed bg-gray-200 opacity-50'
            : 'cursor-pointer'
        )}>
        <Image
          src={disabled ? ic_add_disable : ic_add}
          alt={disabled ? '이미지 추가 제한' : '이미지 추가'}
          className="h-10 w-10"
        />
        <span className="text-[14px] text-gray-600">
          {imgCount}/{maxImages}
        </span>
      </div>
    </button>
  );
}
