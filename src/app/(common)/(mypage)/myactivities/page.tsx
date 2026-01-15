'use client';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import PageHeader from '../components/PageHeader';

import MyActivitiesClient from './MyActivitiesClient';

import { deleteMyActivities, getMyActivities } from '@/api/myActivities';
import LoadingSpinner from '@/components/LoadingSpinner';
import BasicModal from '@/components/modal/BasicModal';
import CancelModal from '@/components/modal/CancelModal';
import { useModal } from '@/hooks/useModal';
import { ResponseMyActivities } from '@/types/myactivities';

export default function MyActivities() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  // 내 체험 목록
  const infiniteQuery = useInfiniteQuery<
    ResponseMyActivities,
    Error,
    InfiniteData<ResponseMyActivities>,
    [string],
    number | null
  >({
    queryKey: ['myactivities'],
    queryFn: ({ pageParam }) =>
      getMyActivities({ cursorId: pageParam, size: 5 }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.cursorId,
  });
  const activities =
    infiniteQuery.data?.pages.flatMap((page) => page.activities) ?? [];

  // 수정하기
  const handleEdit = (id: number) => {
    router.push(`/activity/${id}/edit`);
  };

  // 삭제하기
  const handleDelete = (id: number) => {
    openModal({
      component: CancelModal,
      props: {
        message: '체험을 삭제하시겠습니까?',
        rightBtnText: '네',
        onConfirmDelete: () => {
          closeModal(CancelModal);
          mutationDelete.mutate(id);
        },
      },
    });
  };
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: (activityId: number) => deleteMyActivities(activityId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myactivities'],
      });
    },
    onError: (error) => {
      openModal({
        component: BasicModal,
        props: {
          message: error.message,
          buttonText: '확인',
          onClick: () => closeModal(BasicModal),
        },
      });
    },
  });

  if (infiniteQuery.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="relative">
      <PageHeader
        title="체험 관리"
        description="체험을 등록하거나 수정 및 삭제가 가능합니다."
      />
      <MyActivitiesClient
        data={activities}
        onCreate={() => router.push('/activity/post')}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loadMoreRef={loadMoreRef}
        hasNextPage={infiniteQuery.hasNextPage}
        isFetchingNextPage={infiniteQuery.isFetchingNextPage}
        fetchNextPage={infiniteQuery.fetchNextPage}
      />
    </div>
  );
}
