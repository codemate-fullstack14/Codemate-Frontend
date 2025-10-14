import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [name, _] = useState<string | null>("홍길동");

  const navigate = [
    { id: 1, title: "문제선택", loction: "/main" },
    { id: 2, title: "순위보기", loction: "/rank" },
    { id: 3, title: "내기록", loction: "/history" },
  ];

  return (
    <header className="sticky top-0 bg-white border-b-1 border-gray-200 z-10">
      <div className="flex justify-between items-center max-w-5xl w-full mx-auto h-[60px]">
        <div>
          <img src="/favicon.png" alt="brandlogo" className="block w-14" />
        </div>

        <nav className="h-full">
          <ul className="flex h-full">
            {navigate.map((nav) => (
              <li key={nav.id}>
                <Link
                  to={nav.loction}
                  className="block px-4 h-full leading-[60px]"
                >
                  {nav.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <span>
          <strong>{name}</strong>님
        </span>
      </div>
    </header>
  );
}

export default Header;
