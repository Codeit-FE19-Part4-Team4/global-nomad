'use client';
import { useState } from 'react';

import { ModalDispatchContext, ModalStateContext } from './modal-context';
import type { ModalStateType, OpenModalParams } from './modal-type';
export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeModal, setActiveModal] = useState<ModalStateType[]>([]);

  const open = ({ type, props }: OpenModalParams) => {
    const id = Math.random();
    setActiveModal((activeModal) => {
      return [...activeModal, { type, props, id } as ModalStateType];
    });
  };

  const close = (type: React.ComponentType<any>) => {
    setActiveModal((activeModal) =>
      activeModal.filter((modal) => modal.type !== type)
    );
  };

  return (
    <ModalDispatchContext value={{ open, close }}>
      <ModalStateContext value={activeModal}>{children}</ModalStateContext>
    </ModalDispatchContext>
  );
}
