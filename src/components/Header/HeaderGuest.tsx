import Link from 'next/link';

export default function HeaderGuest() {
  return (
    <nav className="flex items-center gap-4">
      <Link
        href="/login"
        className="h-[41px] w-17.5 p-0 text-center text-sm leading-[41px] text-gray-950">
        로그인
      </Link>
      <Link
        href="/signup"
        className="h-[41px] w-17.5 p-0 text-center text-sm leading-[41px] text-gray-950">
        회원가입
      </Link>
    </nav>
  );
}
