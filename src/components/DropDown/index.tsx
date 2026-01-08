'use client';

import { cva } from 'class-variance-authority';
import { createContext, useContext, useState } from 'react';

import Item from './Item';
import List from './List';
import Title from './Title';
import Trigger from './Trigger';

import useClickOutside from '@/hooks/useClickOutside';
import { cn } from '@/util/cn';

const dropdownVariants = cva('relative', {
  variants: {
    type: {
      menu: 'w-7',
      filter: 'min-w-[72px] md:w-[148px]',
      select: 'w-full',
    },
  },
  defaultVariants: {
    type: 'select',
  },
});

export type TextAs = 'h2' | 'h3' | 'h4' | 'p' | 'span';
export type DropDownType = 'menu' | 'select' | 'filter';

interface DropDownContextValue {
  isOpen: boolean;
  currentItem: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentItem: (value: string) => void;
  type: DropDownType;
}
interface DropDownProps {
  children: React.ReactNode;
  type?: DropDownType;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const DropDownContext = createContext<DropDownContextValue | null>(null);

/**
 * @example
 * // 1. 제어 컴포넌트
 * ```tsx
 * const [selected, setSelected] = useState('');
 * <DropDown
 *   value={selected}
 *   onValueChange={(val) => setSelected(val)}
 * >
 *   <DropDownTrigger placeholder="시간 선택" />
 *   <DropDownList>
 *     <DropDownItem>09:00</DropDownItem>
 *     <DropDownItem>10:00</DropDownItem>
 *   </DropDownList>
 * </DropDown>
 * ```
 *
 * @example
 * // 2. Item별 개별 액션 (onSelect 사용)
 * ```tsx
 * <DropDown type="menu">
 *   <DropDownTrigger />
 *   <DropDownList>
 *     <DropDownItem onSelect={() => router.push(`/edit/${id}`)}>
 *       수정
 *     </DropDownItem>
 *     <DropDownItem onSelect={handleDelete}>
 *       삭제
 *     </DropDownItem>
 *   </DropDownList>
 * </DropDown>
 * ```
 *
 * DropDown 컴포넌트에서 사용할 수 있는 타입
 * - 'select' : 기본 선택형 드롭다운 (기본값)
 * - 'filter' : 정렬/필터용 드롭다운
 * - 'menu'   : 액션 메뉴 (수정, 삭제 등)
 */
function DropDown({
  children,
  type = 'select',
  className,
  value,
  onValueChange,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(''); //내부 state
  const dropDownRef = useClickOutside(() => {
    setIsOpen(false);
  });

  const currentItem = value !== undefined ? value : internalValue;
  const setCurrentItem = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <DropDownContext.Provider
      value={{ isOpen, setIsOpen, setCurrentItem, currentItem, type }}>
      <div
        ref={dropDownRef}
        className={cn(dropdownVariants({ type }), className)}>
        {children}
      </div>
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

// Named Export
export { DropDown };
export { Trigger as DropDownTrigger };
export { List as DropDownList };
export { Item as DropDownItem };
export { Title as DropDownTitle };
