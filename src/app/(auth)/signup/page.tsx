'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import kakaoLogo from '@/assets/icons/auth/ic-kakao.svg';
import Button from '@/components/Button';
import { TextInput, PasswordInput } from '@/components/Input';

export default function SignupPage() {
  const [form, setForm] = useState({
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

    if (form.password !== form.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: 회원가입 API 연동
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
          required
        />

        <PasswordInput
          label="비밀번호 확인"
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          value={form.passwordConfirm}
          onChange={handleChange('passwordConfirm')}
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

      {/* 카카오 로그인 */}
      <Button type="button" size="lg" variant="secondary" className="w-full">
        <Image src={kakaoLogo} alt="카카오로고" width={24} height={24} />
        카카오 회원가입
      </Button>

      {/* 회원가입 이동 */}
      <p className="mt-6 text-center text-sm text-gray-400">
        회원이신가요?{' '}
        <Link href="/login" className="underline">
          로그인하기
        </Link>
      </p>
    </>
  );
}
