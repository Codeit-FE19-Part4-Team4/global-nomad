'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import kakaoLogo from '@/assets/icons/auth/ic-kakao.svg';
import Button from '@/components/Button';
import { TextInput, PasswordInput } from '@/components/Input';
import { validateEmail, validatePassword } from '@/features/auth/validations';

export default function SignupPage() {
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validatePasswordConfirm = () => {
    if (!form.passwordConfirm) return '';
    return form.password === form.passwordConfirm
      ? ''
      : '비밀번호가 일치하지 않습니다.';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const passwordConfirmError = validatePasswordConfirm();

    setErrors({
      email: emailError,
      password: passwordError,
      passwordConfirm: passwordConfirmError,
    });

    if (emailError || passwordError || passwordConfirmError) return;

    console.log(form);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7.5">
        <TextInput
          label="이메일"
          placeholder="이메일을 입력해 주세요"
          value={form.email}
          onChange={handleChange('email')}
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              email: validateEmail(form.email),
            }))
          }
          autoComplete="email"
          errorMessage={errors.email}
          required
        />

        <TextInput
          label="닉네임"
          placeholder="닉네임을 입력해 주세요"
          value={form.nickname}
          onChange={handleChange('nickname')}
          required
        />

        <PasswordInput
          label="비밀번호"
          placeholder="8자 이상 입력해 주세요"
          value={form.password}
          onChange={handleChange('password')}
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              password: validatePassword(form.password),
            }))
          }
          autoComplete="new-password"
          errorMessage={errors.password}
          required
        />

        <PasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          value={form.passwordConfirm}
          onChange={handleChange('passwordConfirm')}
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              passwordConfirm: validatePasswordConfirm(),
            }))
          }
          autoComplete="new-password"
          errorMessage={errors.passwordConfirm}
          required
        />

        <Button type="submit" size="lg" variant="primary">
          회원가입
        </Button>
      </form>

      <div className="flex items-center gap-3.5 py-7.5">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-sm text-gray-600">SNS 계정으로 회원가입하기</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      <Button type="button" size="lg" variant="secondary" className="w-full">
        <Image src={kakaoLogo} alt="카카오로고" width={24} height={24} />
        카카오 회원가입
      </Button>

      <p className="mt-6 text-center text-sm text-gray-400">
        회원이신가요?{' '}
        <Link href="/login" className="underline">
          로그인하기
        </Link>
      </p>
    </>
  );
}
