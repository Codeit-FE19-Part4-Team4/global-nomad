'use client';
import { useQuery } from '@tanstack/react-query';

import { getMyActivities } from '@/api/myActivities';
import {
  DropDown,
  DropDownItem,
  DropDownList,
  DropDownTrigger,
} from '@/components/DropDown';
import ReservationManagementCalendar from '@/components/reservation-management/ReservationManagementCalendar';

export default function Page() {
  const { data: myActivitiesData } = useQuery({
    queryKey: ['activities-reservation'],
    queryFn: () => getMyActivities(),
  });
  //TODO:로딩 에러처리
  if (!myActivitiesData) {
    return null;
  }
  const { activities } = myActivitiesData;
  return (
    <div className="mb-4 flex flex-col gap-5 max-md:mx-[-24px] max-md:mt-[10px] md:mb-21 md:gap-6 lg:gap-[30px]">
      <div className="max-md:px-6">
        <h2 className="bold text-[18px] text-gray-950">예약 현황</h2>
        <span className="text-[14px] font-normal text-gray-500">
          내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다.
        </span>
      </div>
      {activities.length > 0 && (
        <DropDown type="select" className="max-md:px-6">
          <DropDownTrigger placeholder={activities[0].title}></DropDownTrigger>
          <DropDownList>
            {activities.map((activity) => (
              <DropDownItem key={activity.id}>{activity.title}</DropDownItem>
            ))}
          </DropDownList>
        </DropDown>
      )}
      <ReservationManagementCalendar
        onSelectSlot={() => console.log('onselectslot')}
      />
    </div>
  );
}
