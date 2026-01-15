import Image from 'next/image';

import IcoStar from '@/assets/icons/main/ic-star-on.svg';
import Pagination from '@/components/Pagination';
import Rating from '@/components/Rating';
import Text from '@/components/Text';
import { Review } from '@/types/activities';

type ActivitiesReviewProps = {
  averageRating: number;
  reviews: Review[];
  currentPage: number;
  totalCount: number;
  totalPage: number;
  pagesPerGroup: number;
  handleClickPage: (page: number) => void;
};

export default function ActivitiesReview({
  averageRating,
  reviews,
  currentPage,
  totalCount,
  totalPage,
  pagesPerGroup,
  handleClickPage,
}: ActivitiesReviewProps) {
  return (
    <div className="border-t border-gray-100 pt-5 md:pt-7.5 lg:pt-10">
      <Text
        as="h3"
        className="body-lg md:title-sm mb-2 font-[var(--weight-title-xl)]!">
        체험 후기
        <span className="bold ml-2 inline-block text-[14px] text-[#a4a1aa] md:text-[16px]">
          {totalCount}개
        </span>
      </Text>
      <div className="flex flex-col items-center">
        <strong className="bold inline-block text-[24px] leading-8 md:text-[32px] md:leading-10.5">
          {averageRating}
        </strong>
        <Text as="span" className="bold text-[16px]">
          {getRatingText(averageRating, totalCount)}
        </Text>
        <Text
          as="span"
          className="medium mt-1.5 inline-flex gap-0.5 text-[14px] text-[#79747E]">
          <Image src={IcoStar} width={16} height={16} alt="" />
          {totalCount}개 후기
        </Text>
      </div>
      {reviews.length > 0 && (
        <>
          <div className="mt-7.5 flex flex-col gap-10 md:gap-5">
            {reviews.map((review) => {
              const { id, user, rating, content, createdAt } = review;
              return (
                <ReviewItem
                  key={id}
                  user={user}
                  rating={rating}
                  content={content}
                  createdAt={createdAt}
                />
              );
            })}
          </div>
          <div className="mt-7.5 flex justify-center md:mt-10">
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              pagesPerGroup={pagesPerGroup}
              handleClickPage={handleClickPage}
            />
          </div>
        </>
      )}
    </div>
  );
}

export function ReviewItem({ user, rating, content, createdAt }: Review) {
  const date = createdAt.split('T')[0];
  return (
    <div className="rounded-3xl p-5 shadow-[0px_4px_24px_0px_#9CB4CA33]">
      <div className="mb-1 flex items-center gap-2">
        <strong className="text-4 semibold md:bold md:text-[18px]">
          {user.nickname}
        </strong>
        <span className="semibold text-[12px] text-[#a4a1aa] md:text-[16px]">
          {date}
        </span>
      </div>
      <Rating value={rating} />
      <Text
        as="p"
        className="medium mt-2 text-[14px] -tracking-wide break-keep md:mt-3 md:text-[16px]">
        {content}
      </Text>
    </div>
  );
}

export function getRatingText(
  rating: number,
  totalCount: number | undefined
): string {
  if (totalCount === 0) {
    return '평가 없음';
  }

  if (rating <= 1) return '매우 불만족';
  if (rating <= 2) return '불만족';
  if (rating <= 3) return '보통';
  if (rating <= 4) return '만족';
  return '매우 만족';
}
