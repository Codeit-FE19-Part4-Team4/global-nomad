'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import React, { ComponentPropsWithoutRef, ElementType } from 'react';

import { cn } from '@/util/cn';

// 버튼 색상/역할 구분
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

// 버튼 크기 구분
export type ButtonSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

// 버튼 스타일 정의
const ButtonVariants = cva(
  'flex items-center justify-center gap-1 text-body-lg text-white font-[var(--weight-title-lg)] tracking-[var(--tracking-title-lg)] cursor-pointer disabled:cursor-default',
  {
    variants: {
      size: {
        xl: 'h-[54px] rounded-[16px]',
        lg: 'h-[50px] rounded-[14px]',
        md: 'h-[41px] rounded-[12px] md:h-[47px] md:rounded-[14px]',
        sm: 'h-[41px] rounded-[12px] text-[14px]',
        xs: 'h-[37px] rounded-[8px]  md:h-[29px] md:w-[71px] text-[14px] text-gray-600 font-[var(--weight-title-sm)] ',
      },
      variant: {
        primary:
          'bg-primary-500 text-white hover:bg-[var(--primary-600)] disabled:bg-gray-200',
        secondary:
          'bg-white text-gray-600 border border-gray-200 hover:bg-gray-25',
        tertiary: 'bg-gray-50 text-gray-600 hover:bg-gray-100',
      },
    },
    defaultVariants: {
      size: 'lg',
      variant: 'primary',
    },
  }
);

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
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant' | 'prefix'> &
  VariantProps<typeof ButtonVariants>;

/**
 * 이 컴포넌트는 버튼 컴포넌트입니다.
 *
 * @example
 * prefix 아이콘과 함께 사용:
 * ```tsx
 * <Button
 *   variant="secondary"
 *   size="xl"
 *   onClick={handleClick}
 *   prefix={<Image src={IcoKakao} alt="" />}>
 *   카카오 로그인
 * </Button>
 * ```
 *
 * @example
 * Link 컴포넌트로 사용:
 * ```tsx
 * <Button as={Link} href="/list" variant="primary" size="md">
 *   목록으로 이동
 * </Button>
 * ```
 */

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
  return (
    <Component
      className={cn(ButtonVariants({ size, variant }), className)}
      onClick={onClick}
      {...props}>
      {prefix}
      {children}
    </Component>
  );
}
