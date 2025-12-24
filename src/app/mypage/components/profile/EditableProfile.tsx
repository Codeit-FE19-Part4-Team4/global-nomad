'use client';

import Image from 'next/image';

import editProfile from '@/assets/icons/sidemenu/ic-edit.svg';
import Profile from '@/components/Profile';

function EditButton() {
  return (
    <label
      htmlFor="profile-upload"
      aria-label="프로필 이미지 수정"
      className="bg-primary absolute right-0.5 bottom-1 flex h-7.5 w-7.5 cursor-pointer items-center justify-center rounded-full">
      <Image src={editProfile} alt="" fill className="object-contain" />
    </label>
  );
}
interface EditableProfileProps {
  src?: string;
  onImageChange?: (file: File) => void;
}
export default function EditableProfile({
  src,
  onImageChange,
}: EditableProfileProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    // 파일 크기 제한 (예: 5MB)
    const MAX_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }
    onImageChange?.(file);
  };

  return (
    <div className="relative inline-block">
      <Profile src={src} size="lg" />
      <EditButton />
      <input
        id="profile-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
