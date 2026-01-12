'use client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import PageHeader from '../components/PageHeader';

import MyActivitiesClient from './MyActivitiesClient';

import { getMyActivities } from '@/api/myActivities';
import { RequestMyActivities } from '@/types/myactivities';

export default function MyActivities() {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const params: RequestMyActivities = {
    cursorId: null,
    size: 5,
  };
  const { data: myactivitiesData } = useQuery({
    queryKey: ['myactivities'],
    queryFn: () => getMyActivities(params),
  });
  if (!myactivitiesData) return null;

  console.log(myactivitiesData);

  // 수정하기
  const handleEdit = (id: number) => {
    router.push(`/activity/${id}/edit`);
  };
  // 삭제하기
  const handleDelete = (id: number) => {
    console.log(id + ' : Delete');
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
