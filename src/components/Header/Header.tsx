import Image from 'next/image';

import HeaderAuth from './HeaderAuth';
import HeaderGuest from './HeaderGuest';

import logoText from '@/assets/images/common/img-logo-text.svg';
import logoImege from '@/assets/images/common/img-logo.svg';

type HeaderProps = {
  isLoggedIn: boolean;
};
export default function Header({ isLoggedIn }: HeaderProps) {
  return (
    <header className="border-b border-gray-100">
      <div className="mx-auto flex h-20 max-w-380 items-center justify-between px-6">
        {/* 로고 */}
        <div className="flex justify-center gap-3 font-bold">
          <span className="relative inline-block h-7 w-7">
            <Image src={logoImege} alt="GlobalNomadLogo" fill />
          </span>
          <span className="relative hidden h-7 w-33.5 md:inline-block">
            <Image src={logoText} alt="GlobalNomadLogoText" fill />
          </span>
        </div>

        {/* 우측 영역 */}
        {isLoggedIn ? <HeaderAuth /> : <HeaderGuest />}
      </div>
    </header>
  );
}
