import { useEffect, useRef } from 'react';

/**
 * targetRef 영역 외부를 클릭했을 때 onOutsideClick을 실행하는 커스텀 훅
 */
export default function useClickOutside(onOutsideClick: () => void) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (targetRef.current && !targetRef.current.contains(e.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]);
  return targetRef;
}
