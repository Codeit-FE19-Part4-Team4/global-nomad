import Image from 'next/image';
import Link from 'next/link';

import HeaderAuth from './HeaderAuth';
import HeaderGuest from './HeaderGuest';

import logoText from '@/assets/images/common/img-logo-text.svg';
import logoImege from '@/assets/images/common/img-logo.svg';

type HeaderProps = {
  isLoggedIn: boolean;
};
export default function Header({ isLoggedIn }: HeaderProps) {
  return (
    <header>
      <div className="mx-auto flex h-12 max-w-380 items-center justify-between px-6 md:h-20 md:px-7.5">
        {/* 로고 */}
        <Link
          className="flex cursor-pointer justify-center gap-3 font-bold"
          href="/">
          <span className="relative inline-block h-7 w-7">
            <Image src={logoImege} alt="GlobalNomadLogo" fill />
          </span>
          <span className="relative hidden h-7 w-33.5 md:inline-block">
            <Image src={logoText} alt="GlobalNomadLogoText" fill />
          </span>
        </Link>

        {/* 우측 영역 */}
        {isLoggedIn ? <HeaderAuth /> : <HeaderGuest />}
      </div>
    </header>
  );
}
