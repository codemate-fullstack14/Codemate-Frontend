import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { usePopupStore } from '../../store/popupStore';
import { useNavigate } from 'react-router-dom';

type TabType = 'myInfo' | 'myHistory';

function MyHistory() {
  // const initHistory = async () => {
  //   const res = apiFetch("/reviews", {
  //     method: "POST",
  //     body: JSON.stringify({ submissionId: 17 }),
  //   });
  //   console.log(res);
  // };

  // useEffect(() => {
  //   initHistory();
  // }, []);

  return (
    <>
      현제 서비스 준비 중입니다.
      <br /> 빠른시일에 오픈을 약속하겠습니다.
    </>
  );
}

function MemberPage() {
  const { logout, user } = useAuthStore();
  const { openPopup } = usePopupStore();
  const [active, setActive] = useState<TabType>('myInfo');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    openPopup({
      visible: true,
      popupType: 'alert',
      body: <p>로그아웃되었습니다.</p>,
      header: { title: '로그아웃' },
      footer: {
        onConfirm() {
          navigate('/login');
        },
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* --- 사이드바 --- */}
      <aside className="w-full md:w-60 bg-gray-100 py-4  md:border-b-0">
        <nav className="border-b border-b-gray-300 pb-5">
          <ul className="flex md:flex-col justify-around md:justify-start">
            <li>
              <button
                onClick={() => setActive('myInfo')}
                className={`border w-full text-left px-4 py-2 transition-colors duration-200 ${
                  active === 'myInfo' ? 'bg-gray-600 text-white' : 'hover:bg-gray-300'
                }`}
              >
                내정보
              </button>
            </li>
            <li>
              <button
                onClick={() => setActive('myHistory')}
                className={`w-full text-left px-4 py-2 transition-colors duration-200 ${
                  active === 'myHistory' ? 'bg-gray-600 text-white' : 'hover:bg-gray-300'
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
        {active === 'myInfo' && (
          <section className="flex flex-col items-center justify-center bg-white  p-8 ">
            {/* 프로필 이미지 (이니셜) */}

            <span className="tossface text-6xl">{['💙', '🐱', '🍀', '👻', '🎃'][Math.floor(Math.random() * 5)]}</span>
            {/* 사용자 정보 */}
            <h2 className="text-2xl font-semibold mt-4 mb-1 text-gray-800">{user?.nickname ?? '사용자'}</h2>
            <p className="text-gray-500 mb-6">{user?.email ?? '이메일 정보 없음'}</p>

            <div className="w-full border-t border-gray-200 my-4"></div>

            {/* 정보 상세 */}
            <div className="w-full space-y-3 text-gray-700">
              <div className="flex justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
                <span className="font-medium text-gray-600">닉네임</span>
                <span>{user?.nickname ?? '-'}</span>
              </div>
              <div className="flex justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
                <span className="font-medium text-gray-600">이메일</span>
                <span>{user?.email ?? '-'}</span>
              </div>
            </div>
          </section>
        )}

        {active === 'myHistory' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">내기록</h2>
            <MyHistory />
          </div>
        )}
      </main>
    </div>
  );
}

export default MemberPage;
