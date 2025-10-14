function RankPage() {
  const data = [
    {
      title: "순서 바꾸기",
      ranks: [
        { medal: "🥇", user: "sdka***", score: 98, time: "34:56" },
        { medal: "🥈", user: "dqwko***", score: 85, time: "40:12" },
        { medal: "🥉", user: "ahjdw***", score: 80, time: "45:30" },
      ],
    },
    {
      title: "트리구조 바꾸기",
      ranks: [
        { medal: "🥇", user: "ahjdw***", score: 78, time: "01:02:18" },
        { medal: "🥈", user: "xjisww***", score: 62, time: "48:05" },
      ],
    },
    {
      title: "카드게임",
      ranks: [
        { medal: "🥇", user: "sdka***", score: 98, time: "34:56" },
        { medal: "🥈", user: "dqwko***", score: 85, time: "02:40:12" },
        { medal: "🥉", user: "clcddka***", score: 50, time: "03:20:45" },
      ],
    },
  ];

  return (
    <div className="pt-6  mx-auto space-y-6">
      {data.map((challenge, idx) => (
        <div key={idx} className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">{`${idx + 1}. ${
            challenge.title
          }`}</h3>
          <ul className="space-y-2">
            {challenge.ranks.map((rank, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition"
              >
                {/* 메달 + 순위 */}
                <div className="flex items-center gap-3">
                  <span className="text-2xl tossface">{rank.medal}</span>
                  <span className="font-medium">{rank.user}</span>
                </div>

                {/* 점수 + 제출시간 */}
                <div className="flex items-center gap-4 mt-1 sm:mt-0 text-gray-600 text-sm">
                  <span>{rank.time}</span>
                  <span className="font-bold text-gray-700">
                    {rank.score}점
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RankPage;
