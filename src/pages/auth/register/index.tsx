import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiFetch from "../../../utils/apiFetch";
import { usePopupStore } from "../../../store/popupStore";

interface ResAuthApi {
  email: string;
  id: number;
  nickname: string;
  role: "USER";
}

const useRegisterMember = (
  email: string,
  password: string,
  nickname: string
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { openPopup } = usePopupStore();
  const navigate = useNavigate();

  const registerMember = async () => {
    setLoading(true);
    try {
      const res = await apiFetch<ResAuthApi>(
        "http://localhost:8080/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            nickname,
          }),
        }
      );

      if (res.success) {
        openPopup({
          visible: true,
          popupType: "alert",
          header: { title: "회원가입 성공" },
          body: (
            <p className="text-center">
              회원가입을 성공했습니다. <br /> 로그인 화면으로 이동합니다.
            </p>
          ),
          footer: {
            onConfirm() {
              navigate("/login");
            },
          },
        });
      } else {
        openPopup({
          visible: true,
          popupType: "alert",
          header: { title: "회원가입 실패" },
          body: (
            <p className="text-center">
              회원가입을 다시 진행해주세요. <br /> {res.error}
            </p>
          ),
          footer: {
            onConfirm() {},
          },
        });
      }
    } catch (error) {
      openPopup({
        visible: true,
        popupType: "alert",
        header: { title: "회원가입 실패" },
        body: (
          <p className="text-center">
            이미 가입한 회원 정보입니다. <br />
            회원가입을 다시 진행 해주세요.
          </p>
        ),
        footer: {
          onConfirm() {},
        },
      });
      console.error("회원가입 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return { registerMember, loading };
};

function UserRegister() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const { openPopup } = usePopupStore();

  const { registerMember, loading } = useRegisterMember(
    email,
    password,
    nickname
  );

  const handleRegister = () => {
    if (
      nickname.trim().length <= 0 ||
      email.trim().length <= 0 ||
      password.trim().length <= 0
    ) {
      openPopup({
        visible: true,
        popupType: "alert",
        body: <p>내용을 모두 작성 해주세요.</p>,
        header: { title: "오류", isClose: false },
        footer: { onConfirm: () => {} },
      });
      return;
    }

    if (password !== passwordCheck) {
      openPopup({
        visible: true,
        popupType: "alert",
        body: <p>비밀번호가 일치하지 않아요. 다시한번 확인 부탁드려요.</p>,
        header: { title: "오류", isClose: false },
        footer: { onConfirm: () => {} },
      });
      return;
    }

    registerMember();
  };

  return (
    <div className="bg-gray-100 w-dvw h-dvh flex justify-center items-center">
      <div className="bg-white w-120 py-4.5 px-4.5 rounded-md flex flex-col justify-center items-start shadow-xl">
        <label htmlFor="user-nickname" className="mb-2">
          별명
        </label>
        <input
          id="user-nickname"
          type="text"
          placeholder="한글 또는 영문 소문자"
          className="flex-1 p-2.5 w-full border border-gray-300 rounded-md mb-4"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <label htmlFor="user-email" className="mb-2">
          메일주소
        </label>
        <input
          id="user-email"
          type="email"
          placeholder="test@test.com"
          className="flex-1 p-2.5 w-full border border-gray-300 rounded-md mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="user-password" className="mb-2">
          비밀번호
        </label>
        <input
          id="user-password"
          type="password"
          placeholder="8-12자의 영문자, 숫자, 특수문자 조합"
          className="p-2.5 w-full border border-gray-300 rounded-md mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="user-password-check" className="mb-2">
          비밀번호 확인
        </label>
        <input
          id="user-password-check"
          type="password"
          placeholder="8-12자의 영문자, 숫자, 특수문자 조합"
          className="p-2.5 w-full border border-gray-300 rounded-md mb-4"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <button
          type="submit"
          className="w-full h-12 bg-blue-500 text-white font-bold rounded-md mb-4"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "회원가입 중..." : "회원가입"}
        </button>

        <div className="mb-6 w-full h-12 text-center font-bold leading-[3rem]">
          <Link to={"/login"} className="inline-block w-full">
            뒤로가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
