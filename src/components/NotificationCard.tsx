import Image from 'next/image';

import ic_trash from '@/assets/icons/common/ic-trash.svg';
import { cn } from '@/util/cn';

interface NotificationCardProps {
  content: string;
  timeAgo?: string;
  onDelete?: () => void;
}

export default function NotificationCard({
  content,
  timeAgo,
  onDelete,
}: NotificationCardProps) {
  const match = content.match(/^(.*)\(([^)]+)\)(.*)$/);

  if (!match) {
    return (
      <li className="hover:bg-primary-100 flex w-full flex-col gap-2 px-5 py-4">
        <div className="flex items-center justify-between gap-[10.5px]">
          <span className="bold flex-1 text-[14px] font-medium text-gray-950">
            알림
          </span>
          {timeAgo && (
            <span className="text-[12px] text-gray-400">{timeAgo} 전</span>
          )}
          {onDelete && (
            <button onClick={onDelete}>
              <Image src={ic_trash} alt="알림 삭제" />
            </button>
          )}
        </div>
        <p className="text-[14px] font-medium text-gray-800">{content}</p>
      </li>
    );
  }

  const [, activityName, reservationTime, statusComment] = match;
  const status = statusComment.includes('승인') ? '승인' : '거절';
  const [preText, postText] = statusComment.split(status);

  return (
    <li className="hover:bg-primary-100 flex w-full flex-col gap-2 px-5 py-4">
      <div className="flex items-center justify-between gap-[10.5px]">
        <span className="bold flex-1 text-[14px] font-medium text-gray-950">
          예약 {status}
        </span>
        {timeAgo && (
          <span className="text-[12px] text-gray-400">{timeAgo} 전</span>
        )}
        {onDelete && (
          <button onClick={onDelete} className="cursor-pointer">
            <Image src={ic_trash} alt="알림 삭제" />
          </button>
        )}
      </div>
      <p className="flex flex-col gap-1 text-[14px] font-medium text-gray-800">
        <span>{activityName}</span>
        <span>({reservationTime})</span>
        <span>
          <span>{preText}</span>
          <span
            className={cn(
              status === '승인' ? 'text-primary-500' : 'text-red-500'
            )}>
            {status}
          </span>
          <span>{postText}</span>
        </span>
      </p>
    </li>
  );
}
