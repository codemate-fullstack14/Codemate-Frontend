import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import LayoutContainer from "./components/layouts/layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";
// import ProtectedRoute from "./utils/ProtectedRoute";

const MainPage = lazy(() => import("./pages/main"));
const LoginPage = lazy(() => import("./pages/auth/login"));
const UserRegister = lazy(() => import("./pages/auth/register"));
const ChallengePage = lazy(() => import("./pages/challenge"));
const RankPage = lazy(() => import("./pages/rank"));

function App() {
  return (
    <>
      <Routes>
        {/* 로그인 페이지는 보호하지 않음 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/register" element={<UserRegister />} />

        {/* jwt 보호 라우트 */}
        {/* <Route element={<ProtectedRoute />}>
        </Route> */}

        {/* 보호 라우트 내부에서 Layout 사용 */}
        <Route element={<LayoutContainer />}>
          <Route
            index
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <MainPage />
              </Suspense>
            }
          />
          <Route
            path="/rank"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <RankPage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/challenge"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <ChallengePage />
            </Suspense>
          }
        />

        {/* 잘못된 경로 */}
        <Route element={<LayoutContainer />}>
          <Route
            path="*"
            element={
              <div className="flex flex-col justify-center items-center min-h-[calc(100vh-60px)] px-4 text-center">
                <strong className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2">
                  404 Error
                </strong>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3">
                  페이지를 찾을 수 없습니다.
                </h1>
                <p className="tossface text-sm sm:text-base md:text-lg text-gray-600 max-w-md">
                  요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요. 🙏
                </p>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
