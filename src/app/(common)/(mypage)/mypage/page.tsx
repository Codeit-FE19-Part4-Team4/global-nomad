'use client';

import PageHeader from '../components/PageHeader';

import { useMyPageForm } from './hooks/useMyPageForm';

import Button from '@/components/Button';
import { TextInput, PasswordInput } from '@/components/Input';
import LoadingSpinner from '@/components/LoadingSpinner';

/**
 * 사용자 정보 수정 페이지
 * 프로필 이미지는 사이드메뉴에서 수정
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      handleSubmit();
    }
  };

  if (isInitialLoading) {
    return (
      <section>
        <LoadingSpinner />
      </section>
    );
  }

  return (
    <section>
      <header>
        <PageHeader
          title="내 정보"
          description="프로필 이미지, 닉네임, 비밀번호를 수정하실 수 있습니다."
        />
      </header>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <TextInput
          label="닉네임"
          placeholder="닉네임을 입력해주세요."
          value={formData.nickname}
          onChange={handleChange('nickname')}
          errorMessage={errors.nickname}
          disabled={isLoading}
        />

        <TextInput
          label="이메일"
          type="email"
          placeholder="이메일"
          value={formData.email}
          onChange={handleChange('email')}
          errorMessage={errors.email}
          disabled={true}
        />

        <PasswordInput
          label="비밀번호"
          placeholder="8자 이상 입력해 주세요"
          value={formData.password}
          onChange={handleChange('password')}
          errorMessage={errors.password}
          disabled={isLoading}
        />

        <PasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          value={formData.passwordConfirm}
          onChange={handleChange('passwordConfirm')}
          errorMessage={errors.passwordConfirm}
          disabled={isLoading}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="mt-6 w-full"
          disabled={isLoading}>
          {isLoading ? '저장 중...' : '저장하기'}
        </Button>
      </form>
    </section>
  );
}
