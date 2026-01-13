'use client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import PageHeader from '../components/PageHeader';

import MyActivitiesClient from './MyActivitiesClient';

import { getMyActivities } from '@/api/myActivities';
import LoadingSpinner from '@/components/LoadingSpinner';
import { RequestMyActivities } from '@/types/myactivities';

export default function MyActivities() {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const params: RequestMyActivities = {
    cursorId: null,
    size: 5,
  };
  const { data: myactivitiesData, isLoading } = useQuery({
    queryKey: ['myactivities'],
    queryFn: () => getMyActivities(params),
  });
  if (isLoading) return <LoadingSpinner />;
  if (!myactivitiesData) return null;

  // 수정하기
  const handleEdit = (id: number) => {
    router.push(`/activity/${id}/edit`);
  };
  // 삭제하기
  const handleDelete = (id: number) => {
    // TODO: 삭제 API 연결 및 useMutation 사용
  };

  return (
    <div className="relative">
      <PageHeader
        title="내 체험 관리"
        description="체험을 등록하거나 수정 및 삭제가 가능합니다."
      />
      <MyActivitiesClient
        data={myactivitiesData.activities}
        onCreate={() => router.push('/activity/post')}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loadMoreRef={loadMoreRef}
      />
    </div>
  );
}
