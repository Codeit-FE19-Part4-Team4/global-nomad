'use client';

import Image from 'next/image';
import Link from 'next/link';

import emptyImage from '@/assets/images/common/img-empty.svg';

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
        <p className="mt-6 text-[17px] font-medium text-gray-600">
          {description}
        </p>
      )}

      {/* 버튼 */}
      <Link
        href={buttonHref}
        className="bg-primary-500 mt-6 inline-block rounded-md px-6 py-2 text-white">
        {buttonText}
      </Link>
    </div>
  );
}
