'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import icSwiperNext from '@/assets/icons/main/ic-swiper-right.svg';
import ExperienceCard from '@/components/Card/ExperienceCard';
import Skeleton from '@/components/Skeleton/Skeleton';
import { ActivityType } from '@/types/activities';
import { cn } from '@/util/cn';

interface BestActivitiesProp {
  data: ActivityType[] | undefined;
  isLoading: boolean;
}

export default function BestActivities({
  data = [],
  isLoading,
}: BestActivitiesProp) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const skeletonCount = 4;
  return (
    <div className={cn('mt-10', 'md:mt-15')}>
      <h2 className="title-sm lg:title-lg font-[var(--weight-title-lg)]">
        🔥 인기 체험
      </h2>
      <div className="relative">
        <button
          ref={prevRef}
          className={cn(
            'absolute z-5 cursor-pointer items-center justify-center',
            'rounded-full border border-[rgba(0,0,0,0.3)] bg-white',
            'top-[156px] hidden h-13.5 w-13.5',
            'md:-left-[15px] md:flex lg:-left-7'
          )}>
          <Image
            src={icSwiperNext}
            width={24}
            height={24}
            alt="이전 카드 슬라이드"
            className="rotate-180"
          />
        </button>
        <button
          ref={nextRef}
          className={cn(
            'absolute z-5 cursor-pointer items-center justify-center',
            'rounded-full border border-[rgba(0,0,0,0.3)] bg-white',
            'top-[156px] hidden h-13.5 w-13.5',
            'md:-right-[15px] md:flex lg:-right-7'
          )}>
          <Image
            src={icSwiperNext}
            width={24}
            height={24}
            alt="다음 카드 슬라이드"
          />
        </button>
        <div
          className={cn(
            '-mx-7 overflow-hidden px-7',
            'md:-mx-2 md:px-2 lg:overflow-hidden'
          )}>
          {isLoading ? (
            <div className="-mx-7 overflow-hidden px-7 md:mx-0 md:px-0">
              <div className="flex flex-nowrap gap-3 md:gap-4.5 lg:gap-6">
                {Array.from({ length: skeletonCount }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    className={cn(
                      'mb-8 w-[34.933vw]! shrink-0 grow pt-3.5',
                      'md:mb-20 md:w-[calc((100%-18px)/2)]! md:pt-4',
                      'lg:w-[calc((100%-24px*3)/4)]! lg:pt-5'
                    )}
                  />
                ))}
              </div>
            </div>
          ) : (
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              allowTouchMove={true}
              breakpoints={{
                320: {
                  slidesPerView: 'auto',
                  spaceBetween: 12,
                  allowTouchMove: true,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 18,
                  allowTouchMove: true,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                  allowTouchMove: false,
                },
              }}
              resizeObserver
              className="popular-swiper items-stretch overflow-visible!"
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onSwiper={(swiper) => {
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              touchStartPreventDefault={false}
              resistanceRatio={0}
              watchSlidesProgress={false}>
              {data.map((item) => {
                return (
                  <SwiperSlide
                    key={item.id}
                    className={cn(
                      'mb-8 w-[34.933vw]! grow pt-3.5',
                      'md:mb-20 md:w-[calc((100%-18px)/2)]! md:pt-4',
                      'lg:w-[calc((100%-24px*3)/4)]! lg:pt-5'
                    )}>
                    <ExperienceCard item={item} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}
