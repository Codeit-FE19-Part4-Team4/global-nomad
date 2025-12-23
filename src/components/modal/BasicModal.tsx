import Button from '../Button';
import Text from '../Text';

import ModalContainer from './ModalContainer';

/**
 * 
 * @example
 * const { isOpen, openModal, closeModal } = useModal();
 * 
 * return (
 *  <>
 *    <button onClick={openModal}>모달 열기</button>
 *    {isOpen && (
        <BasicModal buttonText="확인" onClick={closeModal}>
          등록완료
        </BasicModal>
      )}
    </>
  )
 */
export default function BasicModal({
  children,
  buttonText,
  onClick,
}: {
  children: React.ReactNode;
  buttonText: string;
  onClick?: () => void;
}) {
  return (
    <ModalContainer>
      <div className="bg-background h-[170px] w-[400px] rounded-[30px] px-10 pt-10 pb-[30px]">
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <Text size="title-sm" className="bold">
            {children}
          </Text>
          <Button
            variant="primary"
            className="h-[47px] w-[200px]"
            onClick={() => onClick?.()}>
            {buttonText}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
