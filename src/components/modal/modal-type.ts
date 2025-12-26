export interface OpenModalParams {
  component: React.ComponentType<any>;
  props: Record<string, unknown>;
}

export interface ModalStateType extends OpenModalParams {
  id: number;
}
