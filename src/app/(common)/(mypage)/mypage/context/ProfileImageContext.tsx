'use client';

import { createContext, useContext, ReactNode } from 'react';

interface ProfileImageContextValue {
  profileImage: File | null;
  profileImagePreview: string | null;
  handleImageChange: (file: File) => void;
  resetImage: () => void;
  updatePreview: (url: string) => void;
}

const ProfileImageContext = createContext<ProfileImageContextValue | null>(
  null
);

export function ProfileImageProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: ProfileImageContextValue;
}) {
  return (
    <ProfileImageContext.Provider value={value}>
      {children}
    </ProfileImageContext.Provider>
  );
}

export function useProfileImageContext() {
  const context = useContext(ProfileImageContext);
  if (!context) {
    throw new Error(
      'useProfileImageContext must be used within ProfileImageProvider'
    );
  }
  return context;
}
