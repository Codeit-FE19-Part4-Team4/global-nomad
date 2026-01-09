'use client';

import { useState } from 'react';

import { TextArea } from '@/components/Input';
import FormModalFrame from '@/components/modal/FormModalFrame';
import Rating from '@/components/Rating';

interface ReviewModalProps {
  reservationId: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;

  onCloseModal: () => void;

  // 리뷰 제출 액션 (API 호출은 상위에서 처리)
  onSubmit: (
    reservationId: number,
    rating: number,
    content: string
  ) => Promise<void>;
}

/**
 * ReviewModal (입력 폼 전용 모달 컴포넌트)
 *
 * 역할:
 * - 별점 및 후기 내용 입력 UI 제공
 * - 입력값 검증(버튼 비활성화) 처리
 * - 제출 시 상위에서 전달받은 onSubmit 호출
 * - 제출 완료 후 모달 닫기
 *
 * 책임 범위:
 * - 입력 상태 및 UI 인터랙션만 관리
 * - 실제 API 요청, 서버 상태 업데이트는 상위 컴포넌트에서 처리
 */
export default function ReviewModal({
  reservationId,
  title,
  date,
  startTime,
  endTime,
  headCount,
  onCloseModal,
  onSubmit,
}: ReviewModalProps) {
  // 현재 선택된 별점 (UI 입력 상태)
  const [rating, setRating] = useState(0);

  // 후기 내용 입력 값 (UI 입력 상태)
  const [content, setContent] = useState('');

  // 리뷰 제출 핸들러
  const handleSubmit = async () => {
    await onSubmit(reservationId, rating, content);
    onCloseModal();
  };

  // 필수 입력값이 없을 경우 제출 버튼 비활성화
  const isDisabled = rating === 0 || content.length === 0;

  return (
    <FormModalFrame
      submitBtnText="작성완료"
      disabled={isDisabled}
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}>
      {/* 체험 정보 영역 */}
      <div className="text-center">
        <h2 className="body-lg bold">{title}</h2>
        <p className="body-sm medium text-gray-500">
          {date} / {startTime} - {endTime} ({headCount}명)
        </p>
      </div>

      {/* 별점 입력 영역 */}
      <div className="mt-3.5 flex justify-center">
        <Rating value={rating} onChange={setRating} />
      </div>

      {/* 후기 텍스트 입력 영역 */}
      <div className="mt-7.5">
        <TextArea
          label="소중한 경험을 들려주세요"
          rows={4}
          value={content}
          onChange={setContent}
          placeholder="체험에서 느낀 경험을 자유롭게 남겨주세요"
          maxLength={100}
          showCount
        />
      </div>
    </FormModalFrame>
  );
}
