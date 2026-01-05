import StatusBadge from '../Badge/StatusBadge';
import Button from '../Button';

import {
  btnPosition,
  cardDetailVariants,
  cardListWrap,
  cardVariants,
} from './card-cva';
import { ReservationCardProps } from './card-type';
import CardPrice from './components/CardPrice';
import CardSchedule from './components/CardSchedule';
import CardThumb from './components/CardThumb';
import CardTitle from './components/CardTitle';

/**
 * 체험 예약현황 화면의 카드 컴포넌트 입니다.
 *
 * @param type='list' 좌우형 카드타입
 * @param item API 데이터
 * @param onReviewSubmit 후기 작성 호출 이벤트
 * @param onReserveCancel 예약 취소 호출 이벤트
 * 
 * @example
 * <ReservationCard
    key={item.id}
    item={item}
    onReviewSubmit={() => handleReviewSubmit(item.id)}
    onReserveCancel={() => handleReserveCancel(item.id)}
  />
 */
export default function ReservationCard({
  type = 'list',
  item,
  onReviewSubmit,
  onReserveCancel,
}: ReservationCardProps) {
  const {
    id,
    activity,
    totalPrice,
    date,
    startTime,
    endTime,
    headCount,
    status,
    reviewSubmitted,
  } = item;
  const { title, bannerImageUrl } = activity;
  const isCancelPossible = status === 'pending';
  const isReviewPossible = !reviewSubmitted && status === 'completed';

  return (
    <div className={cardListWrap}>
      <div className={cardVariants({ type })}>
        <CardThumb type={type} bannerImageUrl={bannerImageUrl} title={title} />
        <div className={cardDetailVariants({ type })}>
          <div>
            <StatusBadge status={status} />
            <CardTitle title={title} type={type} className="mt-3" />
            <CardSchedule date={date} startTime={startTime} endTime={endTime} />
          </div>
          <div>
            <CardPrice price={totalPrice} headCount={headCount} />
          </div>
        </div>
      </div>
      {(isReviewPossible || isCancelPossible) && (
        <div className={btnPosition}>
          {isReviewPossible && (
            <Button
              size="xs"
              variant="primary"
              onClick={() => onReviewSubmit?.(id)}>
              후기 작성
            </Button>
          )}
          {isCancelPossible && (
            <Button
              size="xs"
              variant="tertiary"
              onClick={() => onReserveCancel?.(id)}>
              예약 취소
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
