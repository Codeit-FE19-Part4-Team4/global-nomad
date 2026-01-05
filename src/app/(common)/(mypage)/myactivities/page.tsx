import PageHeader from '../components/PageHeader';

import EmptyState from '@/components/EmptyState';

export default function MyActivities() {
  return (
    <div>
      <PageHeader
        title="내 체험 관리"
        description="체험을 등록하거나 수정 및 삭제가 가능합니다."
      />
      <EmptyState
        description="아직 등록한 체험이 없어요."
        buttonText="체험 등록하기"
        buttonHref="/activity/post"
      />
    </div>
  );
}
