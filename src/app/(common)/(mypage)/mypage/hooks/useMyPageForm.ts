import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';


import { useProfileImageContext } from '../context/ProfileImageContext';

import { useErrorHandler } from './useErrorHandler';
import { useFormState } from './useFormState';
import { createUpdatePayload } from './useMypageFormUtils';
import { useGetMyInfo, useUpdateMyInfo } from './useUser';

import { uploadProfileImage } from '@/api/users';
import { useToast } from '@/components/toast/useToast';
import { getApiErrorMessage } from '@/util/error';

// 에러 타입 체크 함수
function isUnauthorizedError(error: unknown): boolean {
  if (!error || typeof error !== 'object') {
    return false;
  }
  
  if (!('response' in error)) {
    return false;
  }
  
  const errorWithResponse = error as { response?: { status?: number } };
  return errorWithResponse.response?.status === 401;
}

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
  const router = useRouter();
  const toast = useToast();

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
    
    if (isUnauthorizedError(fetchError)) {
      toast.warning('로그인이 필요합니다.');
      router.push('/login');
    } else {
      handleError(fetchError);
    }
  }, [fetchError, handleError, toast, router]);

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

        toast.success('저장되었습니다!');

        resetPasswordFields();
        resetImage();
      } catch (error) {
        handleProfileUpdateError(error);
      }
    } catch (error: unknown) {
      console.error('저장 실패:', error);
      if (isUnauthorizedError(error)) {
        toast.warning('로그인이 필요합니다.');
        router.push('/login');
        return;
      }
      const errorMessage = getApiErrorMessage(error, '저장에 실패했습니다.');
      toast.error(errorMessage);
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
    handleImageUploadError,
    handleProfileUpdateError,
    toast,
    router,
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
