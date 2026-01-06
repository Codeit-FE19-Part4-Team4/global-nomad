'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import kakaoLogo from '@/assets/icons/auth/ic-kakao.svg';
import Button from '@/components/Button';
import { TextInput, PasswordInput } from '@/components/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: 로그인 API 연동
    console.log({ email, password });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-7.5">
        <TextInput
          label="이메일"
          placeholder="example@email.com"
          value={email}
          onChange={setEmail}
          required
        />

        <PasswordInput
          label="비밀번호"
          placeholder="비밀번호 입력"
          value={password}
          onChange={setPassword}
          required
        />

        <Button type="submit" size="lg" variant="primary">
          로그인
        </Button>
      </form>

      <div className="flex items-center gap-3.5 py-7.5">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-sm text-gray-600">or</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      {/* 카카오 로그인 */}
      <Button type="button" size="lg" variant="secondary" className="w-full">
        <Image src={kakaoLogo} alt="카카오로고" width={24} height={24} />
        카카오 로그인
      </Button>

      {/* 회원가입 이동 */}
      <p className="mt-6 text-center text-sm text-gray-400">
        회원이 아니신가요?{' '}
        <Link href="/signup" className="underline">
          회원가입
        </Link>
      </p>
    </>
  );
}
