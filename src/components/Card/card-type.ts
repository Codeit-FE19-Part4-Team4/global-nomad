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

type Experience = {
  id: number;
  title: string;
  bannerImageUrl: string;
  price: number;
  rating: number;
  reviewCount: number;
};
export interface ExperienceCardProps extends CardBaseProps {
  item: Experience;
  rating: number;
  reviewCount: number;
}
export interface ExperienceManageCardProps extends CardBaseProps {
  item: Experience;
  rating: number;
  reviewCount: number;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

type ReservationCard = {
  totalPrice: number;
  date: string;
  startTime: string;
  endTime: string;
  headCount: number;
  activity: {
    id: number;
    title: string;
    bannerImageUrl: string;
  };
  status: experienceStatusType;
  reviewSubmitted: boolean;
};
export interface ReservationCardProps extends CardBaseProps {
  item: ReservationCard;
  onReviewSubmit?: (id: number) => void;
  onReserveCancel?: (id: number) => void;
}
