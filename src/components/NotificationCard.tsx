import { cn } from '@/util/cn';

interface NotificationCardProps {
  content: string;
  timeAgo?: string;
}

export default function NotificationCard({
  content,
  timeAgo,
}: NotificationCardProps) {
  const status = content.includes('승인') ? '승인' : '거절';
  const [beforeText, afterText] = content.split(status);
  return (
    <div>
      <span>예약 {status}</span>
      <div>
        <span>{beforeText}</span>
        <span
          className={cn(
            status === '승인' ? 'text-primary-500' : 'text-red-500'
          )}>
          {status}
        </span>
        <span>{afterText}</span>
      </div>
    </div>
  );
}
