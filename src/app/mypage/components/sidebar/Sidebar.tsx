'use client';

import { useEffect, useState } from 'react';

import EditableProfile from '../profile/EditableProfile';

import SidebarNav from './SidebarNav';

export default function Sidebar() {
  const [profileImage, setProfileImage] = useState<string>();

  const handleImageChange = (file: File) => {
    const preview = URL.createObjectURL(file);
    setProfileImage(preview);
  };

  useEffect(() => {
    return () => {
      if (profileImage) {
        URL.revokeObjectURL(profileImage);
      }
    };
  }, [profileImage]);

  return (
    <aside className="w-full rounded-lg bg-white px-3.5 py-4 md:w-45 md:py-6 lg:w-72.5">
      <div className="flex flex-col items-center pb-4 md:pb-6">
        <EditableProfile src={profileImage} onImageChange={handleImageChange} />
      </div>
      <SidebarNav />
    </aside>
  );
}
