import Image from 'next/image';

import { Toast, ToastType } from './toast-types';

import errorIcon from '@/assets/icons/common/ic-error.svg';
import successIcon from '@/assets/icons/common/ic-success.svg';
import { cn } from '@/util/cn';

const toastIcons: Partial<Record<ToastType, string>> = {
  success: successIcon,
  error: errorIcon,
  warning: errorIcon,
};

interface ToastContainerProps {
  toasts: Toast[];
}

export default function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2">
      <div className="flex flex-col gap-2">
        {toasts.map((toast) => {
          const icon = toastIcons[toast.type];

          return (
            <div
              key={toast.id}
              className={cn(
                'flex items-center gap-2 rounded-md px-5 py-5 text-white',
                'animate-in fade-in slide-in-from-bottom-2 duration-300',
                'bg-black/70'
              )}>
              {/* 아이콘이 있을 때 */}
              {icon && (
                <div className="relative h-6 w-6 flex-shrink-0">
                  <Image
                    src={icon}
                    alt={`${toast.type} 아이콘`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              <span className="text-body-lg flex-1">{toast.message}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
