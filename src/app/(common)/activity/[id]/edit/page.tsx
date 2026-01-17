'use client';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useReducer, useState, use, useEffect } from 'react';

import PostCode from '../../PostCode';
import usePreventNavigation from '../../usePreventNavigation';

import { getActivityDetail, postActivityImage } from '@/api/activities';
import { updateActivity } from '@/api/myActivities';
import Button from '@/components/Button';
import {
  DropDown,
  DropDownTrigger,
  DropDownList,
  DropDownItem,
} from '@/components/DropDown';
import { FILTER_CATEGORIES } from '@/components/Filter/filter-category';
import UploadImageList from '@/components/image-upload/UploadImageList';
import { TextArea, TextInput } from '@/components/Input';
import BasicModal from '@/components/modal/BasicModal';
import { useModal } from '@/hooks/useModal';
import type {
  UpdateActivityRequest,
  CategoryType,
  ScheduleBase,
} from '@/types/activities';

const ScheduleForm = dynamic(() => import('@/components/ScheduleForm'), {
  ssr: false,
});

type Action<K extends keyof UpdateActivityRequest> =
  | {
      type: 'CHANGE_FIELD';
      field: K;
      value: UpdateActivityRequest[K];
    }
  | {
      type: 'INIT';
      payload: UpdateActivityRequest;
    };

