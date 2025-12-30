import Image from 'next/image';

import IcStarOff from '@/assets/icons/main/ic-star-off.svg';
import IcStarOn from '@/assets/icons/main/ic-star-on.svg';

type RatingProps = {
  value: number;
  onChange?: (value: number) => void;
};

const STARS = [1, 2, 3, 4, 5] as const;
const starButtonClass =
  'cursor-pointer transition-transform hover:scale-105 active:scale-95';

/**
 * Rating 컴포넌트
 *
 * @example
 * <Rating value={3} /> 👉🏻 읽기 전용 (3점 표시)
 *
 * const [value, setValue] = useState(4);
 * <Rating value={value} onChange={setValue} /> 👉🏻 클릭 가능 (별점 선택)
 */
export default function Rating({ value, onChange }: RatingProps) {
  const isInteractive = Boolean(onChange);
  const sizeClass = isInteractive
    ? 'w-9 h-9 md:w-[42px] md:h-[42px]'
    : 'w-5 h-5';
  const size = isInteractive ? 42 : 20;

  // 별 아이콘 렌더링
  const starIcon = (star: number) => {
    const icon = (
      <Image
        src={star <= value ? IcStarOn : IcStarOff}
        alt={`${star}점`}
        width={size}
        height={size}
        className={sizeClass}
      />
    );

    if (isInteractive) {
      return (
        <button
          key={star}
          type="button"
          className={starButtonClass}
          onClick={() => onChange?.(star)}>
          {icon}
        </button>
      );
    }

    return <span key={star}>{icon}</span>;
  };

  return <div className="flex gap-0.5 md:gap-2">{STARS.map(starIcon)}</div>;
}
