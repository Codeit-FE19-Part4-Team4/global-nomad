'use client';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useReducer, useState } from 'react';

import { postActivity, postActivityImage } from '@/api/activities';
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
import type {
  PostActivityRequest,
  CategoryType,
  ScheduleBase,
} from '@/types/activities';

const ScheduleForm = dynamic(() => import('@/components/ScheduleForm'), {
  ssr: false,
});

const INITIAL_FORM: PostActivityRequest = {
  title: '',
  category: '',
  description: '',
  price: 0,
  address: '',
  schedules: [],
  bannerImageUrl: '',
  subImageUrls: [],
};

type Action<K extends keyof PostActivityRequest> =
  | {
      type: 'CHANGE_FIELD';
      field: K;
      value: PostActivityRequest[K];
    }
  | { type: 'RESET' };

const reducer = (
  state: PostActivityRequest,
  action: Action<keyof PostActivityRequest>
) => {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'RESET':
      return INITIAL_FORM;
  }
};

export default function ActivityForm() {
  const [state, dispatch] = useReducer(reducer, INITIAL_FORM);
  const [bannerImage, setBannerImage] = useState<File[]>([]);
  const [subImages, setSubImages] = useState<File[]>([]);
  const handleChangeField = <K extends keyof PostActivityRequest>(
    field: K,
    value: PostActivityRequest[K]
  ) => {
    return dispatch({
      type: 'CHANGE_FIELD',
      field,
      value,
    });
  };
  const { title, category, description, price, address, schedules } = state;

  const handleDeleteImages = async (
    imageType: 'bannerImage' | 'subImage',
    selectedFile: File
  ) => {
    if (imageType === 'bannerImage') {
      setBannerImage([]);
    } else {
      setSubImages((prev) => {
        return prev.filter((file) => file !== selectedFile);
      });
    }
  };

  const handleSchedule = (method: 'add' | 'delete', schedule: ScheduleBase) => {
    const schedules = [...state.schedules, schedule].map((schedule) => {
      const date = moment(schedule.date, 'YYYY-MM-DD').format('YYYY-MM-DD');
      return { ...schedule, date };
    });
    const filteredSchedule = state.schedules.filter(
      (item) => item !== schedule
    );
    handleChangeField(
      'schedules',
      method === 'add' ? schedules : filteredSchedule
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bannerImage?.length === 0) {
      alert('배너이미지를 등록해주세요.');
      return;
    }
    const bannerImageUrl = await Promise.all(
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
      bannerImageUrl: bannerImageUrl[0],
      subImageUrls,
    };
    console.log(state);
    await postActivity(requestData);
  };

  return (
    <div className="mx-auto flex max-w-[700px] flex-col gap-6 lg:mt-10 lg:mb-25">
      <h2 className="bold text-[18px]">내 체험 등록</h2>
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
          {/* 외부 api 연결 필요 */}
          <TextInput
            label="주소"
            placeholder="주소를 입력해 주세요"
            value={address}
            onChange={(address) => handleChangeField('address', address)}
          />
          <div className="flex flex-col gap-0">
            <span className="bold text-[16px]">예약 가능 시간대</span>
            <ScheduleForm
              initialSchedules={[]}
              onAdd={(schedule) => handleSchedule('add', schedule)}
              // 체험 등록일 때만 고려한 로직
              onDelete={(schedule) => {
                const defaultSchedule = schedule as ScheduleBase;
                handleSchedule('delete', defaultSchedule);
              }}
            />
          </div>
          <UploadImageList
            maxImages={1}
            multiple={false}
            onUploadImage={(file) => setBannerImage(file)}
            onDeleteImage={(file) => handleDeleteImages('bannerImage', file)}>
            배너 이미지 등록
          </UploadImageList>
          <UploadImageList
            maxImages={4}
            multiple={true}
            onUploadImage={(files) => setSubImages(files)}
            onDeleteImage={(file) => handleDeleteImages('subImage', file)}>
            소개 이미지 등록
          </UploadImageList>
          <Button
            disabled={
              !title ||
              !category ||
              !description ||
              !price ||
              !address ||
              schedules.length === 0 ||
              bannerImage.length === 0
            }
            type="submit"
            as="button"
            variant="primary"
            className="w-full">
            등록하기
          </Button>
        </div>
      </form>
    </div>
  );
}
