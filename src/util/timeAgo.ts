export function getTimeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return '방금';

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes < 60) return `${minutes}분`;

  const hours = Math.floor(diffInSeconds / 3600);
  if (hours < 24) return `${hours}시간`;

  const days = Math.floor(diffInSeconds / 86400);
  if (days < 7) return `${days}일`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}주`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}개월`;

  const years = Math.floor(days / 365);
  return `${years}년`;
}
