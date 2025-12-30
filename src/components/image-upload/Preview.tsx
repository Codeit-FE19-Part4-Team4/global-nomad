'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import ic_delete from '@/assets/icons/activities/ic-image-delete.svg';

interface PreviewProps {
  file: File;
  label: string;
  onDelete: (file: File) => void;
}
export default function Preview({ file, label, onDelete }: PreviewProps) {
  const handleDelete = (file: File) => {
    onDelete(file);
  };
  const [url, setUrl] = useState<null | string>(null);

  useEffect(() => {
    const objectURL = URL.createObjectURL(file);
    setUrl(objectURL);

    return () => {
      URL.revokeObjectURL(objectURL);
    };
  }, [file]);

  if (!url) {
    return null;
  }

  return (
    <div className="relative rounded-2xl border border-gray-100">
      <div className="relative h-20 w-20 sm:h-[126px] sm:w-[126px]">
        <Image
          fill
          src={url}
          alt={`${label}`}
          className="h-[126px] w-[126px] rounded-2xl object-cover"
        />
      </div>
      <button
        onClick={() => handleDelete(file)}
        className="absolute top-[-4px] right-[-4px] cursor-pointer">
        <Image src={ic_delete} alt="이미지 삭제" />
      </button>
    </div>
  );
}
