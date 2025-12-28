import React from 'react';

import Button from '../Button';
import RatingSummary from '../RatingSummary';

import {
  btnPosition,
  cardDetailVariants,
  cardListWrap,
  cardVariants,
} from './card-cva';
import { ExperienceManageCardProps } from './card-type';
import CardPrice from './components/CardPrice';
import CardThumb from './components/CardThumb';
import CardTitle from './components/CardTitle';

/**
 * 체험관리 화면의 카드 컴포넌트 입니다.
 *
 * @param type='list' 좌우형 카드타입
 * @param item API 데이터
 * @param onEdit 수정하기 호출 이벤트
 * @param onDelete 삭제하기 호출 이벤트
 *
 * @example
 * <ExperienceManageCard
    key={item.id}
    item={item}
    onEdit={() => handleEdit(item.id)}
    onDelete={() => handleDelete(item.id)}
  />
 */
export default function ExperienceManageCard({
  type = 'list',
  item,
  onEdit,
  onDelete,
}: ExperienceManageCardProps) {
  const { id, title, bannerImageUrl, price, rating, reviewCount } = item;
  return (
    <div className={cardListWrap}>
      <div className={cardVariants({ type })}>
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
      </div>
      <div className={btnPosition}>
        <Button size="xs" variant="secondary" onClick={() => onEdit?.(id)}>
          수정하기
        </Button>
        <Button size="xs" variant="tertiary" onClick={() => onDelete?.(id)}>
          삭제하기
        </Button>
      </div>
    </div>
  );
}
