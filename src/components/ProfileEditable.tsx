'use client';

import Image from 'next/image';
import { useId } from 'react';

import editProfile from '@/assets/icons/sidemenu/ic-edit.svg';
import Profile from '@/components/Profile';

// 파일 크기 제한 (5MB)
const MAX_SIZE = 5 * 1024 * 1024;

const PROFILE_SIZE_CLASS = `
  h-[120px] w-[120px]
  md:h-[70px] md:w-[70px]
  lg:h-[120px] lg:w-[120px]
`;

interface EditableProfileProps {
  src?: string;
  onImageChange?: (file: File) => void;
  editable?: boolean;
}

export default function EditableProfile({
  src,
  onImageChange,
  editable = true,
}: EditableProfileProps) {
  const uniqueId = useId();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > MAX_SIZE) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }
    onImageChange?.(file);
  };

  return (
    <div className="relative inline-block">
      <Profile src={src} className={PROFILE_SIZE_CLASS} />

      {editable && (
        <>
          <label
            htmlFor={uniqueId}
            aria-label="프로필 이미지 수정"
            className="bg-primary absolute right-0 bottom-0 flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-full md:h-6 md:w-6 lg:h-7.5 lg:w-7.5">
            <Image src={editProfile} alt="" fill className="object-contain" />
          </label>
          <input
            id={uniqueId}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      )}
    </div>
  );
}
