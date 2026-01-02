'use client';

import Image from 'next/image';
import Link from 'next/link';

import emptyImage from '@/assets/images/common/img-empty.svg';
import Button from '@/components/Button';

type EmptyStateProps = {
  description?: string;
  buttonText: string;
  buttonHref: string;
};

export default function EmptyState({
  description,
  buttonText,
  buttonHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* 이미지 */}
      <Image src={emptyImage} alt="내역 없음" width={122} height={122} />

      {/* 텍스트 */}
      {description && (
        <p className="mt-6 text-lg text-gray-600">{description}</p>
      )}

      {/* 버튼 */}
      <Button
        as={Link}
        href={buttonHref}
        variant="primary"
        size="xl"
        className="mt-6 w-[183px] text-[16px] font-bold">
        {buttonText}
      </Button>
    </div>
  );
}
