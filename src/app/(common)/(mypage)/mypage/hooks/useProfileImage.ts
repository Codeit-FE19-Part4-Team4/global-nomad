import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { ResponseGetUsersMe } from '@/types/users';

/**
 * 프로필 이미지 상태 관리 Hook
 * - 이미지 파일 및 미리보기 관리
 * - React Query 업데이트로 실시간 반영
 */
export function useProfileImage(initialImageUrl?: string | null) {
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    initialImageUrl || null
  );

  useEffect(() => {
    if (initialImageUrl) {
      setProfileImagePreview(initialImageUrl);
    }
  }, [initialImageUrl]);

  useEffect(() => {
    return () => {
      if (profileImagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(profileImagePreview);
      }
    };
  }, [profileImagePreview]);

  const handleImageChange = useCallback(
    (file: File) => {
      setProfileImage(file);

      const previewUrl = URL.createObjectURL(file);

      setProfileImagePreview((prev) => {
        if (prev?.startsWith('blob:')) {
          URL.revokeObjectURL(prev);
        }
        return previewUrl;
      });

      queryClient.setQueryData<ResponseGetUsersMe>(
        ['user', 'me'],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            profileImageUrl: previewUrl,
          };
        }
      );
    },
    [queryClient]
  );

  const resetImage = useCallback(() => {
    setProfileImagePreview((prev) => {
      if (prev?.startsWith('blob:')) {
        URL.revokeObjectURL(prev);
      }
      return null;
    });
    setProfileImage(null);
  }, []);

  const updatePreview = useCallback(
    (url: string) => {
      setProfileImagePreview((prev) => {
        if (prev?.startsWith('blob:')) {
          URL.revokeObjectURL(prev);
        }
        return url;
      });

      queryClient.setQueryData<ResponseGetUsersMe>(
        ['user', 'me'],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            profileImageUrl: url,
          };
        }
      );
    },
    [queryClient]
  );

  return {
    profileImage,
    profileImagePreview,
    handleImageChange,
    resetImage,
    updatePreview,
  };
}
