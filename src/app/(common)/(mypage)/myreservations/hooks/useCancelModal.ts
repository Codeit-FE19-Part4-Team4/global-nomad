import CancelModal from '@/components/modal/CancelModal';
import { useModal } from '@/hooks/useModal';

/**
 * 예약 취소 확인 모달 UI 흐름만 담당하는 커스텀 훅
 *
 * 역할:
 * - 취소 확인 모달 오픈
 * - 확인 시 모달 닫기
 */
export function useCancelModal() {
  const { openModal, closeModal } = useModal();

  const openCancelModal = (
    activityTitle: string,
    onConfirm: () => Promise<void>
  ) => {
    openModal({
      component: CancelModal,
      props: {
        message: '예약을 취소하시겠어요?',
        rightBtnText: '취소하기',

        onConfirmDelete: async () => {
          await onConfirm();
          closeModal(CancelModal);
        },
      },
    });
  };

  return { openCancelModal };
}
