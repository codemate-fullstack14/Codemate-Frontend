import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute() {
  const token = Cookies.get("accessToken"); // 쿠키 이름에 맞게 변경

  if (!token) {
    // 로그인 안 되어 있으면 /login으로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  // 로그인 되어 있으면 하위 라우트 렌더링
  return <Outlet />;
}
