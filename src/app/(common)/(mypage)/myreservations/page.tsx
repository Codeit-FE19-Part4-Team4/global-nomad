import PageHeader from '../components/PageHeader';

import EmptyState from '@/components/EmptyState';

export default function MyReservations() {
  return (
    <div>
      <PageHeader
        title="예약내역"
        description="예약내역 변경 및 취소할 수 있습니다."
      />
      <EmptyState
        description="아직 예약 내역이 없어요"
        buttonText="체험 둘러보기"
        buttonHref="/"
      />
    </div>
  );
}
