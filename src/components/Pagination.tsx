'use client';
import Image from 'next/image';
import { useState, useRef } from 'react';

import PageButton from './toast/PageButton';

import ic_page_off from '@/assets/icons/activities/ic-page-left-off.svg';
import ic_page from '@/assets/icons/activities/ic-page-left.svg';
import { cn } from '@/util/cn';

interface NavigationBtnProps {
  disabled: boolean;
  direction: 'prev' | 'next';
  onClick: () => void;
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
  handleClickPage,
}: {
  totalPage: number;
  handleClickPage?: (page: number) => Promise<void>;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const currentGroup = Math.ceil(currentPage / 5);

  if (totalPage === 0) return null;

  const pagesArray = Array.from({ length: totalPage }, (_, i) => i + 1);
  const curtPageGrpArray = pagesArray.filter(
    (el) => (currentGroup - 1) * 5 < el && el <= currentGroup * 5
  );

  const handleClickNavBtn = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentPage === 1) {
        return;
      }
      const prevPage = currentPage - 1;

      setCurrentPage(prevPage);
      handleClickPage?.(prevPage);
    } else {
      if (currentPage === totalPage) {
        return;
      }
      const nextPage = currentPage + 1;

      setCurrentPage(nextPage);
      handleClickPage?.(nextPage);
    }
  };

  const onClickPage = (page: number) => {
    setCurrentPage(page);
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
