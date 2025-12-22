'use client';
import { useRouter } from 'next/navigation';
import DropDown from '@/components/DropDown';
import Text from '@/components/Text';
import { CATEGORY_OPTIONS, SORT_OPTIONS } from '@/constants/dropdown';

/**
  GET /my-activities
 */
export interface MyActivitieOption {
  id: number;
  title: string;
}
export const MYACTIVITIES_OPTIONS: MyActivitieOption[] = [
  { id: 0, title: '함께 배우면 즐거운 스트릿 댄스 1' },
  { id: 1, title: '함께 배우면 즐거운 스트릿 댄스 2' },
  {
    id: 2,
    title: '함께 배우면 즐거운 스트릿 댄스 함께 배우면 즐거운 스트릿 댄스 ',
  },
];

export default function TestPage() {
  const router = useRouter();
  const handleFilter = (val: string) => {
    console.log('필터 API연결' + val);
  };
  const handleEdit = () => {
    router.push('/edit');
  };
  const handleDelete = () => {
    console.log('삭제하기');
  };
  return (
    <div className="space-y-4 p-10">
      <Text as="h2" className="mb-6 text-2xl font-bold">
        Global Nomad
      </Text>
      <DropDown.Title as="h4" type="time" title="시작 시간" />
      <DropDown className="w-[120px]">
        <DropDown.Trigger placeholder="00:00" />
        <DropDown.List>
          <DropDown.Item>12:00</DropDown.Item>
          <DropDown.Item>01:00</DropDown.Item>
          <DropDown.Item>02:00</DropDown.Item>
        </DropDown.List>
      </DropDown>
      <DropDown.Title as="h4" type="apptTime" title="예약 시간" />
      <DropDown>
        <DropDown.Trigger className="h-[48px] md:h-[54px]">
          14:00 - 15:00
        </DropDown.Trigger>
        <DropDown.List>
          <DropDown.Item>14:00 - 15:00</DropDown.Item>
          <DropDown.Item>15:00 - 16:00</DropDown.Item>
          <DropDown.Item>17:00 - 18:00</DropDown.Item>
        </DropDown.List>
      </DropDown>
      <DropDown.Title as="h4" type="category" title="카테고리" />
      <DropDown>
        <DropDown.Trigger placeholder="카테고리를 선택해 주세요" />
        <DropDown.List>
          {CATEGORY_OPTIONS.map((item, index) => (
            <DropDown.Item key={index}>{item}</DropDown.Item>
          ))}
        </DropDown.List>
      </DropDown>
      <DropDown>
        <DropDown.Trigger>함께 배우면 즐거운 스트릿 댄스 1</DropDown.Trigger>
        <DropDown.List>
          {MYACTIVITIES_OPTIONS.map((item) => {
            const { id, title } = item;
            return <DropDown.Item key={id}>{title}</DropDown.Item>;
          })}
        </DropDown.List>
      </DropDown>
      <DropDown type="filter">
        <DropDown.Trigger>{SORT_OPTIONS[0].label}</DropDown.Trigger>
        <DropDown.List>
          {SORT_OPTIONS.map((item, index) => {
            const { label, value } = item;
            return (
              <DropDown.Item key={index} onSelect={() => handleFilter(value)}>
                {label}
              </DropDown.Item>
            );
          })}
        </DropDown.List>
      </DropDown>
      <div className="flex justify-end">
        <DropDown type="menu">
          <DropDown.Trigger />
          <DropDown.List>
            <DropDown.Item onSelect={handleEdit}>수정하기</DropDown.Item>
            <DropDown.Item onSelect={handleDelete}>삭제하기</DropDown.Item>
          </DropDown.List>
        </DropDown>
      </div>
    </div>
  );
}
