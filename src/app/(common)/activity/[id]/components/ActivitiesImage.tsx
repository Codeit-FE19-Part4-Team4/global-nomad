/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

import ImgEmpty from '@/assets/images/common/img-empty-thum.svg';
import { SubImage } from '@/types/activities';
import { cn } from '@/util/cn';

type ActivitiesImageProps = {
  title: string;
  subImages: SubImage[];
  bannerImageUrl: string;
};

export default function ActivitiesImage({
  title,
  bannerImageUrl,
  subImages,
}: ActivitiesImageProps) {
  const [mainImg, setMainImg] = useState<string>(bannerImageUrl);
  return (
    <div
      className={cn(
        'flex h-61.25 flex-row gap-1.5 overflow-hidden rounded-3xl',
        'md:h-100 md:gap-3'
      )}>
      <div className="relative h-full w-full">
        <img
          src={mainImg}
          alt={title}
          className="h-full w-full object-cover object-center"
          loading="eager"
          onError={() => setMainImg(ImgEmpty.src)}
        />
      </div>
      {subImages.length > 0 && (
        <div
          className={cn(
            'grid h-61.25 w-full gap-1.5 md:h-100 md:gap-3',
            subImages.length > 1 && 'grid-rows-2'
          )}>
          {subImages.map((img) => {
            return <SubImg key={img.id} img={img} />;
          })}
        </div>
      )}
    </div>
  );
}

type SubImgProps = {
  img: SubImage;
};
export function SubImg({ img }: SubImgProps) {
  const { id, imageUrl } = img;
  const [subImg, setSubImg] = useState<string>(imageUrl);
  return (
    <div key={id} className="relative h-full w-full">
      <img
        src={subImg}
        onError={() => setSubImg(ImgEmpty.src)}
        loading="eager"
        className="h-full max-h-61.25 w-full object-cover object-center md:max-h-100"
        alt=""
      />
    </div>
  );
}
