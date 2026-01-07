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
  onSubmit?: (
    reservationId: number,
    rating: number,
    content: string
  ) => Promise<void>;
}

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
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    if (onSubmit) {
      await onSubmit(reservationId, rating, content);
    }
    onCloseModal();
  };

  const isDisabled = rating === 0 || content.length === 0;

  return (
    <FormModalFrame
      submitBtnText="작성완료"
      disabled={isDisabled}
      onCloseModal={onCloseModal}
      onSubmit={handleSubmit}>
      {/* 제목 & 정보 */}
      <div className="text-center">
        <h2 className="body-lg bold">{title}</h2>
        <p className="body-sm medium text-gray-500">
          {date} / {startTime} - {endTime} ({headCount}명)
        </p>
      </div>

      {/* 별점 */}
      <div className="mt-3.5 flex justify-center">
        <Rating value={rating} onChange={setRating} />
      </div>

      {/* 후기 입력 */}
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
