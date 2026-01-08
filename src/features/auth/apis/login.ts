import { LoginRequest, LoginResponse } from '../types';

import { apiFetch } from '@/config/client';

export function login(payload: LoginRequest) {
  return apiFetch<LoginResponse>('/auth/login', {
    method: 'POST',
    body: payload,
  });
}
