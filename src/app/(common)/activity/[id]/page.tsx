'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import ActivitiesDescription from './components/ActivitiesDescription';
import ActivitiesImage from './components/ActivitiesImage';
import ActivitiesInfo from './components/ActivitiesInfo';
import ActivitiesMap from './components/ActivitiesMap';
import ActivitiesReview from './components/ActivitiesReview';

import {
  getActivityDetail,
  getActivityReviews,
  getActivitySchedule,
  postActivityReservations,
} from '@/api/activities';
import { deleteMyActivities } from '@/api/myActivities';
import LoadingSpinner from '@/components/LoadingSpinner';
import BasicModal from '@/components/modal/BasicModal';
import CancelModal from '@/components/modal/CancelModal';
import ReservationForm from '@/components/ReservationForm';
import { ReservationProps } from '@/components/ReservationForm/reservation-type';
import { ApiError } from '@/config/client';
import { useModal } from '@/hooks/useModal';
import { useUser } from '@/hooks/useUser';
import {
  RequestGetActivityReviews,
  RequestGetActivitySchedule,
} from '@/types/activities';
import { cn } from '@/util/cn';

const REVIEW_PAGE_SIZE = 3;

export default function ActivityDetailPage() {
  const { user } = useUser();
  const params = useParams();
  const router = useRouter();
  const activityId = Number(params.id);
  const [page, setPage] = useState(1);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [headCount, setHeadCount] = useState<number>(0);
  const [scheduleId, setScheduleId] = useState<number | undefined>(undefined);
  const year = format(currentMonth, 'yyyy');
  const month = format(currentMonth, 'MM');
  const { openModal, closeModal } = useModal();

  // 체험상세 조회
  const { data, isLoading, isError } = useQuery({
    queryKey: ['activity', activityId],
    queryFn: () => getActivityDetail(activityId),
    enabled: !!activityId,
  });

  // 체험 예약 가능일 조회
  const scheduleParams: RequestGetActivitySchedule = {
    year: year,
    month: month,
  };
  const { data: scheduleData } = useQuery({
    queryKey: ['activitySchedule', activityId, year, month],
    queryFn: () => getActivitySchedule(activityId, scheduleParams),
    enabled: !!activityId && !!year && !!month,
    placeholderData: (previousData) => previousData,
  });

  // 체험 리뷰 조회
  const reviewParams: RequestGetActivityReviews = {
    page: page,
    size: REVIEW_PAGE_SIZE,
  };
  const { data: reviewData } = useQuery({
    queryKey: ['activityReview', activityId, page],
    queryFn: () => getActivityReviews(activityId, reviewParams),
    enabled: !!reviewParams,
    placeholderData: (previousData) => previousData,
  });
  const totalPage = Math.ceil((reviewData?.totalCount ?? 0) / REVIEW_PAGE_SIZE);
  // 체험 리뷰 페이징
  const handleClickPage = (page: number) => {
    setPage(page);
  };

  // 예약하기
  const handleReservation = ({ scheduleId, headCount }: ReservationProps) => {
    mutationReservations.mutate({ activityId, scheduleId, headCount });
  };
  const mutationReservations = useMutation({
    mutationFn: (variables: {
      activityId: number;
      scheduleId: number;
      headCount: number;
    }) => {
      const { activityId, ...data } = variables;
      return postActivityReservations(activityId, data);
    },
    onSuccess: () => {
      openModal({
        component: BasicModal,
        props: {
          message: '예약이 완료되었습니다.',
          buttonText: '확인',
          onClick: () => closeModal(BasicModal),
        },
      });
    },
    onError: (error) => {
      let message = '오류가 발생했습니다.';
      if (error instanceof ApiError) {
        if (error.status === 401) {
          message = '로그인이 필요합니다.';
        } else {
          message = error.message;
        }
      }
      openModal({
        component: BasicModal,
        props: {
          message: message,
          buttonText: '확인',
          onClick: () => closeModal(BasicModal),
        },
      });
    },
  });

  // 삭제하기
  const onDelete = () => {
    openModal({
      component: CancelModal,
      props: {
        message: '체험을 삭제하시겠습니까?',
        rightBtnText: '네',
        onConfirmDelete: () => {
          closeModal(CancelModal);
          mutationDelete.mutate(activityId);
        },
      },
    });
  };
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: (activityId: number) => deleteMyActivities(activityId),
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['activity', activityId],
      });
      router.push('/');
    },
    onError: (error) => {
      openModal({
        component: BasicModal,
        props: {
          message: error,
          buttonText: '확인',
          onClick: () => closeModal(BasicModal),
        },
      });
    },
  });

  if (isLoading || isError || !data) return <LoadingSpinner />;
  const {
    id,
    userId,
    title,
    description,
    category,
    bannerImageUrl,
    price,
    address,
    subImages,
    rating,
    reviewCount,
  } = data;

  const { averageRating = 0, reviews = [], totalCount = 0 } = reviewData ?? {};
  const isUser = Boolean(user);
  const isOwner = isUser && userId === user?.id;
  return (
    <div
      className={cn(
        'm-auto pt-7.5 pb-32.5 lg:max-w-300',
        'md:pt-8.5 lg:min-h-300 lg:pt-22 lg:pb-45'
      )}>
      <div className="lg:grid lg:grid-cols-[1fr_410px] lg:grid-rows-[400px_1fr] lg:gap-x-10">
        {/* 체험 이미지 */}
        <ActivitiesImage
          title={title}
          bannerImageUrl={bannerImageUrl}
          subImages={subImages}
        />
        <div className="col-start-2 col-end-3 row-start-1 row-end-3">
          {/* 체험 정보 */}
          <ActivitiesInfo
            isOwner={isOwner}
            id={id}
            title={title}
            category={category}
            address={address}
            rating={rating}
            reviewCount={reviewCount}
            onDelete={onDelete}
          />
          {/* 예약하기 영역 */}
          <div className="lg:h-[calc(100%-150px)]">
            <ReservationForm
              id={id}
              isUser={isUser}
              isOwner={isOwner}
              schedules={scheduleData}
              activityPrice={price}
              scheduleId={scheduleId}
              setScheduleId={setScheduleId}
              setHeadCount={setHeadCount}
              headCount={headCount}
              handleReservation={handleReservation}
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 md:gap-7.5 lg:gap-10">
          {/* 체험 설명 */}
          <ActivitiesDescription description={description} />
          {/* 오시는 길 */}
          <ActivitiesMap address={address} />
          {/* 체험 후기 */}
          <ActivitiesReview
            averageRating={averageRating}
            reviews={reviews}
            currentPage={page}
            totalCount={totalCount}
            totalPage={totalPage}
            pagesPerGroup={3}
            handleClickPage={handleClickPage}
          />
        </div>
      </div>
    </div>
  );
}
