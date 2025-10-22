import Cookies from "js-cookie";

export interface ApiResponse<T> {
  status: string;
  data: T;
  items?: T;
  error: string | null;
  success: boolean;
  id?: number;
  title?: string;
  description?: string;
  examplesJson?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

const PUBLIC_PATHS = ["/auth/login", "/auth/register"];

async function apiFetch<T>(
  path: string,
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

  if (res.status === 401 || res.status === 403) {
    if (!PUBLIC_PATHS.some((pub) => path.startsWith(pub))) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      sessionStorage.removeItem("auth-storage");

      window.location.href = "/Codemate-Frontend/login";
    }
  }

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const json = await res.json();

  if (
    (json.error &&
      typeof json.error === "string" &&
      json.error.includes("expired")) ||
    json.message?.includes("expired")
  ) {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    sessionStorage.removeItem("auth-storage");
    window.location.href = "/Codemate-Frontend/login";
  }

  return json as ApiResponse<T>;
}

export default apiFetch;
