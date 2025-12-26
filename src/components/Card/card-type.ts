export type cardType = 'card' | 'list';
export type experienceStatusType =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'declined'
  | 'canceled';

export interface CardBaseProps {
  type?: cardType;
  id: number;
  title: string;
  price: number;
  bannerImageUrl: string;
  className?: string;
}
export interface ExperienceCardProps extends CardBaseProps {
  rating: number;
  reviewCount: number;
}
export interface ExperienceManageCardProps extends CardBaseProps {
  rating: number;
  reviewCount: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}
export interface ReservationCardProps extends CardBaseProps {
  activityId?: number;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  experienceStatus: experienceStatusType;
  reviewSubmitted: boolean;
  onReviewSubmit?: (id: number) => void;
  onReserveCancel?: (id: number) => void;
}
