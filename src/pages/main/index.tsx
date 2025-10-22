import Button from '../../components/ui/Button';
import { useChallengeList, useTutorial } from './hook';

function IntroBanner() {
  const goToTutorial = useTutorial();

  return (
    <section className="flex flex-col sm:flex-row justify-between items-center bg-[#f2f4f6] border border-gray-200 lg:rounded-2xl px-6 py-5 my-10">
      <div className="text-center sm:text-left">
        <h2 className="text-lg font-medium text-gray-800 leading-snug tossface">
          👋 환영합니다. <span className="font-semibold text-gray-900">첫 방문</span>이라면 안내가 포함된{' '}
          <span className="font-semibold text-gray-900">연습문제</span>부터 시작해보세요.
        </h2>
      </div>

      <div className="mt-4 sm:mt-0">
        <Button text="연습문제 바로가기" option={{ color: 'gray', isIcon: true }} change={goToTutorial} />
      </div>
    </section>
  );
}

function FeatureSection() {
  const features = [
    {
      img: 'contract.png',
      alt: 'AI 평가 기능',
      text: (
        <>
          AI가 제출 시간과 코드를 분석해 <br /> 합리적인 평가를 제공합니다.
        </>
      ),
      color: 'blue',
    },
    {
      img: 'chat.png',
      alt: '실시간 채팅 협업',
      text: (
        <>
          실시간 채팅으로 함께 문제를 풀며 <br /> 더 쉽게 배우세요.
        </>
      ),
      color: 'purple',
    },
    {
      img: 'medal.png',
      alt: '랭킹 시스템',
      text: (
        <>
          꾸준히 도전하고 성장해 <br /> 금메달을 획득하세요!
        </>
      ),
      color: 'yellow',
    },
  ];

  const bgMap: Record<string, string> = {
    blue: 'bg-blue-50 border-blue-100',
    purple: 'bg-violet-50 border-violet-100',
    yellow: 'bg-amber-50 border-amber-100',
  };

  return (
    <section className="py-12 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-12">
        더 이상 혼자 공부하지 말고, <br className="sm:hidden" />
        알고리즘을 함께 재밌게 풀어봐요!
      </h2>

      <ul className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-6 max-w-6xl mx-auto">
        {features.map(({ img, alt, text, color }, i) => (
          <li
            key={i}
            className={`flex flex-col items-center border ${bgMap[color]} rounded-2xl p-8 shadow-sm hover:shadow-md transition-all`}
          >
            <img
              src={`${import.meta.env.BASE_URL}assets/${img}`}
              alt={alt}
              className="w-28 h-28 object-contain mb-4"
              width={120}
              height={120}
            />
            <p className="text-gray-700 font-medium leading-relaxed">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProblemList() {
  const { challengeList, goToChallenge } = useChallengeList();

  return (
    <section className="px-4 lg:px-0 py-10 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">경쟁할 문제 고르기</h2>

      <ol className="grid gap-5 grid-cols-1 lg:grid-cols-2">
        {challengeList.map(({ id, title, description }) => (
          <li
            key={id}
            className="flex flex-col justify-between border border-gray-200 rounded-xl bg-white p-6 hover:border-[#3182f6] hover:bg-blue-50/50 transition-all"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
              <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
            </div>
            <Button text="도전하기" option={{ color: 'brandtheme', isIcon: true }} change={() => goToChallenge(id)} />
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function MainPage() {
  return (
    <main className="min-h-screen">
      <div className="">
        <IntroBanner />
        <FeatureSection />
        <ProblemList />
      </div>
    </main>
  );
}
