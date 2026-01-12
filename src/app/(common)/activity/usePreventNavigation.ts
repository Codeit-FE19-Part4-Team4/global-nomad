import { useEffect } from 'react';

import CancelModal from '@/components/modal/CancelModal';
import { useModal } from '@/hooks/useModal';

export default function usePrventNavigation(
  shouldPrevent: boolean,
  onLeaveConfirm: () => void
) {
  const { openModal, closeModal } = useModal();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      if (shouldPrevent) {
        window.history.pushState(null, '', window.location.href);
        openModal({
          component: CancelModal,
          props: {
            message: '저장되지 않았습니다. 페이지를 떠나시겠습니까?',
            rightBtnText: '네',
            onConfirmDelete: () => {
              closeModal(CancelModal);
              onLeaveConfirm();
            },
          },
        });
      }
    };
    window.addEventListener('popstate', handlePopState);
    if (shouldPrevent) {
      window.history.pushState(null, '', window.location.href);
    }
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [shouldPrevent, onLeaveConfirm, openModal, closeModal]);
}
