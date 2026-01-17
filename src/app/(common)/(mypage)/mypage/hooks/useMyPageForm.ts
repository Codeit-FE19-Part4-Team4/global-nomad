import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

import { useProfileImageContext } from '../context/ProfileImageContext';

import { useErrorHandler } from './useErrorHandler';
import { useFormState } from './useFormState';
import { createUpdatePayload } from './useMypageFormUtils';
import { useGetMyInfo, useUpdateMyInfo } from './useUser';

import { uploadProfileImage } from '@/api/users';

/**
 * 마이페이지 폼 관리 Hook
 * - 사용자 정보 조회 및 수정
 * - 폼 유효성 검사
 * - 비밀번호 선택적 업데이트
 * - 프로필 이미지 업로드
 */
export function useMyPageForm() {
  const queryClient = useQueryClient();
  const { handleError, handleImageUploadError, handleProfileUpdateError } =
    useErrorHandler();

  const {
    data: userData,
    isLoading: isInitialLoading,
    error: fetchError,
  } = useGetMyInfo();
  const { mutateAsync: updateProfile, isPending: isLoading } =
    useUpdateMyInfo();

  const {
    formData,
    errors,
    handleChange,
    updateFormData,
    resetPasswordFields,
    validate,
  } = useFormState();

  // Context에서 프로필 이미지 상태 가져오기
  const {
    profileImage,
    profileImagePreview,
    handleImageChange,
    resetImage,
    updatePreview,
  } = useProfileImageContext();

  // 사용자 정보 동기화
  useEffect(() => {
    if (!userData) return;

    updateFormData({
      nickname: userData.nickname,
      email: userData.email,
    });
  }, [userData, updateFormData]);

  // 초기 로딩 에러 처리
  useEffect(() => {
    if (!fetchError) return;

    console.error('사용자 정보 로딩 실패:', fetchError);
    handleError(fetchError);
  }, [fetchError, handleError]);

  const invalidateUserQueries = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] }),
      queryClient.invalidateQueries({ queryKey: ['user'] }),
    ]);
  }, [queryClient]);

  const handleSubmit = useCallback(async () => {
    if (!validate()) return;

    try {
      let uploadedImageUrl: string | undefined;

      // 이미지 업로드 처리
      if (profileImage) {
        try {
          const imageResult = await uploadProfileImage(profileImage);
          uploadedImageUrl = imageResult.profileImageUrl;
        } catch (error) {
          handleImageUploadError(error);
          return;
        }
      }

      const payload = createUpdatePayload(formData);

      if (uploadedImageUrl) {
        payload.profileImageUrl = uploadedImageUrl;
      }

      // 프로필 업데이트 처리
      try {
        await updateProfile(payload);
        await invalidateUserQueries();

        if (uploadedImageUrl) {
          updatePreview(uploadedImageUrl);
        }

        alert('저장되었습니다.');

        resetPasswordFields();
        resetImage();
      } catch (error) {
        handleProfileUpdateError(error);
      }
    } catch (error: unknown) {
      handleError(error, '저장 중 오류가 발생했습니다.');
    }
  }, [
    validate,
    profileImage,
    formData,
    updateProfile,
    invalidateUserQueries,
    updatePreview,
    resetPasswordFields,
    resetImage,
    handleError,
    handleImageUploadError,
    handleProfileUpdateError,
  ]);

  return {
    formData,
    errors,
    isLoading,
    isInitialLoading,
    profileImagePreview,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
}
