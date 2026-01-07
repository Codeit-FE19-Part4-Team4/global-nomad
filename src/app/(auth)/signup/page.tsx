'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import kakaoLogo from '@/assets/icons/auth/ic-kakao.svg';
import Button from '@/components/Button';
import { TextInput, PasswordInput } from '@/components/Input';
import {
  validateEmail,
  validatePassword,
  validateNickname,
  validatePasswordConfirm,
} from '@/features/auth/validations';

export default function SignupPage() {
  const [form, setForm] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: !form.email
        ? '이메일을 입력해 주세요.'
        : validateEmail(form.email),
      nickname: !form.nickname
        ? '닉네임을 입력해 주세요.'
        : validateNickname(form.nickname),
      password: !form.password
        ? '비밀번호를 입력해 주세요.'
        : validatePassword(form.password),
      passwordConfirm: !form.passwordConfirm
        ? '비밀번호 확인을 입력해 주세요.'
        : validatePasswordConfirm(form.password, form.passwordConfirm),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(Boolean)) return;

    console.log(form);
  };

  const isFormValid =
    form.email.length > 0 &&
    form.nickname.length > 0 &&
    form.password.length > 0 &&
    form.passwordConfirm.length > 0 &&
    !validateEmail(form.email) &&
    !validateNickname(form.nickname) &&
    !validatePassword(form.password) &&
    !validatePasswordConfirm(form.password, form.passwordConfirm);

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
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              nickname: validateNickname(form.nickname),
            }))
          }
          errorMessage={errors.nickname}
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
              passwordConfirm: validatePasswordConfirm(
                form.password,
                form.passwordConfirm
              ),
            }))
          }
          autoComplete="new-password"
          errorMessage={errors.passwordConfirm}
          required
        />

        <Button
          type="submit"
          size="lg"
          variant="primary"
          disabled={!isFormValid}>
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
