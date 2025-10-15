import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

function IntroBanner() {
  const navigate = useNavigate();

  const goToCchallenge = () => {
    navigate("/tutorial", { state: { id: 0 } });
  };

  return (
    <section className="flex flex-col sm:flex-row justify-between my-6 bg-yellow-300 items-center px-4 py-4 lg:rounded-lg">
      <h2 className=" text-center sm:text-left mb-2 sm:mb-0">
        환영합니다. <span className="font-bold">첫방문</span>이라면, 안내사항이
        있는 <span className="font-bold">연습문제</span>를 먼저 확인하세요.
      </h2>
      <Button
        text={"연습문제 바로가기"}
        option={{ isIcon: true }}
        change={goToCchallenge}
      ></Button>
    </section>
  );
}

function ProblemList() {
  return (
    <section className="block px-4 lg:px-0">
      <h2 className="text-2xl font-bold mb-4">경쟁 할 문제 고르기</h2>

      <ol
        className="
            grid gap-6 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3
          "
      >
        {[
          { id: "01", title: "순서 바꾸기" },
          { id: "02", title: "트리 구조 만들기" },
          { id: "03", title: "카드게임" },
        ].map(({ id, title }) => (
          <li
            key={id}
            className="
                flex flex-col justify-between
                bg-white rounded-md border border-gray-200
                p-6 
              "
          >
            <div>
              <div className="text-gray-400 font-mono mb-2">{id}</div>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
            </div>
            <Button
              text={"도전하기"}
              option={{ color: "brandtheme", isIcon: true }}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}

function MainPage() {
  return (
    <div>
      {/* 안내 섹션 */}
      <IntroBanner />

      {/* 문제 선택 섹션 */}
      <ProblemList />
    </div>
  );
}

export default MainPage;
