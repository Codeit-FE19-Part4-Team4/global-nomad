'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import { ActivityType } from '@/types/activities';
import { cn } from '@/util/cn';

interface BannerActivitiesProps {
  data: ActivityType[] | undefined;
}

export default function BannerActivities({ data }: BannerActivitiesProps) {
  return (
    <div className="relative mt-[74px] mb-[17px] md:mt-[104px] md:mb-[30px] lg:mb-[50px]">
      <h2
        className={cn(
          'absolute right-0 bottom-[36px] left-0 z-2 text-center text-[14px] text-white',
          'md:bottom-[72px] md:text-[16px]',
          'lg:bottom-[101px] lg:text-[18px]'
        )}>
        1월의 인기 체험 BEST 🔥
      </h2>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={800}
        loop
        observer
        observeParents
        className="overflow-hidden rounded-[12px] md:rounded-[18px] lg:rounded-[24px]">
        {data?.map((item, index) => {
          return (
            <SwiperSlide key={item.id} className="relative h-full">
              <Link
                href={`/activity/${item.id}`}
                className={cn(
                  'relative block h-[181px] md:h-[375px] lg:h-[500px]'
                )}>
                <h3
                  className={cn(
                    'absolute right-0 bottom-[61px] left-0 z-1 text-center text-[18px] text-white',
                    'md:bottom-[105px] md:text-[24px]',
                    'lg:bottom-[141px] lg:text-[32px]'
                  )}>
                  {item.title}
                </h3>
                <Image
                  src={item.bannerImageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
