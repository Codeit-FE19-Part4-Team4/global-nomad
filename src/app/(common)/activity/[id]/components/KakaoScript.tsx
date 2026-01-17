'use client';

import Script from 'next/script';

export default function KakaoScript() {
  return (
    <Script
      src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false&libraries=services`}
      strategy="afterInteractive"
    />
  );
}
