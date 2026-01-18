'use client';

import { useEffect, useState } from 'react';

import Text from '@/components/Text';
import { cn } from '@/util/cn';

type ActivitiesMapProp = {
  address: string;
};

export default function ActivitiesMap({ address }: ActivitiesMapProp) {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // window.kakao가 없으면 대기
    if (!window.kakao?.maps) {
      const checkKakao = setInterval(() => {
        if (window.kakao?.maps) {
          clearInterval(checkKakao);
          setMapLoaded(true);
        }
      }, 100);
      return () => clearInterval(checkKakao);
    } else {
      setMapLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (!mapLoaded || !address) return;

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

      // 주소로 좌표검색
      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK && result[0]) {
          const coords = new window.kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x)
          );
          new window.kakao.maps.Marker({ map, position: coords });
          map.setCenter(coords);
        } else {
          // 주소 검색 실패 시 키워드로 재검색
          ps.keywordSearch(address, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK && data[0]) {
              const coords = new window.kakao.maps.LatLng(
                Number(data[0].y),
                Number(data[0].x)
              );
              new window.kakao.maps.Marker({ map, position: coords });
              map.setCenter(coords);
            } else {
              console.log('주소/시설명 모두 검색 실패');
            }
          });
        }
      });
    };

    if (window.kakao.maps.load) {
      window.kakao.maps.load(initMap);
    } else {
      initMap();
    }
  }, [mapLoaded, address]);

  if (!address) return null;

  return (
    <div className="mt:pt-7.5 border-t border-gray-100 pt-5 lg:pt-10">
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
