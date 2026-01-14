'use client';

import PageHeader from '../components/PageHeader';

import { useMyPageForm } from './hooks/useMyPageForm';

import Button from '@/components/Button';
import { TextInput, PasswordInput } from '@/components/Input';
import LoadingSpinner from '@/components/LoadingSpinner';

/**
 * 사용자 정보 수정 페이지
 * - 닉네임, 비밀번호 수정 기능 제공
 * - 이메일은 수정 불가 (조회만 가능)
 */
export default function MyPage() {
  const {
    formData,
    errors,
    isLoading,
    isInitialLoading,
    handleChange,
    handleSubmit,
  } = useMyPageForm();

  // 엔터키 입력 시 폼 제출
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  // 초기 데이터 로딩 중
  if (isInitialLoading) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-8">
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-8">
      {/* 페이지 헤더 */}
      <header className="mb-8">
        <PageHeader
          title="내 정보"
          description="닉네임과 비밀번호를 수정하실 수 있습니다."
        />
      </header>

      {/* 폼 입력 영역 */}
      <div className="space-y-4" onKeyDown={handleKeyDown}>
        {/* 닉네임 입력 */}
        <TextInput
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          value={formData.nickname}
          onChange={handleChange('nickname')}
          errorMessage={errors.nickname}
          disabled={isLoading}
        />

        {/* 이메일 (수정 불가) */}
        <TextInput
          label="이메일"
          type="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange('email')}
          errorMessage={errors.email}
          disabled={true}
        />

        {/* 비밀번호 입력 */}
        <PasswordInput
          label="비밀번호"
          placeholder="8자 이상 입력해 주세요"
          value={formData.password}
          onChange={handleChange('password')}
          errorMessage={errors.password}
          disabled={isLoading}
        />

        {/* 비밀번호 확인 입력 */}
        <PasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          value={formData.passwordConfirm}
          onChange={handleChange('passwordConfirm')}
          errorMessage={errors.passwordConfirm}
          disabled={isLoading}
        />

        {/* 저장 버튼 */}
        <Button
          variant="primary"
          size="lg"
          className="mt-6 w-full"
          onClick={handleSubmit}
          disabled={isLoading}>
          {isLoading ? '저장 중...' : '저장하기'}
        </Button>
      </div>
    </section>
  );
}
