import EmptyState from '@/components/EmptyState';

export default function MyActivities() {
  return (
    <EmptyState
      description="아직 등록한 체험이 없어요."
      buttonText="체험 등록하기"
      buttonHref="/activity/post"
    />
  );
}
