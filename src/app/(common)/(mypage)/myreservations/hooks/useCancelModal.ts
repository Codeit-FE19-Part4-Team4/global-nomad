import { useCancelReservation } from './useReservations';

import CancelModal from '@/components/modal/CancelModal';
import { useToast } from '@/components/toast/useToast';
import { useModal } from '@/hooks/useModal';
import { getApiErrorMessage } from '@/util/error';

/**
 * 예약 취소 확인 모달 UI 흐름만 담당하는 커스텀 훅
 *
 * 역할:
 * - 취소 확인 모달 오픈
 * - 확인 시 모달 닫기
 * - 예약 취소 API 호출 및 토스트 표시
 */
export function useCancelModal() {
  const { openModal, closeModal } = useModal();
  const cancelMutation = useCancelReservation();
  const { show } = useToast();

  const openCancelModal = (reservationId: number) => {
    openModal({
      component: CancelModal,
      props: {
        message: '예약을 취소하시겠어요?',
        rightBtnText: '취소하기',

        onConfirmDelete: async (): Promise<void> => {
          try {
            await cancelMutation.mutateAsync(reservationId);
            closeModal(CancelModal);

            show('예약이 취소되었습니다', 'success', 3000);
          } catch (error) {
            const errorMessage = getApiErrorMessage(
              error,
              '예약 취소에 실패했습니다'
            );

            console.error('예약 취소 실패:', error);
            show(errorMessage, 'error', 3000);
          }
        },
      },
    });
  };

  return { openCancelModal };
}
