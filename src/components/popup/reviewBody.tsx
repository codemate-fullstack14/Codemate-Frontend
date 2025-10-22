import { useEffect, useState } from "react";
import apiFetch from "../../utils/apiFetch";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { usePopupStore } from "../../store/popupStore";

interface IReviewBodyProps {
  submissionId?: number;
}

interface IResAiReviews {
  aiBonus: number;
  createdAt: string;
  improvementTips: string;
  inputTokens: number;
  mistakeReason: string;
  model: string;
  outputTokens: number;
  problemId: number;
  problemTitle: string;
  promptVersion: string;
  qualityScore: number;
  score: number;
  submissionId: number;
  summary: string;
  totalScore: number;
}

function ReviewBody({ submissionId }: IReviewBodyProps) {
  const [result, setResult] = useState<IResAiReviews | undefined>(undefined);
  const navigate = useNavigate();
  const { closePopup } = usePopupStore();

  const getAiReview = async () => {
    const res = await apiFetch<any>("/api/reviews", {
      method: "POST",
      body: JSON.stringify({ submissionId }),
    });

    setResult(res as unknown as IResAiReviews);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getAiReview();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!result) {
    return (
      <div className="flex flex-col justify-center items-center h-[200px]">
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((_, idx) => (
            <span
              key={idx}
              className="bg-blue-500 w-2.5 h-2.5 rounded-full inline-block animate-bounce"
              style={{
                animationDelay: `${idx * 0.2}s`,
                animationDuration: "1s",
              }}
            />
          ))}
        </div>
        <span className="text-gray-700 font-medium text-center">
          AI가 채점 중입니다.
          <br />
          잠시만 기다려 주세요.
        </span>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto bg-white p-2 space-y-6">
      {/* 헤더 */}
      <header className="border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-800">{result.problemTitle}</h2>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(result.createdAt).toLocaleString()} · AI 모델:{' '}
          <span className="font-medium text-gray-700">{result.model}</span>
        </p>
      </header>

      {/* 요약 */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">요약</h3>
        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg max-h-[100px] overflow-y-auto">
          {result.summary}
        </p>
      </section>

      {/* 개선 팁 */}
      <section>
        <h3 className=" text-lg font-semibold text-gray-800 mb-2 ">개선해야 할 부분</h3>
        <p className="text-gray-700 leading-relaxed bg-amber-50 p-4 rounded-lg border border-amber-100 max-h-[160px] overflow-y-auto">
          {result.improvementTips}
        </p>
      </section>

      {/* 점수 영역 */}
      <section className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 rounded-xl border border-gray-200 p-4">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-sm text-gray-500">총합 점수: {result.totalScore}점 중</p>
          <p className="text-4xl font-extrabold ">
            <strong className="text-blue-600"> {result.score}</strong>
          </p>
        </div>

        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">AI 보너스</p>
            <p className="text-lg font-semibold text-green-600">+{result.aiBonus}</p>
          </div>
        </div>
      </section>

      {/* AI 평가 근거 */}
      {result.mistakeReason && (
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">AI 평가 근거</h3>
          <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{result.mistakeReason}</p>
        </section>
      )}

      <div className="flex  gap-2">
        <Button
          text={'다른문제 풀기'}
          option={{ isIcon: true, color: 'transparent' }}
          className="w-full"
          change={() => {
            navigate('/');
            closePopup();
          }}
        />
        <Button
          text={'순위보러가기'}
          option={{ isIcon: true, color: 'brandtheme' }}
          className="w-full"
          change={() => {
            navigate('/rank');
            closePopup();
          }}
        />
      </div>
    </article>
  );
}

export default ReviewBody;
