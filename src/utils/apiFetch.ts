import Cookies from "js-cookie";

export interface ApiResponse<T> {
  data: T;
  error: string | null;
  success: boolean;
}

async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = Cookies.get("accessToken");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // 토큰이 있으면 추가
    ...options.headers, // 사용자 커스텀 헤더 우선 적용
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const json = await res.json();

  return json as ApiResponse<T>;
}

export default apiFetch;
