import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/login";
import LayoutContainer from "./components/layouts/layout";
import MainPage from "./pages/main";
// import ProtectedRoute from "./utils/ProtectedRoute";
import UserRegister from "./pages/auth/register";

function App() {
  return (
    <>
      <Routes>
        {/* 로그인 페이지는 보호하지 않음 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/register" element={<UserRegister />} />

        {/* 보호 라우트 */}
        {/* <Route element={<ProtectedRoute />}> */}
        {/* 보호 라우트 내부에서 Layout 사용 */}
        <Route element={<LayoutContainer />}>
          <Route path="/main" element={<MainPage />} />
          {/* 다른 보호된 페이지도 여기에 추가 */}
          <Route path="/sandbox" element={<MainPage />} />
        </Route>
        {/* </Route> */}

        {/* 잘못된 경로 */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
