'use client';
import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Button from './Button';

import ic_search from '@/assets/icons/main/ic-search.svg';
interface SearchbarProps {
  title: string;
  placeholder: string;
  onSearch?: (value: string) => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * @example
 * const ContainerComponent = () => {
 *  const searchParams = useSearchParams();
 *  const [value, setValue] = useState(searchParams.get('search') ?? '');
 *
 *  return(
 *    <Searchbar
 *      title="무엇을 검색.."
 *      placeholder="검색어를 입력하세요"
 *      onSearch={handleSearch} //params 조작 or 데이터 페칭에 필요한 함수
 *      value={value}
 *      setValue={setValue}/>
 *  )
 * }
 *
 */

export default function Searchbar({
  title,
  placeholder,
  onSearch,
  value,
  setValue,
}: SearchbarProps) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleClickButton = () => {
    const params = new URLSearchParams(searchParams);
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      params.delete('search');
      replace(`${pathName}?${params.toString()}`);
      return;
    }
    onSearch?.(trimmedValue);
    params.set('search', trimmedValue);
    replace(`${pathName}?${params.toString()}`);
  };

  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleClickButton();
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 py-4 sm:gap-9 sm:px-10 sm:py-8">
      <label className="sm:text-title-xl text-body-lg bold">{title}</label>
      <div className="shadow-search bg-background relative w-full rounded-2xl sm:rounded-3xl">
        <Image
          src={ic_search}
          alt="검색 아이콘"
          className="absolute top-[14.5px] left-5 sm:top-[25px] sm:left-8"
        />
        <input
          value={value}
          name="searchbar"
          placeholder={placeholder}
          className="h-[51px] w-full py-1.5 pr-2 pl-11 sm:h-[70px] sm:py-2.5 sm:pr-3 sm:pl-[66px]"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleEnterKeyDown}
        />
        <Button
          variant="primary"
          size="lg"
          className="bold text-background absolute right-3 bottom-1.5 h-[41px] w-[85px] text-[14px] sm:bottom-2.5 sm:h-[50px] sm:w-[120px] sm:text-[16px]"
          onClick={handleClickButton}>
          검색하기
        </Button>
      </div>
    </div>
  );
}
