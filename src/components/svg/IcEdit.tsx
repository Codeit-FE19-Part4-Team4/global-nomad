import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 30 30"
    {...props}>
    <rect width={30} height={30} fill="#B3B4BC" rx={15} />
    <path
      fill="#fff"
      d="m17.667 8.342 2 2-1.525 1.525-2-2zm-8 7.992v2h2l5.533-5.525-2-2zm0 4h10.667v1.333H9.667z"
    />
  </svg>
);
export default SvgIcEdit;
