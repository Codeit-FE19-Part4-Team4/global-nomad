import * as React from 'react';
import type { SVGProps } from 'react';
const SvgImgProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 120 120"
    {...props}>
    <rect width={120} height={120} fill="#E5F3FF" rx={60} />
    <g filter="url(#img-profile_svg__a)">
      <path
        fill="#fff"
        d="M52.644 37.5c6.126 0 11.673 2.5 15.699 6.547.371.374.893.554 1.413.49a21 21 0 0 1 2.53-.154c6.193 0 11.708 2.737 15.256 6.999a1.78 1.78 0 0 0 1.605.619 13 13 0 0 1 1.782-.12c6.943 0 12.571 5.334 12.571 11.912s-5.628 11.912-12.571 11.912c-1.177 0-2.315-.153-3.395-.44a1.77 1.77 0 0 0-1.661.406c-3.498 3.241-8.295 5.24-13.588 5.24-2.602 0-5.084-.483-7.351-1.36a1.7 1.7 0 0 0-1.448.105A22 22 0 0 1 52.644 82.5c-4.298 0-8.311-1.231-11.713-3.363-.653-.409-1.5-.329-2.09.169A13.48 13.48 0 0 1 30.12 82.5c-7.521 0-13.619-6.163-13.619-13.765S22.598 54.97 30.12 54.97c.47 0 .889-.316 1.01-.776C33.663 44.582 42.335 37.5 52.644 37.5"
      />
      <path
        fill="#202020"
        d="M42.754 51.244c0 .876-.702 1.586-1.569 1.586s-1.569-.71-1.569-1.586.703-1.586 1.57-1.586c.866 0 1.568.71 1.568 1.586M49.815 49.923c0 .876-.702 1.586-1.569 1.586-.866 0-1.569-.71-1.569-1.586s.703-1.586 1.57-1.586c.866 0 1.568.71 1.568 1.586M41.773 55.602a.91.91 0 0 1 1.247-.184l.038.028.102.077c.533.389 1.409.785 2.373.775.971-.009 2.142-.428 3.243-1.949l.03-.037a.91.91 0 0 1 1.25-.162c.408.301.496.88.197 1.293l-.134.18c-1.391 1.824-3.031 2.51-4.568 2.525-1.434.014-2.686-.556-3.472-1.132l-.151-.115-.037-.03a.93.93 0 0 1-.118-1.269"
      />
    </g>
    <defs>
      <filter
        id="img-profile_svg__a"
        width={107}
        height={65}
        x={10.5}
        y={31.5}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={4} dy={4} />
        <feGaussianBlur stdDeviation={5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.240404 0 0 0 0 0.618659 0 0 0 0 0.949632 0 0 0 0.04 0" />
        <feBlend
          in2="BackgroundImageFix"
          result="effect1_dropShadow_360_12005"
        />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_360_12005"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
export default SvgImgProfile;
