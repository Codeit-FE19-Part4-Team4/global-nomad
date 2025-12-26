'use client';

import { useContext } from 'react';

import { ModalDispatchContext, ModalStateContext } from './modal-context';

export const useModal = () => {
  const activeModal = useContext(ModalStateContext);
  const dispatch = useContext(ModalDispatchContext);
  if (!dispatch) {
    throw new Error('ModalProvider 내부에서 사용하세요.');
  }
  const { open: openModal, close: closeModal } = dispatch;

  return { activeModal, openModal, closeModal };
};
