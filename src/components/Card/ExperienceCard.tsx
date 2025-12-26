import Link from 'next/link';

import RatingSummary from '../RatingSummary';

import { cardDetailVariants, cardVariants } from './card-cva';
import { ExperienceCardProps } from './card-type';
import CardPrice from './components/CardPrice';
import CardThumb from './components/CardThumb';
import CardTitle from './components/CardTitle';

import { cn } from '@/util/cn';
/**
 * 체험목록 화면의 카드 컴포넌트 입니다.
 *
 * @param type type='card' 상하형 카드타입
 * @param id 체험id
 * @param title 체험 제목
 * @param bannerImageUrl 체험 이미지
 * @param price 금액
 * @param rating 별점
 * @param reviewCount 리뷰 수
 *
 * @example
  <ExperienceCard
    key={item.id}
    id={item.id}
    bannerImageUrl={item.bannerImageUrl}
    title={item.title}
    price={item.price}
    rating={item.rating}
    reviewCount={item.reviewCount}
    className="w-[34.933vw]" //가로목록 형태일때 넓이스타일 추가
  />
 */
export default function ExperienceCard({
  type = 'card',
  id,
  title,
  bannerImageUrl,
  price,
  rating,
  reviewCount,
  className,
}: ExperienceCardProps) {
  return (
    <Link
      href={`/activities/${id}`}
      className={cn(cardVariants({ type }), className)}>
      <CardThumb type={type} bannerImageUrl={bannerImageUrl} title={title} />
      <div className={cardDetailVariants({ type })}>
        <div>
          <CardTitle title={title} type={type} />
          <RatingSummary
            type={type}
            rating={rating}
            reviewCount={reviewCount}
          />
        </div>
        <div>
          <CardPrice price={price} />
        </div>
      </div>
    </Link>
  );
}
