import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import apiFetch from "../../../utils/apiFetch";
import { usePopupStore } from "../../../store/popupStore";
import Cookies from "js-cookie";

const useLogin = () => {
  const login = async (email: string, password: string) => {
    const res = await apiFetch<{ accessToken: string; refreshToken: string }>(
      "http://localhost:8080/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    return res;
  };

  return { login };
};

function LoginPage() {
  const { login } = useLogin();
  const { openPopup } = usePopupStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      openPopup({
        visible: true,
        popupType: "alert",
        body: <p>이메일과 비밀번호를 입력해주세요.</p>,
        header: { title: "로그인 실패", isClose: true },
        footer: { onConfirm: () => {} },
      });
      return;
    }

    try {
      const res = await login(email, password);

      if (res.success) {
        Cookies.set("accessToken", res.data.accessToken, { expires: 1 });
        Cookies.set("refreshToken", res.data.refreshToken, { expires: 7 });
        navigate("/");
      } else {
        openPopup({
          visible: true,
          popupType: "alert",
          body: (
            <p>
              통신중 오류가 발생했습니다.
              <br /> {res.error}
            </p>
          ),
          header: { title: "로그인 실패", isClose: true },
          footer: { onConfirm: () => {} },
        });
      }
    } catch (error) {
      openPopup({
        visible: true,
        popupType: "alert",
        body: <p>이메일 또는 비밀번호가 잘못되었습니다.</p>,
        header: { title: "에러", isClose: true },
        footer: { onConfirm: () => {} },
      });
    }
  };

  return (
    <div className="bg-gray-100 w-dvw h-dvh flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="bg-white w-120 py-5 px-5 rounded-md flex flex-col justify-center items-start shadow-xl"
      >
        <label htmlFor="user-id" className="mb-2 font-semibold text-gray-700">
          이메일
        </label>
        <input
          id="user-id"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소를 입력하세요"
          className="p-2.5 w-full border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-400"
        />

        <label
          htmlFor="user-password"
          className="mb-2 font-semibold text-gray-700"
        >
          비밀번호
        </label>
        <input
          id="user-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="8-12자의 영문자, 숫자, 특수문자 조합"
          className="p-2.5 w-full border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-400"
        />

        <Button
          type="submit"
          text="로그인"
          className="mb-6 h-12 bg-blue-500 text-white w-full font-bold rounded-md hover:bg-blue-600 transition-colors"
        />

        <div className="w-full text-end">
          <span className="mr-2 text-gray-500">아직 회원이 아니시라면</span>
          <Link
            to="/user/register"
            className="text-blue-600 hover:underline font-medium"
          >
            회원가입 &gt;
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
