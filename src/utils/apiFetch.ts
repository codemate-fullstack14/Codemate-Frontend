import Cookies from "js-cookie";

export interface ApiResponse<T> {
  data: T;
  items?: T;
  error: string | null;
  success: boolean;
  id?: number;
  title?: string;
  description?: string;
  examplesJson?: string;
}

// 환경별 API URL
const BASE_URL = import.meta.env.DEV ? import.meta.env.VITE_API_URL : ""; 

async function apiFetch<T>(
  path: string, // full url 대신 path만 받도록 변경
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = Cookies.get("accessToken");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, {
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