const reducer = (
  state: UpdateActivityRequest,
  action: Action<keyof UpdateActivityRequest>
) => {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'INIT':
      return action.payload;
  }
};
interface PageProps {
  params: Promise<{ id: number }>;
}
export default function Page({ params }: PageProps) {
  const { id: activityId } = use(params);

  const { data: activityDetailData, isLoading } = useQuery({
    queryKey: ['activity', activityId, 'edit'],
    queryFn: () => getActivityDetail(activityId),
  });

  const INITIAL_FORM: UpdateActivityRequest = {
    title: '',
    category: '문화 · 예술',
    description: '',
    price: 0,
    address: '',
    bannerImageUrl: '',
    subImageIdsToRemove: [],
    subImageUrlsToAdd: [],
    scheduleIdsToRemove: [],
    schedulesToAdd: [],
  };
  const [isSaved, setIsSaved] = useState(false);
  const [state, dispatch] = useReducer(reducer, INITIAL_FORM);
  const [isInitialized, setIsInitialized] = useState(false);
  const [bannerImage, setBannerImage] = useState<File[]>([]);
  const [subImages, setSubImages] = useState<File[]>([]);
  const [baseAddress, setBaseAddress] = useState('');
  const [isValidSchedule, setIsValidSchedule] = useState(true);
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  usePreventNavigation(!isSaved);
  const {
    title,
    description,
    price,
    address,
    scheduleIdsToRemove,
    schedulesToAdd,
    subImageIdsToRemove,
    bannerImageUrl,
  } = state;

  useEffect(() => {
    if (activityDetailData && !isInitialized) {
      dispatch({
        type: 'INIT',
        payload: {
          title: activityDetailData.title,
          category: activityDetailData.category,
          description: activityDetailData.description,
          price: activityDetailData.price,
          address: activityDetailData.address,
          bannerImageUrl: activityDetailData.bannerImageUrl,
          subImageIdsToRemove: [],
          subImageUrlsToAdd: [],
          scheduleIdsToRemove: [],
          schedulesToAdd: [],
        },
      });
      setBaseAddress(activityDetailData.address);
      setIsInitialized(true);
    }
  }, [activityDetailData, isInitialized]);

  useEffect(() => {
    if (!activityDetailData) {
      return;
    }
    if (scheduleIdsToRemove.length === activityDetailData?.schedules.length) {
      setIsValidSchedule(schedulesToAdd.length > 0);
    } else {
      setIsValidSchedule(true);
    }
  }, [schedulesToAdd, scheduleIdsToRemove, activityDetailData]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!activityDetailData) {
    throw new Error('데이터를 불러오지 못했습니다.');
  }

  const handleChangeField = <K extends keyof UpdateActivityRequest>(
    field: K,
    value: UpdateActivityRequest[K]
  ) => {
    return dispatch({
      type: 'CHANGE_FIELD',
      field,
      value,
    });
  };

  const handleDeleteSchedule = (schedule: number | ScheduleBase) => {
    if (typeof schedule === 'number') {
      const newScheduleIdsToRemove = [...scheduleIdsToRemove, schedule];
      handleChangeField('scheduleIdsToRemove', newScheduleIdsToRemove);
    } else {
      const scheduleNotToAddIndex = schedulesToAdd.findIndex(
        (item) =>
          item.date === schedule.date &&
          item.endTime === schedule.endTime &&
          item.startTime === schedule.startTime
      );
      if (scheduleNotToAddIndex > -1) {
        const newSchedule = [...schedulesToAdd];
        newSchedule.splice(scheduleNotToAddIndex, 1);
        handleChangeField('schedulesToAdd', newSchedule);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const bannerImageUploadUrl = await Promise.all(
        bannerImage.map(async (image: File) => {
          const res = await postActivityImage(image);
          return res.activityImageUrl;
        })
      );
      const subImageUrls =
        subImages.length > 0
          ? await Promise.all(
              subImages.map(async (image: File) => {
                const res = await postActivityImage(image);
                return res.activityImageUrl;
              })
            )
          : [];
      const requestData = {
        ...state,
        bannerImageUrl: bannerImage.length
          ? bannerImageUploadUrl[0]
          : bannerImageUrl,
        subImageUrlsToAdd: subImageUrls,
      };
      setIsSaved(true);
      await updateActivity(requestData, activityId);
      openModal({
        component: BasicModal,
        props: {
          message: (
            <div className="flex flex-col justify-center">
              <span>체험 수정이 완료되었습니다.</span>
              <span>내 체험 관리 페이지로 이동합니다.</span>
            </div>
          ),
          buttonText: '확인',
          onClick: () => {
            closeModal(BasicModal);
            router.push('/myactivities');
          },
        },
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="mx-auto flex max-w-[700px] flex-col gap-6 lg:mt-10 lg:mb-25">
      <h2 className="bold text-[18px]">내 체험 수정</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <TextInput
          label="제목"
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={(title) => handleChangeField('title', title)}
        />
        <div className="flex flex-col gap-2.5">
          <span className="bold text-[16px]">카테고리</span>
          <DropDown
            type="select"
            value={state.category}
            onValueChange={(category) => {
              const realCategory = category as CategoryType;
              handleChangeField('category', realCategory);
            }}>
            <DropDownTrigger placeholder="카테고리를 선택해 주세요"></DropDownTrigger>
            <DropDownList>
              {FILTER_CATEGORIES.map((category) => (
                <DropDownItem key={category}>{category}</DropDownItem>
              ))}
            </DropDownList>
          </DropDown>
        </div>
        <TextArea
          label="설명"
          placeholder="체험에 대한 설명을 입력해 주세요"
          value={description}
          onChange={(description) =>
            handleChangeField('description', description)
          }
        />
        <TextInput
          type="number"
          label="가격"
          placeholder="체험 금액을 입력해 주세요"
          value={price === 0 ? '' : price.toString()}
          onChange={(price) => handleChangeField('price', +price)}
        />
        <div className="flex flex-col gap-[30px]">
          <div className="flex flex-col gap-2.5">
            <PostCode
              initAddress={activityDetailData.address}
              onChangeAddress={(address) => {
                setBaseAddress(address);
                handleChangeField('address', address);
              }}
            />
          </div>
          <div className="flex flex-col gap-0">
            <span className="bold text-[16px]">예약 가능 시간대</span>
            <ScheduleForm
              initialSchedules={activityDetailData.schedules}
              onAdd={(schedule) => {
                const newSchedule = {
                  ...schedule,
                  date: moment(schedule.date, 'YYYY-MM-DD').format(
                    'YYYY-MM-DD'
                  ),
                };
                handleChangeField('schedulesToAdd', [
                  ...schedulesToAdd,
                  newSchedule,
                ]);
              }}
              onDelete={handleDeleteSchedule}
            />
          </div>
          <UploadImageList
            initImages={[
              {
                id: activityDetailData.bannerImageUrl,
                imageUrl: activityDetailData.bannerImageUrl,
              },
            ]}
            maxImages={1}
            multiple={false}
            onUploadImage={(file) => setBannerImage(file)}
            onDeleteImage={() => setBannerImage([])}
            handleDeleteInitImage={() =>
              handleChangeField('bannerImageUrl', '')
            }>
            배너 이미지 등록
          </UploadImageList>
          <UploadImageList
            initImages={activityDetailData.subImages}
            maxImages={4}
            multiple={true}
            onUploadImage={(files) => setSubImages(files)}
            onDeleteImage={(file) =>
              setSubImages((prev) => prev.filter((item) => item !== file))
            }
            handleDeleteInitImage={(id) =>
              handleChangeField('subImageIdsToRemove', [
                ...subImageIdsToRemove,
                +id,
              ])
            }>
            소개 이미지 등록
          </UploadImageList>
          <Button
            disabled={
              (!bannerImageUrl && bannerImage.length === 0) ||
              !title ||
              !description ||
              !address ||
              !isValidSchedule
            }
            type="submit"
            as="button"
            variant="primary"
            className="w-full">
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
}
