import { useEffect, useRef } from 'react';

import CancelModal from '@/components/modal/CancelModal';
import { useModal } from '@/hooks/useModal';

export default function usePreventNavigation(
  shouldPrevent: boolean,
  onLeaveConfirm: () => void
) {
  const { openModal, closeModal } = useModal();
  const shouldPreventRef = useRef(shouldPrevent);

  useEffect(() => {
    shouldPreventRef.current = shouldPrevent;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      if (!shouldPreventRef.current) {
        return;
      }
      window.history.pushState(null, '', window.location.href);

      openModal({
        component: CancelModal,
        props: {
          message: (
            <div className="flex flex-col justify-center">
              <span>저장되지 않았습니다.</span>
              <span>정말 뒤로 가시겠습니까?</span>
            </div>
          ),
          rightBtnText: '네',
          onConfirmDelete: () => {
            closeModal(CancelModal);
            shouldPreventRef.current = false;
            onLeaveConfirm();
            window.history.back();
            window.history.back();
          },
        },
      });
    };

    window.addEventListener('popstate', handlePopState);

    if (shouldPreventRef.current) {
      window.history.pushState(null, '', window.location.href);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
}
