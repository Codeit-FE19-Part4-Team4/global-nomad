'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

import Text from '@/components/Text';
import { cn } from '@/util/cn';

type ActivitiesMapProp = {
  address: string;
};

export default function ActivitiesMap({ address }: ActivitiesMapProp) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!window.kakao) return;

    const initMap = () => {
      const container = document.getElementById('map');
      if (!container) return;
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);

      const geocoder = new window.kakao.maps.services.Geocoder();
      const ps = new window.kakao.maps.services.Places();

      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK && result[0]) {
          const coords = new kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x)
          );
          new kakao.maps.Marker({ map, position: coords });
          map.setCenter(coords);
        } else {
          ps.keywordSearch(address, (data, status) => {
            if (status === kakao.maps.services.Status.OK && data[0]) {
              const coords = new kakao.maps.LatLng(
                Number(data[0].y),
                Number(data[0].x)
              );
              new kakao.maps.Marker({ map, position: coords });
              map.setCenter(coords);
            } else {
              console.error('주소/시설명 모두 검색 실패');
            }
          });
        }
      });
    };
    if (window.kakao.maps && window.kakao.maps.load) {
      window.kakao.maps.load(initMap);
    } else {
      // SDK가 로드 안 됐으면 동적 로드 후 실행
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false&libraries=services`;
      script.onload = () => {
        setLoaded(true);
        window.kakao.maps.load(initMap);
      };
      document.head.appendChild(script);
    }
  }, [loaded]);

  return (
    <div className="mt:pt-7.5 border-t border-gray-100 pt-5 lg:pt-10">
      {/* Kakao SDK */}
      <Script
        src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&autoload=false&libraries=services`}
        strategy="afterInteractive"
        onLoad={() => {
          setLoaded(true);
        }}
      />

      <Text
        as="h3"
        className="body-lg md:title-sm mb-2 font-[var(--weight-title-xl)]!">
        오시는 길
      </Text>

      <Text
        as="p"
        size="body-sm"
        className="semibold -tracking-[2.5%] text-gray-950 opacity-75">
        {address}
      </Text>

      <div
        id="map"
        className={cn(
          'aspect-ratio z-0 mt-2 min-h-[180px] w-full rounded-2xl md:h-112.5 md:rounded-3xl'
        )}
      />
    </div>
  );
}
