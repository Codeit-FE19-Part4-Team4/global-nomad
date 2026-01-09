'use client';
import Image from 'next/image';

import PageButton from './PageButton';

import ic_page_off from '@/assets/icons/activities/ic-page-left-off.svg';
import ic_page from '@/assets/icons/activities/ic-page-left.svg';
import { cn } from '@/util/cn';

interface NavigationBtnProps {
  disabled: boolean;
  direction: 'prev' | 'next';
  onClick: () => void;
}

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  handleClickPage?: (page: number) => void;
  pagesPerGroup: number;
}

function NavigationBtn({ disabled, direction, onClick }: NavigationBtnProps) {
  return (
    <button
      className={cn('h-10 w-10', !disabled && 'cursor-pointer')}
      onClick={onClick}
      disabled={disabled}>
      <Image
        src={disabled ? ic_page_off : ic_page}
        alt={`${direction === 'prev' ? '이전' : '다음'} 페이지로 이동`}
        className={cn(direction === 'next' ? 'rotate-180' : '')}
      />
    </button>
  );
}

export default function Pagination({
  totalPage,
  currentPage,
  handleClickPage,
  pagesPerGroup,
}: PaginationProps) {
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  if (totalPage === 0) return null;

  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(currentGroup * pagesPerGroup, totalPage);
  const curtPageGrpArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handleClickNavBtn = (direction: 'prev' | 'next') => {
    const pageToNavigate =
      direction === 'prev' ? currentPage - 1 : currentPage + 1;
    if (pageToNavigate < 1 || pageToNavigate > totalPage) {
      return;
    }
    handleClickPage?.(pageToNavigate);
  };

  const onClickPage = (page: number) => {
    handleClickPage?.(page);
  };

  return (
    <div className="flex gap-1">
      <NavigationBtn
        disabled={currentPage === 1}
        direction="prev"
        onClick={() => handleClickNavBtn('prev')}
      />
      {curtPageGrpArray.map((page) => (
        <PageButton
          key={page}
          page={page}
          isClicked={currentPage === page}
          onClick={() => onClickPage(page)}
        />
      ))}
      <NavigationBtn
        disabled={currentPage === totalPage}
        direction="next"
        onClick={() => handleClickNavBtn('next')}
      />
    </div>
  );
}
