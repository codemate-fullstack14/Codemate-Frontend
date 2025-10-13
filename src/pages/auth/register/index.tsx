import { Link } from "react-router-dom";

function UserRegister() {
  return (
    <div className="bg-gray-100 w-dvw h-dvh flex justify-center items-center">
      <div className="bg-white w-120 py-4.5 px-4.5 rounded-md flex flex-col justify-center items-start shadow-xl">
        <label htmlFor="user-id" className="mb-2">
          아이디
        </label>
        <div className="flex w-full mb-4">
          <input
            id="user-id"
            type="text"
            placeholder="영문 소문자"
            className="flex-1 p-2.5 w-full border border-gray-300 rounded-md mr-4 "
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold h-12"
          >
            중복검사
          </button>
        </div>

        <label htmlFor="user-password" className="mb-2">
          비밀번호
        </label>
        <input
          id="user-password"
          type="password"
          placeholder="8-12자의 영문자, 숫자, 특수문자 조합"
          className="p-2.5 w-full border border-gray-300 rounded-md mb-4"
        />

        <label htmlFor="user-password-check" className="mb-2">
          비밀번호 확인
        </label>
        <input
          id="user-password-check"
          type="password"
          placeholder="8-12자의 영문자, 숫자, 특수문자 조합"
          className="p-2.5 w-full border border-gray-300 rounded-md mb-4"
        />

        <button
          type="submit"
          className="w-full h-12 bg-blue-500 text-white font-bold rounded-md mb-4"
        >
          회원가입
        </button>

        <div className="mb-6 w-full h-12  text-center font-bold leading-[3rem] ">
          <Link to={"/login"} className="inline-block w-full">
            뒤로가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
