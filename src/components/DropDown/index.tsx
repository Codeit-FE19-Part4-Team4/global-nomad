'use client';

import { cva } from 'class-variance-authority';
import { createContext, useContext, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';
import { cn } from '@/util/cn';
import Item from './Item';
import List from './List';
import Title from './Title';
import Trigger from './Trigger';

/**
 * Example
 *
 * // 기본 선택형 드롭다운
 * <DropDown type>
 *   <DropDown.Trigger placeholder="선택하세요">옵션 1</DropDown.Trigger>
 *   <DropDown.List>
 *     <DropDown.Item>옵션 1</DropDown.Item>
 *     <DropDown.Item>옵션 2</DropDown.Item>
 *   </DropDown.List>
 * </DropDown>
 *
 * // DropDown 컴포넌트에서 사용할 수 있는 타입
 * // - 'select' : 기본 선택형 드롭다운 (기본값)
 * // - 'filter' : 정렬/필터용 드롭다운
 * // - 'menu'   : 액션 메뉴 (수정, 삭제 등)
 */

const DropdownVariants = cva('relative', {
  variants: {
    type: {
      menu: 'w-7',
      filter: 'w-[148px]',
      select: 'w-full',
    },
  },
  defaultVariants: {
    type: 'select',
  },
});

export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
export type DropDownType = 'menu' | 'select' | 'filter';

interface DropDownContextValue {
  open: boolean;
  item: string;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  type: DropDownType;
}
interface DropDownProps {
  children: React.ReactNode;
  type?: DropDownType;
  className?: string;
}

const DropDownContext = createContext<DropDownContextValue | null>(null);

function DropDown({ children, type = 'select', className }: DropDownProps) {
  const [open, toggle] = useState(false);
  const [item, setItem] = useState('');
  const dropDownRef = useClickOutside(() => {
    toggle(false);
  });

  return (
    <DropDownContext.Provider value={{ open, toggle, setItem, item, type }}>
      <>
        <div
          ref={dropDownRef}
          className={cn(DropdownVariants({ type }), className)}>
          {children}
        </div>
      </>
    </DropDownContext.Provider>
  );
}

export function useDropDownContext() {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error('반드시 DropDownProvider안에서 사용해야합니다.');
  }
  return context;
}
DropDown.Title = Title;
DropDown.Trigger = Trigger;
DropDown.List = List;
DropDown.Item = Item;

export default DropDown;
