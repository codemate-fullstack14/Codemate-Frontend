import { useEffect, useState } from "react";
import apiFetch from "../../utils/apiFetch";

const useGetRankList = () => {
  const [sumRanking, setSumRanking] = useState<
    { rank: number; score: number; userId: number; username: string }[]
  >([]);

  const [allRanking, setAllRankings] = useState<
    {
      problemId: number;
      problemTitle: string;
      rankings: {
        rank: number;
        score: number;
        userId: number;
        username: string;
      }[];
    }[]
  >([]);

  const init = async () => {
    const res = await apiFetch<{
      rankings: {
        rank: number;
        score: number;
        userId: number;
        username: string;
      }[];
    }>(`/api/rankings/alltime?topN=${10}`, {
      method: "GET",
    });

    setSumRanking(res.data.rankings);
  };

  const challengeRanking = async () => {
    const problemIds = [1, 2, 3, 4, 5, 6];

    try {
      const results = await Promise.all(
        problemIds.map((id) =>
          apiFetch<{
            problemId: number;
            problemTitle: string;
            date: string;
            rankings: {
              userId: number;
              username: string;
              score: number;
              rank: number;
            }[];
            totalUsers: number;
          }>(`/api/rankings/problem/${id}/monthly`, { method: "GET" })
        )
      );

      const formatted = results.map((res) => ({
        problemId: res.data.problemId,
        problemTitle: res.data.problemTitle,
        rankings: res.data.rankings,
      }));

      setAllRankings(formatted); // 상태에 맞게 저장
    } catch (err) {
      console.error("랭킹 조회 실패:", err);
    }
  };

  useEffect(() => {
    init();
    challengeRanking();
  }, []);

  return { allRanking, sumRanking };
};

function RankPage() {
  const { allRanking, sumRanking } = useGetRankList();

  return (
    <div className="pt-6 mx-auto space-y-6 px-4 lg:px-0">
      <div>
        <h2 className="font-bold text-xl mb-4">종합순위</h2>
        <ul className="space-y-2">
          {sumRanking.length ? (
            sumRanking.map((rank, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl tossface">
                    {rank.rank === 1
                      ? "🥇"
                      : rank.rank === 2
                      ? "🥈"
                      : rank.rank === 3
                      ? "🥉"
                      : rank.rank}
                  </span>
                  <span className="font-medium">{rank.username}</span>
                </div>

                <div className="flex items-center gap-4 mt-1 sm:mt-0 text-gray-600 text-sm">
                  <span className="font-bold text-gray-700">
                    {rank.score}점
                  </span>
                </div>
              </li>
            ))
          ) : (
            <li>
              <div>
                <p>아직 순위가 없습니다. 문제에 도전하고 1등을 노려봐요.</p>
              </div>
            </li>
          )}
        </ul>
      </div>

      <div>
        <h2 className="font-bold text-xl mb-4">문제별 순위</h2>
        {allRanking.map((challenge, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-lg font-semibold mb-3">{`${idx + 1}. ${
              challenge.problemTitle
            }`}</h3>
            <ul className="space-y-2">
              {challenge.rankings.length ? (
                challenge.rankings.map((rank, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition"
                  >
                    {/* 메달 + 순위 */}
                    <div className="flex items-center gap-3">
                      <span className="text-2xl tossface">
                        {rank.rank === 1
                          ? "🥇"
                          : rank.rank === 2
                          ? "🥈"
                          : rank.rank === 3
                          ? "🥉"
                          : rank.rank}
                      </span>
                      <span className="font-medium">{rank.username}</span>
                    </div>

                    <div className="flex items-center gap-4 mt-1 sm:mt-0 text-gray-600 text-sm">
                      <span className="font-bold text-gray-700">
                        {rank.score}점
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="flex items-center justify-center bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition">
                  <div>
                    <p className="text-gray-500 text-center">
                      아직 순위가 없습니다.
                      <br /> 문제에 도전하고 1등을 노려봐요.
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RankPage;
