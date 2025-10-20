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

      <section className="py-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-gray-800">
          더 이상 혼자 공부하지 말고, <br className="sm:hidden" />
          알고리즘을 함께 재밌게 풀어봐요!
        </h2>

        <ul className="grid  sm:grid-cols-1 lg:grid-cols-3 gap-8 px-6 sm:px-10 max-w-6xl mx-auto">
          <li className="flex flex-col items-center p-6 border border-red-200 bg-red-50 rounded-2xl shadow-sm">
            <img
              src="/assets/contract.png"
              alt="AI 평가 기능"
              className="w-32 h-32 object-contain mb-4"
            />
            <p className="text-gray-700 font-medium">
              AI가 제출 시간과 코드를 분석해 <br /> 합리적인 평가를 제공해요.
            </p>
          </li>

          <li className="flex flex-col items-center p-6 border border-blue-200 bg-blue-50 rounded-2xl shadow-sm">
            <img
              src="/assets/chat.png"
              alt="채팅 협업 기능"
              className="w-32 h-32 object-contain mb-4"
            />
            <p className="text-gray-700 font-medium">
              실시간 채팅으로 함께 문제를 풀며 <br /> 더 쉽게 배우세요.
            </p>
          </li>

          <li className="flex flex-col items-center p-6 border border-orange-200 bg-orange-50 rounded-2xl shadow-sm">
            <img
              src="/assets/medal.png"
              alt="랭킹 시스템"
              className="w-32 h-32 object-contain mb-4"
            />
            <p className="text-gray-700 font-medium">
              꾸준히 도전하고 성장해 <br /> 금메달을 획득하세요!
            </p>
          </li>
        </ul>
      </section>

      {/* 문제 선택 섹션 */}
      <ProblemList />
    </div>
  );
}

export default MainPage;
