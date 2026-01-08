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
  message: React.ReactNode | string;
  buttonText: string;
  onClick?: () => void;
}) {
  return (
    <div className="bg-background h-fit min-h-[140px] w-[320px] rounded-[30px] py-[30px] pt-[34px] pb-[30px] md:min-h-[170px] md:w-[400px] md:px-10 md:pt-10">
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <div className="text-center text-[16px] font-bold **:text-center **:text-[18px] **:font-bold md:text-[18px]">
          {message}
        </div>
        <Button
          variant="primary"
          className="h-[41px] w-[180px] md:h-[47px] md:w-[200px]"
          onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
