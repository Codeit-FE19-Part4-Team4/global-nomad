import ReviewModal from '../components/ReviewModal';

import { useSubmitReview } from './useReservations';

import { useToast } from '@/components/toast/useToast';
import { useModal } from '@/hooks/useModal';
import { MyReservation } from '@/types/myreservations';
import { getApiErrorMessage } from '@/util/error';

/**
 * 리뷰 작성 모달 UI 흐름만 담당하는 커스텀 훅
 *
 * 역할:
 * - 리뷰 작성 모달 오픈
 * - 제출 시 모달 닫기
 */
export function useReviewModal() {
  const { openModal, closeModal } = useModal();
  const submitReviewMutation = useSubmitReview();
  const { show } = useToast();

  const openReviewModal = (item: MyReservation) => {
    openModal({
      component: ReviewModal,
      props: {
        reservationId: item.id,
        title: item.activity.title,
        date: item.date,
        startTime: item.startTime,
        endTime: item.endTime,
        headCount: item.headCount,
        isSubmitting: submitReviewMutation.isPending,

        onClose: () => closeModal(ReviewModal),

        onSubmit: async (rating: number, content: string): Promise<void> => {
          try {
            await submitReviewMutation.mutateAsync({
              reservationId: item.id,
              rating,
              content,
            });
            closeModal(ReviewModal);

            show('후기가 작성되었습니다', 'success', 3000);
          } catch (error) {
            const errorMessage = getApiErrorMessage(
              error,
              '후기 작성에 실패했습니다'
            );

            console.error('리뷰 작성 실패:', error);
            show(errorMessage, 'error', 3000);
          }
        },
      },
    });
  };

  return { openReviewModal };
}
