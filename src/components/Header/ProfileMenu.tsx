import Link from 'next/link';

import { MY_PAGE_NAV_ITEMS } from '@/constants/navigation';

interface ProfileMenuProps {
  onClose: () => void;
}

export default function ProfileMenu({ onClose }: ProfileMenuProps) {
  return (
    <div className="absolute top-16 right-0">
      <ul className="w-43 rounded-2xl border border-gray-100 bg-white p-3 shadow">
        {MY_PAGE_NAV_ITEMS.map((item) => {
          if ('isLogout' in item && item.isLogout) {
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    console.log('logout');
                    onClose();
                  }}
                  className="hover:bg-primary-100 flex w-full rounded-[14px] px-5 py-3.5 text-sm">
                  {item.label}
                </button>
              </li>
            );
          }

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                onClick={onClose}
                className="hover:bg-primary-100 flex rounded-[14px] px-5 py-3.5 text-sm">
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
