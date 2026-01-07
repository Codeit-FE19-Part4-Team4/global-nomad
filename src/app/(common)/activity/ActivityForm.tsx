'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';

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

const ScheduleForm = dynamic(() => import('@/components/ScheduleForm'), {
  ssr: false,
});

export default function ActivityForm() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [schedulesToAdd, setSchedulesToAdd] = useState<ScheduleBase[]>([]);
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  const [bannerImage, setBannerImage] = useState<File[] | null>(null);
  const [subImage, setSubImage] = useState<File[] | null>(null);

  const handleAddSchedule = (schedule: ScheduleBase) => {
    setSchedulesToAdd((prev) => [...prev, schedule]);
  };
  const handleDeleteSchedule = (item: number | ScheduleBase) => {
    if (typeof item === 'number') {
      setScheduleIdsToRemove((prev) =>
        prev.includes(item) ? prev : [...prev, item]
      );
      return;
    }
    setSchedulesToAdd((prev) =>
      prev.filter(
        (schedule) =>
          !(
            schedule.date === item.date &&
            schedule.startTime === item.startTime &&
            schedule.endTime === item.endTime
          )
      )
    );
  };

  return (
    <div className="mx-auto flex max-w-[700px] flex-col gap-6 lg:mt-10 lg:mb-25">
      <h2 className="bold text-[18px]">내 체험 등록</h2>
      <form className="flex flex-col gap-6">
        <TextInput
          label="제목"
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={(title) => setTitle(title)}
        />
        <div className="flex flex-col gap-2.5">
          <span className="bold text-[16px]">카테고리</span>
          <DropDown
            type="select"
            value={category}
            onValueChange={(value) => setCategory(value)}>
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
          onChange={(description) => setDescription(description)}
        />
        <TextInput
          label="가격"
          placeholder="체험 금액을 입력해 주세요"
          value={price}
          onChange={(price) => setPrice(price)}
        />
        <div className="flex flex-col gap-[30px]">
          {/* 외부 api 연결 필요 */}
          <TextInput
            label="주소"
            placeholder="주소를 입력해 주세요"
            value={address}
            onChange={(address) => setAddress(address)}
          />
          <div className="flex flex-col gap-2.5">
            <span className="text-[16px] font-medium">상세 주소</span>
            <TextInput
              placeholder="상세주소를 입력해 주세요"
              value={address}
              onChange={setAddress}
            />
          </div>
          <div className="flex flex-col gap-0">
            <span className="bold text-[16px]">예약 가능 시간대</span>
            <ScheduleForm
              initialSchedules={[]}
              onAdd={handleAddSchedule}
              onDelete={handleDeleteSchedule}
            />
          </div>
          <UploadImageList
            maxImages={1}
            multiple={false}
            onUploadImage={(file) => setBannerImage(file)}>
            배너 이미지 등록
          </UploadImageList>
          <UploadImageList maxImages={4} multiple={true}>
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
