import { useEffect, useRef } from 'react';

import CancelModal from '@/components/modal/CancelModal';
import { useModal } from '@/hooks/useModal';

export default function usePreventNavigation(shouldPrevent: boolean) {
  const { openModal, closeModal } = useModal();
  const shouldPreventRef = useRef(shouldPrevent);
  const initUploadRef = useRef(false);

  useEffect(() => {
    shouldPreventRef.current = shouldPrevent;
  }, [shouldPrevent]);

  useEffect(() => {
    if (!initUploadRef.current) {
      window.history.pushState(null, '', window.location.href);
      initUploadRef.current = true;
    }
  }, []);

  const handleLeavePage = () => {
    shouldPreventRef.current = false;
    closeModal(CancelModal);
    window.history.back();
  };

  const handleStayPage = () => {
    window.history.pushState(null, '', window.location.href);
    closeModal(CancelModal);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handlePopState = () => {
      if (!shouldPreventRef.current) {
        return;
      }

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
            handleLeavePage();
          },
          onCloseModal: () => {
            handleStayPage();
          },
        },
      });
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [shouldPrevent]);
}
