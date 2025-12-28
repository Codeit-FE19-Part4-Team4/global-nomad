'use client';
import { useState } from 'react';

import { ModalDispatchContext, ModalStateContext } from './modal-context';
import type { ModalStateType, OpenModalParams } from './modal-type';

let modalIdCounter = 0;

export default function ModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeModal, setActiveModal] = useState<ModalStateType[]>([]);

  const open = ({ component, props }: OpenModalParams) => {
    const id = (++modalIdCounter).toString();
    setActiveModal((activeModal) => {
      return [...activeModal, { component, props, id } as ModalStateType];
    });
  };

  const close = (component: React.ComponentType) => {
    setActiveModal((activeModal) =>
      activeModal.filter((modal) => modal.component !== component)
    );
  };

  return (
    <ModalDispatchContext value={{ open, close }}>
      <ModalStateContext value={activeModal}>{children}</ModalStateContext>
    </ModalDispatchContext>
  );
}
