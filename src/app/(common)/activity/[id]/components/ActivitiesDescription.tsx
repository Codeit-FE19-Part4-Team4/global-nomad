import Text from '@/components/Text';
import { cn } from '@/util/cn';

type DescriptionProps = {
  description: string;
};

export default function ActivitiesDescription({
  description,
}: DescriptionProps) {
  return (
    <div
      className={cn(
        'mt-5 border-t border-gray-100 pt-5',
        'md:mt-6 md:pt-7.5',
        'lg:mt-0 lg:border-none lg:pt-10'
      )}>
      <Text
        as="h3"
        className="body-lg md:title-sm mb-2 font-[var(--weight-title-xl)]!">
        체험 설명
      </Text>
      <Text
        as="p"
        size="body-lg"
        className="medium -tracking-[2.5%] break-keep">
        {description}
      </Text>
    </div>
  );
}
