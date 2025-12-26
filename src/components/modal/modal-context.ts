import { createContext } from 'react';

import { type ModalStateType, type OpenModalParams } from './modal-type';
type ModalStateContextType = ModalStateType[];

type ModalDispatchContextType = {
  open: ({ component, props }: OpenModalParams) => void;
  close: (component: React.ComponentType<any>) => void;
};

export const ModalStateContext = createContext<
  undefined | ModalStateContextType
>(undefined);
export const ModalDispatchContext = createContext<
  undefined | ModalDispatchContextType
>(undefined);
