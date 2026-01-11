import { API_BASE_URL } from '@/config/api';

type Params = Record<string, any>;

type ApiFetchOptions<P = Params> = Omit<RequestInit, 'body'> & {
  params?: P;
  body?: unknown;
};

/**
 * apiFetch에서 사용하는 옵션 타입
 *
 * @param params  URL query string (?key=value)으로 변환될 값
 * @param body    POST / PATCH 요청 시 전달할 payload
 * @param headers 추가로 병합할 HTTP 헤더
 * @param options fetch의 RequestInit 옵션(method, cache 등)
 */
export async function apiFetch<T, P = Params>(
  endpoint: string,
  { params, body, headers, ...options }: ApiFetchOptions<P> = {}
): Promise<T> {
  const searchParams = new URLSearchParams();

  // query string 생성
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.set(key, String(value));
      }
    });
  }

  // 최종 요청 URL
  const url = `${API_BASE_URL}${endpoint}${
    searchParams.toString() ? `?${searchParams.toString()}` : ''
  }`;

  const accessToken =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  // 공통 헤더, body JSON 설정
  const isFormData = body instanceof FormData;
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), // 토큰 추가
      ...headers,
    },
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  // 공통 에러 처리
  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);

    if (res.status === 401) {
      console.error('[apiFetch] Unauthorized', {
        url,
        accessToken,
      });
    }

    throw new ApiError(
      errorBody?.message ?? `API Error ${res.status}`,
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
