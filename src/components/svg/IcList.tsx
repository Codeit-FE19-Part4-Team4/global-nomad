import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcList = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 20"
    {...props}>
    <path
      fill="#707177"
      d="M16.667 1.666H3.334c-.92 0-1.667.745-1.667 1.66v10.013c0 .915.747 1.66 1.667 1.66h2.5v3.334l5.292-3.334h5.541c.92 0 1.667-.745 1.667-1.66V3.326a1.665 1.665 0 0 0-1.667-1.66m-5 9.167H5.834V9.166h5.833zm2.5-3.334H5.834V5.833h8.333z"
    />
  </svg>
);
export default SvgIcList;
