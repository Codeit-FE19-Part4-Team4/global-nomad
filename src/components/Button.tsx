'use client'; // App Router에서 이벤트(onClick 등)를 사용하기 위한 Client Component 선언

import Link from 'next/link';
import React, { ComponentPropsWithoutRef, ElementType } from 'react';
import { cn } from '@/util/cn';

// 버튼 색상/역할 구분
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

// 버튼 크기 구분
export type ButtonSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

// 제네릭 T를 사용해 button, a, Link 등 다양한 요소를 지원
export type ButtonProps<T extends ElementType> = {
  as?: T;
  href?: Parameters<typeof Link>['0']['href'];
  type?: React.ComponentProps<'button'>['type'];
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
  prefix?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant' | 'prefix'>;

// 공통 기본 스타일
const defaultClasses: string =
  'flex items-center justify-center text-body-lg text-white font-[var(--weight-title-lg)] tracking-[var(--tracking-title-lg)] cursor-pointer disabled:cursor-default';

// 색상/역할별 스타일
const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 text-white hover:bg-[#2A86D9] disabled:bg-blue-300 disabled:bg-gray-200',
  secondary: 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-25',
  tertiary: 'bg-gray-50 text-gray-600 hover:bg-gray-100',
};
// 크기별 스타일 (xl:로그인, lg:예약하기, md:상단타이틀,컴펌모달, sm:페이지하단, xs:카드안)
const sizeClasses: Record<ButtonSize, string> = {
  xl: 'h-[54px] rounded-[16px]',
  lg: 'h-[50px] rounded-[14px]',
  md: 'h-[41px] rounded-[12px] md:h-[47px] md:rounded-[14px]',
  sm: 'h-[41px] rounded-[12px] text-[14px]',
  xs: 'h-[37px] rounded-[8px]  md:h-[29px] md:w-[71px] text-[14px] text-gray-600 font-[var(--weight-title-sm)] ',
};

export default function Button<T extends ElementType = 'button'>({
  as,
  size = 'md',
  variant,
  children,
  className,
  onClick,
  prefix,
  ...props
}: ButtonProps<T>) {
  const Component = as || 'button';
  const buttonClass = cn(
    defaultClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  );
  return (
    <Component className={buttonClass} onClick={onClick} {...props}>
      {/* prefix 아이콘이 있을 경우 */}
      {prefix && <span className="mr-1">{prefix}</span>}
      {children}
    </Component>
  );
}
