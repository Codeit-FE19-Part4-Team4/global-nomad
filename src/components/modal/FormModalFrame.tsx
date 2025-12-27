import Button from '../Button';

interface FormModalFrameProps {
  children: React.ReactNode;
  submitBtnText: string;
  disabled?: boolean;
  onCloseModal: () => void;
  onSubmit: () => Promise<void>;
  className?: string;
}

/**
 *
 * @example
 * const {closeModal} = useModal()
 * const handleSubmit = () => {...}
 * const onCloseModal = () => {
 *  closeModal(ReviewModal)
 * }
 * <FormModalFrame
 *  submitBtnText="제출하기"
 *  disabled={false}
 *  onCloseModal={onCloseModal}
 *  onSubmit={handleSubmit}
 * >
 *  <div>후기를 작성하세요</div>
 *  <Textarea/>
 * </FormModalFrame>
 */

export default function FormModalFrame({
  children,
  submitBtnText,
  disabled = false,
  onCloseModal,
  onSubmit,
  className,
}: FormModalFrameProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background flex h-fit flex-col gap-5 rounded-[30px] px-6 py-[20px] sm:gap-[30px] sm:px-[30px] sm:py-6">
      <div className={className}>{children}</div>
      <div className="flex w-full gap-2.5 sm:mb-5">
        <Button
          type="button"
          size="sm"
          variant={'secondary'}
          onClick={onCloseModal}
          className="w-[85px] sm:h-[54px] sm:w-[107px]">
          닫기
        </Button>
        <Button
          type="submit"
          size="sm"
          variant={'primary'}
          disabled={disabled}
          className="bold w-[185px] sm:h-[54px] sm:w-[210px]">
          {submitBtnText}
        </Button>
      </div>
    </form>
  );
}
