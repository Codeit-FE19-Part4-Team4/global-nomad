'use client';

import { useContext } from 'react';

import { ModalDispatchContext, ModalStateContext } from './modal-context';

export const useModal = () => {
  const activeModal = useContext(ModalStateContext);
  const { open: openModal, close: closeModal } =
    useContext(ModalDispatchContext);

  return { activeModal, openModal, closeModal };
};
