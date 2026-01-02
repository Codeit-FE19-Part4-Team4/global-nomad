import EmptyState from '@/components/EmptyState';

export default function MyReservations() {
  return (
    <EmptyState
      description="아직 예약 내역이 없어요"
      buttonText="체험 둘러보기"
      buttonHref="/"
    />
  );
}
