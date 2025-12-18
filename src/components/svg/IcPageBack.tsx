import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcPageBack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 39 39"
    {...props}>
    <rect width={39} height={39} fill="#EDEEF2" rx={19.5} />
    <mask
      id="ic-page-back_svg__a"
      width={24}
      height={25}
      x={7}
      y={7}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M7 7.5h24v24H7z" />
    </mask>
    <g mask="url(#ic-page-back_svg__a)">
      <path
        fill="#707177"
        d="m14.825 20.5 5.6 5.6L19 27.5l-8-8 8-8 1.425 1.4-5.6 5.6H27v2z"
      />
    </g>
  </svg>
);
export default SvgIcPageBack;
