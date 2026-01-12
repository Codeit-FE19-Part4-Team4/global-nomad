import { ApiError } from '@/config/client';

export function getApiErrorMessage(
  error: unknown,
  defaultMessage: string
): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
}
