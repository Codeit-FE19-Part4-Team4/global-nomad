import ReviewModal from '../components/ReviewModal';

import { useModal } from '@/hooks/useModal';

interface ReservationItem {
  id: number;
  activity: { title: string };
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
}

/**
 * 리뷰 작성 모달 UI 흐름만 담당하는 커스텀 훅
 *
 * 역할:
 * - 리뷰 작성 모달 오픈
 * - 제출 시 모달 닫기
 */
export function useReviewModal() {
  const { openModal, closeModal } = useModal();

  const openReviewModal = (item: ReservationItem) => {
    openModal({
      component: ReviewModal,
      props: {
        reservationId: item.id,
        title: item.activity.title,
        date: item.date,
        startTime: item.startTime,
        endTime: item.endTime,
        headCount: item.headCount,

        onCloseModal: () => closeModal(ReviewModal),

        onSubmit: () => {
          closeModal(ReviewModal);
        },
      },
    });
  };

  return { openReviewModal };
}
