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
      <div className="bg-background h-[140px] w-[320px] rounded-[30px] py-[30px] pt-[34px] pb-[30px] sm:h-[170px] sm:w-[400px] sm:px-10 sm:pt-10">
        <div className="flex w-full flex-col items-center justify-center gap-5">
          <span className="text-[16px] font-bold sm:text-[18px]">
            {children}
          </span>
          <Button
            variant="primary"
            className="h-[41px] w-[180px] sm:h-[47px] sm:w-[200px]"
            onClick={() => onClick?.()}>
            {buttonText}
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
}
