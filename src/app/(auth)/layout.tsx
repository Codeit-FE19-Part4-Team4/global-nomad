import Image from 'next/image';
import Link from 'next/link';

import textLogo from '@/assets/images/common/img-logo-text.svg';
import imgLogo from '@/assets/images/common/img-logo.svg';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full max-w-[640px] px-6 py-15 md:px-13">
        {/* 로고 영역 */}
        <Link
          href="/"
          className="mb-15.5 flex flex-col items-center gap-[23px]">
          <Image
            src={imgLogo}
            alt="글로벌노마드이미지로고"
            width={144}
            height={144}
          />
          <Image
            src={textLogo}
            alt="글로벌노마드텍스트로고"
            width={255}
            height={31}
          />
        </Link>

        {children}
      </div>
    </div>
  );
}
