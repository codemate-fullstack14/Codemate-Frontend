import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import apiFetch from '../../../utils/apiFetch';
import { usePopupStore } from '../../../store/popupStore';
import Cookies from 'js-cookie';

const useLogin = () => {
  const login = async (email: string, password: string) => {
    const res = await apiFetch<{ accessToken: string; refreshToken: string }>('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res;
  };

  return { login };
};

export default function LoginPage() {
  const { login } = useLogin();
  const { openPopup } = usePopupStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      openPopup({
        visible: true,
        popupType: 'alert',
        body: <p>이메일과 비밀번호를 입력해주세요.</p>,
        header: { title: '로그인 실패', isClose: true },
        footer: { onConfirm: () => {} },
      });
      return;
    }

    try {
      const res = await login(email, password);

      if (res.success) {
        Cookies.set('accessToken', res.data.accessToken, { expires: 1 });
        Cookies.set('refreshToken', res.data.refreshToken, { expires: 7 });
        navigate('/');
      } else {
        openPopup({
          visible: true,
          popupType: 'alert',
          body: (
            <p>
              통신 중 오류가 발생했습니다.
              <br /> {res.error}
            </p>
          ),
          header: { title: '로그인 실패', isClose: true },
          footer: { onConfirm: () => {} },
        });
      }
    } catch {
      openPopup({
        visible: true,
        popupType: 'alert',
        body: <p>이메일 또는 비밀번호가 잘못되었습니다.</p>,
        header: { title: '에러', isClose: true },
        footer: { onConfirm: () => {} },
      });
    }
  };

  return (
    <div className="bg-gray-50 w-dvw h-dvh flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white w-[380px] px-8 py-10 rounded-md shadow-lg flex flex-col gap-6 border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">로그인</h1>
        <p className="text-gray-500 mb-4 text-sm">이메일과 비밀번호를 입력해주세요.</p>

        <div className="flex flex-col gap-2">
          <label htmlFor="user-id" className="text-sm font-medium text-gray-700">
            이메일
          </label>
          <input
            id="user-id"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-600"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="user-password" className="text-sm font-medium text-gray-700">
            비밀번호
          </label>
          <input
            id="user-password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="8~12자의 비밀번호를 입력해주세요"
            className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-gray-600"
          />
        </div>

        <Button
          type="submit"
          text="로그인"
          option={{color: "brandtheme"}}
          className="mt-4 h-12 bg-blue-500 text-white w-full font-semibold rounded-xl hover:bg-blue-600 transition-all"
        />

        <div className="w-full text-center mt-2 text-sm text-gray-500">
          <span>아직 회원이 아니신가요? </span>
          <Link to="/user/register" className="text-blue-600 hover:underline font-medium">
            회원가입 하기
          </Link>
        </div>
      </form>
    </div>
  );
}
