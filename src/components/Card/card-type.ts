import { ReservationUIStatus } from '@/constants/reservation-ui-status';

export type cardType = 'card' | 'list';

export interface ExperienceCardBase {
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}
export interface ExperienceCardProps {
  type?: cardType;
  item: ExperienceCardBase;
  className?: string;
}
export interface ExperienceManageCardProps {
  type?: cardType;
  item: ExperienceCardBase;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}
export interface ReservationCard {
  id: number;
  activity: activityType;
  totalPrice: number;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  status: ReservationUIStatus;
  reviewSubmitted: boolean;
}

export type activityType = {
  title: string;
  bannerImageUrl: string;
  id: number;
};

export interface ReservationCardProps {
  type?: cardType;
  item: ReservationCard;
  onReviewSubmit?: (id: number) => void;
  onReserveCancel?: (id: number) => void;
}
