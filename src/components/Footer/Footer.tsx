import Image from 'next/image';

import { FOOTER_LINKS } from './footerLinks';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 px-6 py-7.5 md:px-10 md:py-15">
      <div className="mx-auto flex max-w-380 items-center justify-between">
        <div className="text-sm text-gray-500">© 2025 Global Nomad</div>

        <nav>
          <ul className="flex gap-4">
            {FOOTER_LINKS.map(({ label, href, icon }) => (
              <li key={label} className="relative h-6 w-6">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="relative inline-block h-full w-full">
                  <Image fill src={icon} alt="" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
