import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiFetch from '../../../utils/apiFetch';
import { usePopupStore } from '../../../store/popupStore';

interface ResAuthApi {
  email: string;
  id: number;
  nickname: string;
  role: 'USER';
}

const useRegisterMember = (email: string, password: string, nickname: string) => {
  const [loading, setLoading] = useState(false);
  const { openPopup } = usePopupStore();
  const navigate = useNavigate();

  const registerMember = async () => {
    setLoading(true);
    try {
      const res = await apiFetch<ResAuthApi>('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, nickname }),
      });

      if (res.success) {
        openPopup({
          visible: true,
          popupType: 'alert',
          header: { title: '회원가입 성공' },
          body: (
            <p className="text-center">
              회원가입을 성공했습니다. <br /> 로그인 화면으로 이동합니다.
            </p>
          ),
          footer: {
            onConfirm() {
              navigate('/login');
            },
          },
        });
      } else {
        openPopup({
          visible: true,
          popupType: 'alert',
          header: { title: '회원가입 실패' },
          body: (
            <p className="text-center">
              회원가입을 다시 진행해주세요. <br /> {res.error}
            </p>
          ),
          footer: { onConfirm() {} },
        });
      }
    } catch (error) {
      openPopup({
        visible: true,
        popupType: 'alert',
        header: { title: '회원가입 실패' },
        body: (
          <p className="text-center">
            이미 가입한 회원 정보입니다. <br />
            회원가입을 다시 진행 해주세요.
          </p>
        ),
        footer: { onConfirm() {} },
      });
      console.error('회원가입 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  return { registerMember, loading };
};

export default function UserRegister() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const { openPopup } = usePopupStore();

  const { registerMember, loading } = useRegisterMember(email, password, nickname);

  const handleRegister = () => {
    if (!nickname || !email || !password) {
      openPopup({
        visible: true,
        popupType: 'alert',
        body: <p>내용을 모두 작성 해주세요.</p>,
        header: { title: '오류', isClose: false },
        footer: { onConfirm: () => {} },
      });
      return;
    }

    if (password !== passwordCheck) {
      openPopup({
        visible: true,
        popupType: 'alert',
        body: <p>비밀번호가 일치하지 않아요. 다시 확인해주세요.</p>,
        header: { title: '오류', isClose: false },
        footer: { onConfirm: () => {} },
      });
      return;
    }

    registerMember();
  };

  return (
    <div className="bg-gray-50 w-dvw h-dvh flex justify-center items-center">
      <div className="bg-white w-[420px] p-10 rounded-md shadow-md border border-gray-100 flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">회원가입</h1>
        <p className="text-gray-500 text-sm mb-4">간단한 정보를 입력하고 시작해보세요.</p>

        <div className="flex flex-col gap-2">
          <label htmlFor="user-nickname" className="text-sm font-medium text-gray-700">
            닉네임
          </label>
          <input
            id="user-nickname"
            type="text"
            placeholder="한글 또는 영문 소문자"
            className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-700"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="user-email" className="text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            id="user-email"
            type="email"
            placeholder="example@email.com"
            className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-700"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="user-password" className="text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            id="user-password"
            type="password"
            placeholder="8~12자의 영문자, 숫자, 특수문자"
            className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-700"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="user-password-check" className="text-sm font-medium text-gray-700">
            비밀번호 확인
          </label>
          <input
            id="user-password-check"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-gray-700"
            value={passwordCheck}
            onChange={e => setPasswordCheck(e.target.value)}
          />
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full h-12 font-semibold rounded-xl transition-all ${
            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {loading ? '회원가입 중...' : '회원가입'}
        </button>

        <div className="w-full text-center mt-4 text-sm text-gray-500">
          <span>이미 계정이 있으신가요? </span>
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            로그인 하기
          </Link>
        </div>
      </div>
    </div>
  );
}
