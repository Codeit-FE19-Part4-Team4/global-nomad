'use client';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { login } from '@/api/auth';
import kakaoLogo from '@/assets/icons/auth/ic-kakao.svg';
import Button from '@/components/Button';
import { TextInput, PasswordInput } from '@/components/Input';
import BasicModal from '@/components/modal/BasicModal';
import { useToast } from '@/components/toast/useToast';
import { KAKAO_REST_API_KEY, KAKAO_REDIRECT_URI } from '@/config/oauth';
import { useGuestOnly } from '@/hooks/useGuestOnly';
import { useModal } from '@/hooks/useModal';
import { getApiErrorMessage } from '@/util/error';
import { validateEmail, validatePassword } from '@/util/validations';

export default function LoginPage() {
  useGuestOnly();

  const queryClient = useQueryClient();
  const { openModal, closeModal } = useModal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleKakaoLogin = () => {
    const url =
      'https://kauth.kakao.com/oauth/authorize' +
      `?client_id=${KAKAO_REST_API_KEY}` +
      `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}` +
      '&response_type=code' +
      '&state=login' +
      '&prompt=login';

    window.location.href = url;
  };

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('signupEmail');

    if (savedEmail) setEmail(savedEmail);

    sessionStorage.removeItem('signupEmail');
  }, []);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: !email ? '이메일을 입력해 주세요.' : validateEmail(email),
      password: !password
        ? '비밀번호를 입력해 주세요.'
        : validatePassword(password),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    try {
      const result = await login({ email, password });

      // 토큰 저장
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);

      // user 캐시 갱신
      await queryClient.invalidateQueries({ queryKey: ['user'] });

      router.push('/');
    } catch (err) {
      const errorMessage = getApiErrorMessage(
        err,
        '로그인 중 오류가 발생했습니다.'
      );
      // 비밀번호 불일치 케이스만 모달팝업으로 표현
      if (errorMessage.includes('비밀번호가 일치하지 않습니다')) {
        openModal({
          component: BasicModal,
          props: {
            message: '비밀번호가 일치하지 않습니다',
            buttonText: '확인',
            onClick: () => closeModal(BasicModal),
          },
        });
        // 에러 상태 초기화
        setErrors({ email: '', password: '' });
      } else if (
        errorMessage.includes('존재하지 않는') ||
        errorMessage.includes('찾을 수 없') ||
        errorMessage.includes('not found')
      ) {
        toast.error('등록되지 않은 이메일입니다');
      } else {
        toast.error('로그인에 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const isFormValid =
    email.length > 0 &&
    password.length > 0 &&
    !validateEmail(email) &&
    !validatePassword(password);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-7.5">
        <TextInput
          label="이메일"
          placeholder="example@email.com"
          value={email}
          onChange={setEmail}
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              email: validateEmail(email),
            }))
          }
          autoComplete="email"
          errorMessage={errors.email}
          required
          clearable
        />

        <PasswordInput
          label="비밀번호"
          placeholder="비밀번호 입력"
          value={password}
          onChange={setPassword}
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              password: validatePassword(password),
            }))
          }
          autoComplete="current-password"
          errorMessage={errors.password}
          required
        />

        <Button
          type="submit"
          size="lg"
          variant="primary"
          disabled={!isFormValid}>
          로그인
        </Button>
      </form>

      <div className="flex items-center gap-3.5 py-7.5">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-sm text-gray-600">or</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <Button
        type="button"
        size="lg"
        variant="secondary"
        className="w-full"
        onClick={handleKakaoLogin}>
        <Image src={kakaoLogo} alt="카카오로고" width={24} height={24} />
        카카오 로그인
      </Button>

      <p className="mt-6 text-center text-sm text-gray-400">
        회원이 아니신가요?{' '}
        <Link href="/signup" className="underline">
          회원가입
        </Link>
      </p>
    </>
  );
}
