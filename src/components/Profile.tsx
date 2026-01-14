/* eslint-disable @next/next/no-img-element */
'use client';

import { cva } from 'class-variance-authority';
import Image from 'next/image';

import defaultProfile from '@/assets/images/common/img-profile.svg';
import { cn } from '@/util/cn';

const profileVariants = cva('rounded-full object-cover', {
  variants: {
    size: {
      lg: 'w-[120px] h-[120px]',
      md: 'w-[70px] h-[70px]',
      sm: 'w-[30px] h-[30px]',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
});

interface ProfileProps {
  src?: string;
  alt?: string;
  size?: 'lg' | 'md' | 'sm';
  className?: string;
}

export default function Profile({
  src,
  alt = 'profile',
  size,
  className,
}: ProfileProps) {
  return (
    <div className={cn(profileVariants({ size }), className, 'relative')}>
      <img
        src={src || defaultProfile.src}
        alt={alt}
        className="h-full w-full rounded-full object-cover object-center"
      />
    </div>
  );
}
