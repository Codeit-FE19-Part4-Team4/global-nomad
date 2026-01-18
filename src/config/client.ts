import { refreshTokens } from '@/api/auth';
import { API_BASE_URL } from '@/config/api';

type Params = Record<string, any>;

/**
 * apiFetch에서 사용하는 옵션 타입
 *
 * @param params  URL query string (?key=value)으로 변환될 값
 * @param body    POST / PATCH 요청 시 전달할 payload
 * @param headers 추가로 병합할 HTTP 헤더
 * @param skipAuthRefresh 토큰 리프레시 로직 스킵 여부 (기본값: false)
 * @param options fetch의 RequestInit 옵션(method, cache 등)
 */
type ApiFetchOptions<P = Params> = Omit<RequestInit, 'body'> & {
  params?: P;
  body?: unknown;
  skipAuthRefresh?: boolean;
};

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

/**
 * 토큰 리프레시 함수
 */
async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return false;
  }

  try {
    const data = await refreshTokens(refreshToken);

    // 새 토큰 저장
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return true;
  } catch (error) {
    // 리프레시 실패 시 로그아웃 처리
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // 로그인 페이지로 리다이렉트
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }

    return false;
  }
}

/**
 * apiFetch 함수 (토큰 리프레시 로직 포함)
 */
export async function apiFetch<T, P = Params>(
  endpoint: string,
  {
    params,
    body,
    headers,
    skipAuthRefresh = false,
    ...options
  }: ApiFetchOptions<P> = {}
): Promise<T> {
  const searchParams = new URLSearchParams();

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, String(value));
      }
    });
  }

  const url = `${API_BASE_URL}${endpoint}${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  const makeRequest = async (): Promise<Response> => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    const isFormData = body instanceof FormData;

    return fetch(url, {
      ...options,
      headers: {
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    });
  };

  let res = await makeRequest();

  // 401 에러 && 리프레시 스킵하지 않는 경우 → 토큰 리프레시 시도
  if (res.status === 401 && !skipAuthRefresh) {
    // 이미 리프레시 중인 경우 대기
    if (isRefreshing && refreshPromise) {
      await refreshPromise;
      // 리프레시 완료 후 재요청
      res = await makeRequest();
    } else {
      // 새로운 리프레시 시작
      isRefreshing = true;
      refreshPromise = refreshAccessToken().then((success) => {
        isRefreshing = false;
        refreshPromise = null;
        return success;
      });

      const refreshSuccess = await refreshPromise;

      if (refreshSuccess) {
        // 리프레시 성공 → 원래 요청 재시도
        res = await makeRequest();
      } else {
        // 리프레시 실패 → 에러 던지기
        throw new ApiError(
          '인증이 만료되었습니다. 다시 로그인해주세요.',
          401,
          null
        );
      }
    }
  }

  // 공통 에러 처리
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);

    if (res.status === 401) {
      const accessToken =
        typeof window !== 'undefined'
          ? localStorage.getItem('accessToken')
          : null;
      console.error('[apiFetch] Unauthorized', {
        url,
        accessToken,
      });
    }

    throw new ApiError(
      errorBody?.message ?? `${res.status}`,
      res.status,
      errorBody
    );
  }

  // 204 No Content
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly body: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
