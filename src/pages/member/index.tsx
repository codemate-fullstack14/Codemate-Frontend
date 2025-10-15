import { useState } from "react";

type TabType = "myInfo" | "myHistory";

function MemberPage() {
  const [active, setActive] = useState<TabType>("myInfo");

  // 로그아웃 예시 기능 (쿠키 제거 or 로컬스토리지 clear 등)
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 되었습니다!");
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* --- 사이드바 --- */}
      <aside className="w-full md:w-60 bg-gray-100 py-4  md:border-b-0">
        <nav className="border-b border-b-gray-300 pb-5">
          <ul className="flex md:flex-col justify-around md:justify-start">
            <li>
              <button
                onClick={() => setActive("myInfo")}
                className={`border w-full text-left px-4 py-2 transition-colors duration-200 ${
                  active === "myInfo"
                    ? "bg-gray-600 text-white"
                    : "hover:bg-gray-300"
                }`}
              >
                내정보
              </button>
            </li>
            <li>
              <button
                onClick={() => setActive("myHistory")}
                className={`w-full text-left px-4 py-2 transition-colors duration-200 ${
                  active === "myHistory"
                    ? "bg-gray-600 text-white"
                    : "hover:bg-gray-300"
                }`}
              >
                내가 푼 문제
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-4 flex justify-center md:block">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 bg-transparent text-gray-600 hover:text-red-500 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </aside>

      {/* --- 메인 콘텐츠 --- */}
      <main className="flex-1 p-6">
        {active === "myInfo" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">내정보</h2>
            <p>여기에 회원 정보를 표시합니다.</p>
          </div>
        )}

        {active === "myHistory" && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">내기록</h2>
            <p>여기에 활동 기록을 표시합니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default MemberPage;
