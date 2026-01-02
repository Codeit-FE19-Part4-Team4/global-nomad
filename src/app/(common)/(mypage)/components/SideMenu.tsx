'use client';

import { useEffect, useState } from 'react';

import EditableProfile from '@/components/ProfileEditable';
import SideMenuNav from '@/components/SideMenu/SideMenuNav';

export default function SideMenu({ onClose }: { onClose?: () => void }) {
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
    <aside className="w-full flex-none rounded-lg bg-white px-3.5 py-4 md:w-45 md:border md:border-gray-100 md:py-6 md:shadow-[3px_3px_20px_3px_#eee] lg:w-72.5">
      <div className="flex flex-col items-center pb-4 md:pb-6">
        <EditableProfile src={profileImage} onImageChange={handleImageChange} />
      </div>
      <SideMenuNav onClose={onClose} />
    </aside>
  );
}
