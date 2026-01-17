import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { ApiError } from '@/config/client';

/**
 * 에러 처리 Hook
 * - API 에러 핸들링
 * - 401 Unauthorized 시 로그인 페이지 리다이렉트
 * - 사용자 친화적 에러 메시지 표시
 */
export function useErrorHandler() {
  const router = useRouter();

  /**
   * 일반 에러 처리
   */
  const handleError = useCallback(
    (error: unknown, fallbackMessage = '오류가 발생했습니다.') => {
      console.error('Error:', error);

      if (error instanceof ApiError) {
        // 401 Unauthorized - 로그인 페이지로 리다이렉트
        if (error.status === 401) {
          alert('로그인이 필요합니다.');
          localStorage.removeItem('accessToken');
          router.push('/login');
          return;
        }

        // 403 Forbidden
        if (error.status === 403) {
          alert('접근 권한이 없습니다.');
          return;
        }

        // 404 Not Found
        if (error.status === 404) {
          alert('요청한 리소스를 찾을 수 없습니다.');
          return;
        }

        // 409 Conflict
        if (error.status === 409) {
          alert(error.message || '이미 존재하는 데이터입니다.');
          return;
        }

        // 422 Validation Error
        if (error.status === 422) {
          alert(error.message || '입력 데이터를 확인해주세요.');
          return;
        }

        // 500 Internal Server Error
        if (error.status >= 500) {
          alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
          return;
        }

        // 기타 API 에러
        alert(error.message || fallbackMessage);
      } else if (error instanceof Error) {
        // 일반 JavaScript 에러
        alert(error.message || fallbackMessage);
      } else {
        // 알 수 없는 에러
        alert(fallbackMessage);
      }
    },
    [router]
  );

  /**
   * 이미지 업로드 에러 처리
   */
  const handleImageUploadError = useCallback(
    (error: unknown) => {
      console.error('Image upload error:', error);

      if (error instanceof ApiError) {
        if (error.status === 413) {
          alert('이미지 파일 크기가 너무 큽니다. (최대 4MB)');
          return;
        }

        if (error.status === 415) {
          alert('지원하지 않는 이미지 형식입니다. (JPG, PNG, GIF만 가능)');
          return;
        }
      }

      handleError(error, '이미지 업로드에 실패했습니다.');
    },
    [handleError]
  );

  /**
   * 프로필 업데이트 에러 처리
   */
  const handleProfileUpdateError = useCallback(
    (error: unknown) => {
      console.error('Profile update error:', error);

      if (error instanceof ApiError) {
        // 닉네임 중복
        if (error.status === 409) {
          alert('이미 사용 중인 닉네임입니다.');
          return;
        }

        // 비밀번호 형식 오류
        if (error.status === 400 && error.message?.includes('password')) {
          alert('비밀번호는 8자 이상이어야 합니다.');
          return;
        }
      }

      handleError(error, '프로필 수정에 실패했습니다.');
    },
    [handleError]
  );

  return {
    handleError,
    handleImageUploadError,
    handleProfileUpdateError,
  };
}
