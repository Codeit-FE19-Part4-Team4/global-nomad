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
 * @param item API 데이터
 * @param className 카드형태 스타일변경 가능한 클래스
 *
 * @example
  <ExperienceCard
    key={item.id}
    item={item}
    className="w-[34.933vw]" //가로목록 형태일때 넓이스타일 추가
  />
 */
export default function ExperienceCard({
  type = 'card',
  className,
  item,
}: ExperienceCardProps) {
  const { id, title, bannerImageUrl, price, rating, reviewCount } = item;
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
