import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../../utils/apiFetch";

export const useTutorial = () => {
  const navigate = useNavigate();

  return () => {
    navigate("/tutorial");
  };
};

interface IResChallengeDTO {
  id: number;
  title: string;
  description: string;
}

export const useChallengeList = () => {
  const navigate = useNavigate();
  const [challengeList, setChallengeList] = useState<IResChallengeDTO[]>([]);

  const initChallengeListApi = async () => {
    const res = await apiFetch<IResChallengeDTO[]>("/problems", {
      method: "GET",
    });

    if (res?.items) {
      setChallengeList(
        res.items.sort((a, b) => {
          return a.id - b.id;
        })
      );
    }
  };

  const goToChallenge = (id: number) => {
    navigate("/challenge", { state: id });
  };

  useEffect(() => {
    initChallengeListApi();
  }, []);

  return { challengeList, goToChallenge };
};
