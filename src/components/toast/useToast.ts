import { useMemo } from 'react';

import { useToastContext } from '@/components/toast/ToastProvider';

export function useToast() {
  const { showToast } = useToastContext();

  return useMemo(
    () => ({
      show: showToast,
      success: (message: string, duration?: number) =>
        showToast(message, 'success', duration),
      error: (message: string, duration?: number) =>
        showToast(message, 'error', duration),
      warning: (message: string, duration?: number) =>
        showToast(message, 'warning', duration),
      info: (message: string, duration?: number) =>
        showToast(message, 'info', duration),
    }),
    [showToast]
  );
}
