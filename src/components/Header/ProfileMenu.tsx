import Link from 'next/link';

import { MY_PAGE_MENU_ITEMS, LOGOUT_ITEM } from '@/constants/navigation';

interface ProfileMenuProps {
  onClose: () => void;
  onLogout: () => void;
}

export default function ProfileMenu({ onClose, onLogout }: ProfileMenuProps) {
  return (
    <div className="absolute top-16 right-0 z-50">
      <ul className="w-43 rounded-2xl border border-gray-100 bg-white p-3 shadow">
        {MY_PAGE_MENU_ITEMS.map((item) => (
          <li key={item.id}>
            <Link
              href={item.href}
              onClick={onClose}
              className="hover:bg-primary-100 flex rounded-[14px] px-5 py-3.5 text-sm">
              {item.label}
            </Link>
          </li>
        ))}
        {/* 로그아웃 버튼 */}
        <li key={LOGOUT_ITEM.id}>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="hover:bg-primary-100 flex w-full rounded-[14px] px-5 py-3.5 text-sm">
            {LOGOUT_ITEM.label}
          </button>
        </li>
      </ul>
    </div>
  );
}
