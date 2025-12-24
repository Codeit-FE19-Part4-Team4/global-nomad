'use client';
import { createPortal } from 'react-dom';

export default function ModalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;
  if (!modalRoot) {
    return null;
  }
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center">
      {/*dim*/}
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative z-10">{children}</div>
    </div>,
    modalRoot
  );
}
