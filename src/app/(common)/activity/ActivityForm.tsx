'use client';
// import dynamic from 'next/dynamic';
import { useReducer } from 'react';

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
import type { ScheduleBase } from '@/types/activities';

// const ScheduleForm = dynamic(() => import('@/components/ScheduleForm'), {
//   ssr: false,
// });

const INITIAL_FORM = {
  title: '',
  category: '',
  description: '',
  price: 0,
  address: '',
  schedulesToAdd: [],
  scheduleIdsToRemove: [],
  bannerImage: [],
  subImage: [],
};

type FormState = {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  schedulesToAdd: ScheduleBase[];
  scheduleIdsToRemove: number[];
  bannerImage: File[];
  subImage: File[];
};

type Action<K extends keyof FormState> =
  | {
      type: 'CHANGE_FIELD';
      field: K;
      value: FormState[K];
    }
  | { type: 'RESET' };

const reducer = (state: FormState, action: Action<keyof FormState>) => {
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
  const handleChangeField = <K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    return dispatch({
      type: 'CHANGE_FIELD',
      field,
      value,
    });
  };
  const {
    title,
    category,
    description,
    price,
    address,
    schedulesToAdd,
    bannerImage,
    subImage,
  } = state;
  return (
    <div className="mx-auto flex max-w-[700px] flex-col gap-6 lg:mt-10 lg:mb-25">
      <h2 className="bold text-[18px]">내 체험 등록</h2>
      <form className="flex flex-col gap-6">
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
            onValueChange={(category) =>
              handleChangeField('category', category)
            }>
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
          <div className="flex flex-col gap-2.5">
            <span className="text-[16px] font-medium">상세 주소</span>
            <TextInput placeholder="상세주소를 입력해 주세요" value={address} />
          </div>
          <div className="flex flex-col gap-0">
            <span className="bold text-[16px]">예약 가능 시간대</span>
          </div>
          <UploadImageList
            maxImages={1}
            multiple={false}
            onUploadImage={(bannerImage) =>
              handleChangeField('bannerImage', bannerImage)
            }>
            배너 이미지 등록
          </UploadImageList>
          <UploadImageList
            maxImages={4}
            multiple={true}
            onUploadImage={(subImage) =>
              handleChangeField('subImage', subImage)
            }>
            소개 이미지 등록
          </UploadImageList>
          <Button
            disabled={
              !title ||
              !category ||
              !description ||
              !price ||
              !address ||
              !schedulesToAdd ||
              !bannerImage
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
