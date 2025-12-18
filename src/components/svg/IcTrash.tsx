import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcTrash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 22 22"
    {...props}>
    <rect
      width={21}
      height={21}
      x={-0.5}
      y={0.5}
      fill="#fff"
      rx={10.5}
      transform="matrix(-1 0 0 1 21 0)"
    />
    <rect
      width={21}
      height={21}
      x={-0.5}
      y={0.5}
      stroke="#EFEFEF"
      rx={10.5}
      transform="matrix(-1 0 0 1 21 0)"
    />
    <path
      stroke="#202020"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7.2h-1.071m0 0v7.333c0 .81-.64 1.467-1.429 1.467h-5c-.789 0-1.429-.657-1.429-1.467V7.2m7.858 0H7.07m0 0H6M13.143 5H8.857m3.572 4.767v3.666M9.57 9.767v3.666"
    />
  </svg>
);
export default SvgIcTrash;
