import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FormData, FormErrors } from './useMyPageFormTypes';
import { createUpdatePayload, isUnauthorizedError } from './useMypageFormUtils';
import { validateForm } from './useMyPageFormValidators';
import { useGetMyInfo, useUpdateMyInfo } from './useUser';

import { getApiErrorMessage } from '@/util/error';

/**
 * 마이페이지 폼 관리 Hook
 * - 사용자 정보 조회 및 수정
 * - 폼 유효성 검사
 * - 비밀번호 선택적 업데이트
 */
export function useMyPageForm() {
  const router = useRouter();

  // React Query: 사용자 정보 조회
  const {
    data: userData,
    isLoading: isInitialLoading,
    error: fetchError,
  } = useGetMyInfo();

  // React Query: 사용자 정보 수정
  const { mutateAsync: updateProfile, isPending: isLoading } =
    useUpdateMyInfo();

  // 폼 상태 관리
  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    nickname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  // 사용자 정보 동기화
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        nickname: userData.nickname,
        email: userData.email,
      }));
    }
  }, [userData]);

  // 에러 처리
  useEffect(() => {
    if (fetchError) {
      console.error('사용자 정보 로딩 실패:', fetchError);
      if (isUnauthorizedError(fetchError)) {
        alert('로그인이 필요합니다.');
        router.push('/signin');
      }
    }
  }, [fetchError, router]);

  /**
   * 입력 필드 변경 핸들러
   */
  const handleChange = (field: keyof FormData) => {
    return (value: string) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      // 입력 시 해당 필드 에러 초기화
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: '',
        }));
      }
    };
  };

  /**
   * 폼 유효성 검사
   */
  const validate = () => {
    const { errors: newErrors, isValid } = validateForm(formData);
    setErrors(newErrors);
    return isValid;
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const payload = createUpdatePayload(formData);
      await updateProfile(payload);
      alert('저장되었습니다.');

      // 비밀번호 필드 초기화
      setFormData((prev) => ({
        ...prev,
        password: '',
        passwordConfirm: '',
      }));
    } catch (error: unknown) {
      console.error('저장 실패:', error);
      if (isUnauthorizedError(error)) {
        alert('로그인이 필요합니다.');
        router.push('/signin');
        return;
      }
      const errorMessage = getApiErrorMessage(error, '저장에 실패했습니다.');
      alert(errorMessage);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    isInitialLoading,
    handleChange,
    handleSubmit,
  };
}
