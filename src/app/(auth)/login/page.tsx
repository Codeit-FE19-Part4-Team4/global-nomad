'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import kakaoLogo from '@/assets/icons/auth/ic-kakao.svg';
import Button from '@/components/Button';
import { TextInput, PasswordInput } from '@/components/Input';
import { login } from '@/features/auth/apis/login';
import { validateEmail, validatePassword } from '@/features/auth/validations';
import { useGuestOnly } from '@/hooks/useGuestOnly';

export default function LoginPage() {
  useGuestOnly();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const savedEmail = sessionStorage.getItem('signupEmail');

    if (savedEmail) setEmail(savedEmail);

    // 사용 후 제거
    sessionStorage.removeItem('signupEmail');
  }, []);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

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

      // TODO: 보안 강화를 위해
      // refreshToken → httpOnly cookie
      // accessToken → memory 관리 방식으로 변경 예정

      // 토큰 저장
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('refreshToken', result.refreshToken);

      router.push('/');
    } catch (err) {
      if (err instanceof Error) {
        setErrors({
          email: '',
          password: err.message,
        });
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

      <Button type="button" size="lg" variant="secondary" className="w-full">
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
