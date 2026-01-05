'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/util/cn';

interface SideMenuNavItemProps {
  label: string;
  icon: StaticImageData;
  activeIcon: StaticImageData;
  href: string;
  className?: string;
  onClick?: () => void;
}

export default function SideMenuNavItem({
  label,
  icon,
  activeIcon,
  href,
  onClick,
  className,
}: SideMenuNavItemProps) {
  const pathname = usePathname();
  const isActive = !onClick && pathname.startsWith(href);

  const handleClick = () => {
    onClick?.();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        'group flex items-center gap-2 rounded-lg px-4 py-3 text-gray-600 transition-colors md:px-3',
        isActive
          ? 'bg-primary-100 text-gray-950'
          : 'hover:bg-primary-100 hover:text-gray-950',
        className
      )}>
      <div className="relative h-6 w-6">
        {/* 기본 아이콘 */}
        <Image
          src={icon}
          alt=""
          fill
          className={cn(
            'object-contain',
            isActive && 'hidden',
            !isActive && 'group-hover:hidden'
          )}
        />

        {/* active / hover 아이콘 */}
        <Image
          src={activeIcon}
          alt=""
          fill
          className={cn(
            'hidden object-contain',
            isActive && 'block',
            !isActive && 'group-hover:block'
          )}
        />
      </div>

      <span className="text-[16px]">{label}</span>
    </Link>
  );
}
