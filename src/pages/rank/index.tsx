import { useGetRankList } from './hook';

export default function RankPage() {
  const { allRanking, sumRanking } = useGetRankList();

  return (
    <main className=" px-6 py-12 bg-white">
      {/* 종합 랭킹 */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">종합 순위</h2>

        {sumRanking.length ? (
          <ul className="divide-y divide-gray-200 border border-gray-100 rounded-xl overflow-hidden">
            {sumRanking.map((rank, i) => (
              <li key={i} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl tossface leading-none">
                    {rank.rank === 1 ? '🥇' : rank.rank === 2 ? '🥈' : rank.rank === 3 ? '🥉' : `#${rank.rank}`}
                  </span>
                  <span className="text-gray-900 font-medium">{rank.username}</span>
                </div>
                <span className="font-semibold text-base tabular-nums">{rank.score.toLocaleString()}점</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 py-8">
            아직 순위가 없습니다. <br /> 문제에 도전하고 1등을 노려보세요.
          </p>
        )}
      </section>

      {/* 문제별 랭킹 */}
      <section className="mt-12 space-y-8">
        <h2 className="text-2xl font-semibold text-gray-900">문제별 순위</h2>

        {allRanking.map((challenge, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {idx + 1}. {challenge.problemTitle}
            </h3>

            {challenge.rankings.length ? (
              <ul className="divide-y divide-gray-200 border border-gray-100 rounded-xl overflow-hidden">
                {challenge.rankings.map((rank, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl tossface leading-none">
                        {rank.rank === 1 ? '🥇' : rank.rank === 2 ? '🥈' : rank.rank === 3 ? '🥉' : `#${rank.rank}`}
                      </span>
                      <span className="text-gray-900">{rank.username}</span>
                    </div>
                    <span className="font-semibold text-sm tabular-nums">{rank.score.toLocaleString()}점</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 py-6">
                아직 순위가 없습니다.
                <br /> 문제에 도전하고 1등을 노려보세요.
              </p>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
