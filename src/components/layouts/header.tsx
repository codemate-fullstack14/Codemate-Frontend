import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navigate = [
  { id: 1, title: "문제선택", location: "/" },
  { id: 2, title: "순위보기", location: "/rank" },
  { id: 3, title: "내기록", location: "/mypage" },
];

export function Glb() {
  const location = useLocation(); // 현재 URL

  return (
    <nav className="h-full">
      <ul className="flex h-full">
        {navigate.map((nav) => {
          const isActive = location.pathname === nav.location;
          return (
            <li key={nav.id}>
              <Link
                to={nav.location}
                className={`block px-4 h-full leading-[60px] transition 
                      ${
                        isActive
                          ? "text-blue-600 font-bold border-b-2 border-blue-600"
                          : "text-gray-700 hover:text-blue-500"
                      }`}
              >
                {nav.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Header() {
  //TODO: api 조회 후 상태관리 전역으로 옮길것.
  const [name, _] = useState<string | null>("홍길동");

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-10">
      <div className="flex justify-between items-center max-w-5xl w-full mx-auto h-[60px]">
        <Link to={"/"}>
          <img src="favicon.png" alt="brandlogo" className="block w-14" />
        </Link>

        <Glb />

        <div>
          <span>
            <strong>{name}</strong>님
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
