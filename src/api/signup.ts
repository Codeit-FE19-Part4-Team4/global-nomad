import { SignupRequest, SignupResponse } from '../types/auth';

import { apiFetch } from '@/config/client';

export function signup(payload: SignupRequest) {
  return apiFetch<SignupResponse>('/users', {
    method: 'POST',
    body: payload,
  });
}
