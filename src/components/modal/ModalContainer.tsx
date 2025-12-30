'use client';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useModal } from '@/hooks/useModal';

export default function ModalContainer() {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setModalRoot(document.getElementById('modal-root') as HTMLElement);
  }, []);

  const { activeModal } = useModal();

  useEffect(() => {
    if (activeModal && activeModal?.length > 0) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [activeModal]);

  useEffect(() => {
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  if (!modalRoot || activeModal?.length === 0) {
    return null;
  }

  return createPortal(
    <>
      {activeModal?.map((modal) => {
        const Modal = modal.component;
        const props = modal.props;
        return (
          <div
            key={modal.id}
            className="fixed inset-0 flex items-center justify-center">
            {/*dim*/}
            <div className="absolute inset-0 bg-black opacity-50" />
            <div className="relative z-10">
              <Modal {...props} key={modal.id} />
            </div>
          </div>
        );
      })}
    </>,
    modalRoot
  );
}
