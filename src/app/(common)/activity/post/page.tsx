'use client';
import { add } from 'date-fns';
import { useState } from 'react';

import Button from '@/components/Button';
import {
  DropDown,
  DropDownTrigger,
  DropDownList,
  DropDownItem,
} from '@/components/DropDown';
import { FILTER_CATEGORIES } from '@/components/Filter/filter-category';
import ImageForm from '@/components/image-upload/ImageForm';
import { TextArea, TextInput } from '@/components/Input';
import ScheduleForm from '@/components/ScheduleForm';
import type { ScheduleBase } from '@/types/activities';

export default function Page() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [schedulesToAdd, setSchedulesToAdd] = useState<ScheduleBase[]>([]);
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  return (
    <div>
      <h2 className="bold text-[18px]">내 체험 등록</h2>
      <form>
        <TextInput
          label="제목"
          placeholder="제목을 입력해 주세요"
          value={title}
          onChange={setTitle}
        />
        <div className="flex flex-col gap-2.5">
          <span className="bold text-[16px]">카테고리</span>
          <DropDown
            type="select"
            value={category}
            onValueChange={(category) => {
              console.log(category);
              setCategory(category);
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
          onChange={setDescription}
        />
        <TextInput
          label="가격"
          placeholder="체험 금액을 입력해 주세요"
          value={price}
          onChange={setPrice}
        />
        <TextInput
          label="주소"
          placeholder="주소를 입력해 주세요"
          value={address}
          onChange={setAddress}
        />
        <div className="flex flex-col gap-0">
          <span className="bold text-[16px]">예약 가능 시간대</span>
          <ScheduleForm
            initialSchedules={[]}
            setSchedulesToAdd={setSchedulesToAdd}
            setScheduleIdsToRemove={setScheduleIdsToRemove}
          />
        </div>
        <Button as="button" variant="primary" className="w-full">
          등록하기
        </Button>
      </form>
    </div>
  );
}
