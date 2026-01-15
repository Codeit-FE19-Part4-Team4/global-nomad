import Image from 'next/image';
import { useRouter } from 'next/navigation';

import IcMap from '@/assets/icons/activities/ic-map.svg';
import {
  DropDown,
  DropDownItem,
  DropDownList,
  DropDownTrigger,
} from '@/components/DropDown';
import CancelModal from '@/components/modal/CancelModal';
import RatingSummary from '@/components/RatingSummary';
import Text from '@/components/Text';
import { useModal } from '@/hooks/useModal';
import { cn } from '@/util/cn';

type ActivitiesInfoProps = {
  isOwner: boolean;
  id: number;
  title: string;
  category: string;
  address: string;
  rating: number;
  reviewCount: number;
  onDelete: () => void;
};

export default function ActivitiesInfo({
  isOwner,
  id,
  title,
  category,
  address,
  rating,
  reviewCount,
  onDelete,
}: ActivitiesInfoProps) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const handleActivityDelete = () => {
    openModal({
      component: CancelModal,
      props: {
        message: '체험을 삭제하시겠습니까?',
        rightBtnText: '네',
        onConfirmDelete: () => {
          closeModal(CancelModal);
          onDelete();
        },
      },
    });
  };

  return (
    <div className={cn('mt-5 flex gap-5', 'md:mt-6', 'lg:mt-0 lg:mb-15')}>
      <div className="flex-1">
        <Text
          as="span"
          size="body-sm"
          className="medium -tracking-[2.5%] text-gray-700">
          {category}
        </Text>
        <Text as="h2" className="bold mt-1 md:mt-2.5 lg:mt-2">
          {title}
        </Text>
        <div className="mt-4">
          <RatingSummary rating={rating} reviewCount={reviewCount} />
        </div>
        <div className="mt-2.5 flex gap-0.5">
          <Image src={IcMap} width={16} height={16} alt="" />
          <Text
            as="span"
            size="body-sm"
            className="medium -tracking-[2.5%] text-gray-700">
            {address}
          </Text>
        </div>
      </div>
      {isOwner && (
        <DropDown type="menu">
          <DropDownTrigger />
          <DropDownList>
            <DropDownItem onSelect={() => router.push(`/activity/${id}/edit`)}>
              수정
            </DropDownItem>
            <DropDownItem onSelect={handleActivityDelete}>삭제</DropDownItem>
          </DropDownList>
        </DropDown>
      )}
    </div>
  );
}
