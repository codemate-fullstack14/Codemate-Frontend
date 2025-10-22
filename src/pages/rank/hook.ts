import { useEffect, useState } from 'react';
import apiFetch from '../../utils/apiFetch';

export const useGetRankList = () => {
  const [sumRanking, setSumRanking] = useState<{ rank: number; score: number; userId: number; username: string }[]>([]);

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
      method: 'GET',
    });

    setSumRanking(res.data.rankings);
  };

  const challengeRanking = async () => {
    const problemIds = [1, 2, 3, 4, 5, 6];

    try {
      const results = await Promise.all(
        problemIds.map(id =>
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
          }>(`/api/rankings/problem/${id}/alltime`, { method: 'GET' }),
        ),
      );

      const formatted = results.map(res => ({
        problemId: res.data.problemId,
        problemTitle: res.data.problemTitle,
        rankings: res.data.rankings,
      }));

      setAllRankings(formatted);
    } catch (err) {
      console.error('랭킹 조회 실패:', err);
    }
  };

  useEffect(() => {
    init();
    challengeRanking();
  }, []);

  return { allRanking, sumRanking };
};
