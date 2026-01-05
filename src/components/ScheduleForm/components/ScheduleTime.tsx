import {
  DropDown,
  DropDownItem,
  DropDownList,
  DropDownTrigger,
} from '../../DropDown';
import { ScheduleTimeProps } from '../schedule-type';

import { TextInput } from '@/components/Input';
import Text from '@/components/Text';
import { TIME_OPTIONS } from '@/constants/activities';

export function ScheduleTime({
  feildKey,
  isDraft,
  value,
  title,
  onChange,
}: ScheduleTimeProps) {
  const handleSelectItem = (value: string) => {
    onChange?.(feildKey, value);
  };
  return (
    <div className="min-w-[85px] flex-1 shrink md:w-[121px] md:flex-none">
      {isDraft ? (
        <div className="relative pt-0 md:pt-[29px]">
          <Text
            as="span"
            className="text-body-lg absolute top-0 hidden font-[var(--weight-title-lg)] text-gray-950 md:block">
            {title}
          </Text>
          <DropDown value={value} onValueChange={handleSelectItem}>
            <DropDownTrigger placeholder="0:00" />
            <DropDownList>
              {TIME_OPTIONS.map((time, index) => (
                <DropDownItem key={index}>{time}</DropDownItem>
              ))}
            </DropDownList>
          </DropDown>
        </div>
      ) : (
        <TextInput title={title} value={value} readOnly />
      )}
    </div>
  );
}
