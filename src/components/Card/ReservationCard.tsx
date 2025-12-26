import Button from '../Button';
import StatusBadge from '../StatusBadge';

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
 * @param id 체험id
 * @param title 체험 제목
 * @param bannerImageUrl 체험 이미지
 * @param price 금액
 * @param date 체험일
 * @param startTime 체험시작 시간
 * @param endTime 체험종료 시간
 * @param headCount 인원
 * @param experienceStatus 체험 상태. pending(보류), confirmed(확정), declined(거절) canceled(취소), completed(완료)
 * @param reviewSubmitted 후기 작성 여부
 * @param onReviewSubmit 후기 작성 호출 이벤트
 * @param onReserveCancel 예약 취소 호출 이벤트
 * 
 * @example
 * <ReservationCard
    key={item.id}
    id={item.id}
    title={item.activity.title}
    bannerImageUrl={item.activity.bannerImageUrl}
    activityId={item.activity.id}
    price={item.totalPrice}
    date={item.date}
    startTime={item.startTime}
    endTime={item.endTime}
    headCount={item.headCount}
    experienceStatus={item.status}
    reviewSubmitted={item.reviewSubmitted}
    onReviewSubmit={() => handleReviewSubmit(item.id)}
    onReserveCancel={() => handleReserveCancel(item.id)}
  />
 */
export default function ReservationCard({
  type = 'list',
  id,
  title,
  bannerImageUrl,
  price,
  date,
  startTime,
  endTime,
  headCount,
  experienceStatus,
  reviewSubmitted,
  onReviewSubmit,
  onReserveCancel,
}: ReservationCardProps) {
  const isCancelPossible = experienceStatus === 'pending';
  const isReviewPossible = !reviewSubmitted && experienceStatus === 'completed';

  return (
    <div className={cardListWrap}>
      <div className={cardVariants({ type })}>
        <CardThumb type={type} bannerImageUrl={bannerImageUrl} title={title} />
        <div className={cardDetailVariants({ type })}>
          <div>
            <StatusBadge status={experienceStatus} />
            <CardTitle title={title} type={type} className="mt-[11.5px]" />
            <CardSchedule date={date} startTime={startTime} endTime={endTime} />
          </div>
          <div>
            <CardPrice price={price} headCount={headCount} />
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
