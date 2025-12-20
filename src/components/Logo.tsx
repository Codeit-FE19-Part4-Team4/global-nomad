import { cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import textLogo from '@/assets/images/common/img-logo-text.svg';
import logo from '@/assets/images/common/img-logo.svg';
import { cn } from '@/util/cn';

const LogoStyle = cva('flex w-fit items-center', {
  variants: {
    size: {
      lg: 'flex-col gap-6',
      sm: 'gap-3 ',
    },
  },
});

export default function Logo({ size }: { size: 'lg' | 'sm' }) {
  return (
    <h1>
      <Link
        href="/"
        className={cn(LogoStyle({ size }))}
        aria-label="Global Nomad">
        <Image
          src={logo}
          alt=""
          className={cn(
            size === 'lg'
              ? 'h-[105px] w-[105px] sm:h-[144px] sm:w-[144px]'
              : 'h-7 w-7'
          )}
        />
        <Image
          src={textLogo}
          alt="Global Nomad"
          className={cn(
            size === 'lg'
              ? 'h-[23px] w-[187px] sm:h-[31px] sm:w-[255px]'
              : 'hidden sm:block sm:h-4 sm:w-[134px]'
          )}
        />
      </Link>
    </h1>
  );
}
