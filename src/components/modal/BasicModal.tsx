import Button from '../Button';

/**
 *
 * @example
 * import BasicModal from "..."
 * const {openModal, closeModal } = useModal();
 * const parmas = {
 *  component:BasicModal
 *  props:{
 *    message:"수정이 완료되었습니다."
 *    buttonText:"확인"
 *    onClick(closeModal(BasicModal)) //component에 적은 모달 그대로 사용해야함
 *   }
 * }
 * return (
 *  <>
 *    <button onClick={openModal()}>모달 열기</button>
 *  </>
 */
export default function BasicModal({
  message,
  buttonText,
  onClick,
}: {
  message: string;
  buttonText: string;
  onClick?: () => void;
}) {
  return (
    <div className="bg-background h-[140px] w-[320px] rounded-[30px] py-[30px] pt-[34px] pb-[30px] sm:h-[170px] sm:w-[400px] sm:px-10 sm:pt-10">
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <span className="text-[16px] font-bold sm:text-[18px]">{message}</span>
        <Button
          variant="primary"
          className="h-[41px] w-[180px] sm:h-[47px] sm:w-[200px]"
          onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
