import { SignupRequest, SignupResponse } from '../features/auth/types';

import { apiFetch } from '@/config/client';

export function signup(payload: SignupRequest) {
  return apiFetch<SignupResponse>('/users', {
    method: 'POST',
    body: payload,
  });
}
