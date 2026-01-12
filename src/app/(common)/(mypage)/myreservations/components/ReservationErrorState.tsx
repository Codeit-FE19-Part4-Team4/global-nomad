import Image from 'next/image';

import errorReservationImg from '@/assets/images/common/img-empty.svg';
import Button from '@/components/Button';

interface Props {
  onRetry: () => void;
  title?: string;
  description?: string;
}

/**
 * 예약 내역 조회 실패 시 보여주는 에러 상태 UI 컴포넌트
 *
 * 역할:
 * - 에러 이미지 + 안내 문구 표시
 * - '다시 시도' 버튼 제공
 * - 상위 컴포넌트에서 전달한 onRetry 실행
 */
export default function ReservationErrorState({
  onRetry,
  title = '예약 내역을 불러오지 못했어요',
  description = '네트워크 상태를 확인하고 다시 시도해 주세요.',
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-15 text-center">
      {/* 에러 일러스트 이미지 */}
      <Image
        src={errorReservationImg}
        alt={title}
        width={100}
        height={100}
        priority
      />

      {/* 타이틀 문구 */}
      <p className="title-md mt-4">{title}</p>

      {/* 설명 문구 */}
      <p className="body-md secondary mt-2">{description}</p>

      {/* 다시 시도 버튼 */}
      <Button
        variant="primary"
        size="lg"
        className="mt-6 w-full max-w-50"
        onClick={onRetry}>
        다시 시도
      </Button>
    </div>
  );
}
