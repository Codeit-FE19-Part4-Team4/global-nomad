'use client';

import { useState } from 'react';

import EditableProfile from '../profile/EditableProfile';

import SidebarNav from './SidebarNav';

export default function Sidebar() {
  const [profileImage, setProfileImage] = useState<string>();

  const handleImageChange = async (file: File) => {
    // TODO: 서버에 이미지 업로드 로직
    console.log('Upload file:', file);

    // 임시 미리보기
    const preview = URL.createObjectURL(file);
    setProfileImage(preview);
  };

  return (
    <aside className="w-64 rounded-lg bg-white px-3.5 py-6">
      <div className="flex flex-col items-center pb-6">
        <EditableProfile src={profileImage} onImageChange={handleImageChange} />
      </div>
      <SidebarNav />
    </aside>
  );
}
