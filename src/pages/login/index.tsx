import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="bg-gray-100 w-dvw h-dvh flex justify-center items-center">
      <div className="bg-white w-120 py-4.5 px-4.5 rounded-md flex flex-col justify-center items-start shadow-xl">
        <label htmlFor="user-id" className="mb-2">
          아이디
        </label>
        <input
          id="user-id"
          type="text"
          placeholder="영문 소문자"
          className="p-2.5 w-full border border-gray-300 rounded-md mb-4"
        />
        <label htmlFor="user-password" className="mb-2">
          비밀번호
        </label>
        <input
          id="user-password"
          type="password"
          placeholder="8-12자의 영문자, 숫자, 특수문자 조합"
          className="p-2.5 w-full border border-gray-300 rounded-md mb-4"
        />

        <div className="mb-6 w-full text-end">
          <span className="mr-2 text-gray-500">아직 회원이 아니시라면</span>
          <Link to={"/register"} className="">
            회원가입 &gt;
          </Link>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full font-bold h-12"
        >
          로그인
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
