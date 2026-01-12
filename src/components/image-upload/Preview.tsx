'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import type { InitialImages } from './UploadImageList';

import ic_delete from '@/assets/icons/activities/ic-image-delete.svg';

interface PreviewProps {
  file?: File;
  label: string;
  onDelete: (file: File | number | string) => void;
  initImages?: InitialImages;
}
export default function Preview({
  file,
  label,
  onDelete,
  initImages,
}: PreviewProps) {
  const [url, setUrl] = useState<null | string>(initImages?.imageUrl || null);

  useEffect(() => {
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setUrl(objectURL);

      return () => {
        URL.revokeObjectURL(objectURL);
      };
    } else if (initImages?.imageUrl) {
      setUrl(initImages.imageUrl);
    }
  }, [file, initImages]);

  if (!url) {
    return null;
  }

  return (
    <div className="relative rounded-2xl border border-gray-100">
      <div className="relative h-20 w-20 md:h-[126px] md:w-[126px]">
        <Image
          fill
          src={url}
          alt={`${label}`}
          className="rounded-2xl object-cover"
          sizes="(max-width: 126px) 126px, 126px"
          unoptimized
        />
      </div>
      <button
        type="button"
        onClick={() => {
          if (file) {
            onDelete(file);
          } else if (initImages) {
            onDelete(initImages.id);
          }
        }}
        className="absolute top-[-4px] right-[-4px] cursor-pointer">
        <Image src={ic_delete} alt="이미지 삭제" />
      </button>
    </div>
  );
}
