import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiFetch from "../../utils/apiFetch";
import Button from "../../components/ui/Button";
import { usePopupStore } from "../../store/popupStore";

const ChallengePage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { openPopup } = usePopupStore();

  const [challenge, setChallenge] = useState<{
    id?: number;
    title?: string;
    description?: string;
    examplesJson?: string;
  } | null>(null);

  const [sourceCode, setSourceCode] = useState(`print("Hello World!")`);

  const initDetail = async () => {
    const res = await apiFetch<{
      id: number;
      title: string;
      description: string;
      examplesJson: string;
    }>(`/problems/${state}`);
    if (res) setChallenge(res);
  };

  useEffect(() => {
    initDetail();
  }, []);

  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  console.log(state);
  const submit = async () => {
    try {
      await apiFetch("/api/submissions", {
        method: "POST",
        body: JSON.stringify({
          problemId: state,
          language: "python",
          sourceCode,
        }),
      });

      openPopup({
        visible: true,
        popupType: "alert",
        header: { title: "제출 완료" },
        body: (
          <p className="text-center">
            코드가 성공적으로 제출되었습니다.
            <br /> 홈으로 돌아갑니다.
          </p>
        ),
        footer: {
          onConfirm() {
            navigate("/");
          },
        },
      });
    } catch (err) {
      openPopup({
        visible: true,
        popupType: "alert",
        header: { title: "제출 실패" },
        body: <p className="text-center">제출 중 오류가 발생했습니다.</p>,
        footer: { onConfirm() {} },
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="h-16 flex justify-center items-center border-b border-gray-300">
        <h2 className="text-2xl">{challenge?.title}</h2>
      </header>

      {/* 본문 */}
      <div className="flex flex-1 flex-col lg:flex-row gap-6 p-6">
        {/* 문제 설명 */}
        <section className="flex-1 bg-white shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">문제 설명</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-4">
            {challenge?.description}
          </p>
          <span>예제:</span>
          <div className="block bg-gray-100 p-2 rounded mt-2 text-sm">
            {challenge?.examplesJson &&
              JSON.stringify(challenge.examplesJson, null, 2)}
          </div>
        </section>

        {/* 코드 작성 영역 */}
        <section className="flex-[2] bg-white shadow-md border border-gray-200 p-4 flex flex-col">
          {/* 버튼 영역 */}
          <div className="flex justify-end gap-2 mb-3 items-center">
            <div className="text-gray-700 font-mono text-sm bg-gray-100 border border-gray-300 px-3 py-1 rounded">
              {formatTime(seconds)}
            </div>

            <Button
              text={"중단하기"}
              option={{ color: "danger" }}
              change={() => {
                openPopup({
                  visible: true,
                  popupType: "confirm",
                  header: { title: "대결 종료" },
                  body: (
                    <p className="text-center">
                      작업을 중단합니다.
                      <br /> 지금까지 작성한 내용은 모두 초기화됩니다.
                    </p>
                  ),
                  footer: {
                    onConfirm() {
                      navigate("/");
                    },
                  },
                });
              }}
            />

            <Button text={"코드 테스트"} option={{ color: "brandtheme" }} />

            <Button
              text={"코드 제출"}
              className="bg-green-500 hover:bg-green-600 text-white"
              option={{ isIcon: true }}
              change={submit}
            />
          </div>

          {/* 코드 에디터 */}
          <div className="flex-1 border border-gray-300 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="python"
              value={sourceCode}
              theme="vs-light"
              onChange={(value) => setSourceCode(value || "")}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
              onMount={(editor) => {
                editor.onKeyDown(
                  (e: {
                    metaKey: any;
                    ctrlKey: any;
                    code: string;
                    preventDefault: () => void;
                  }) => {
                    if ((e.metaKey || e.ctrlKey) && e.code === "KeyV") {
                      e.preventDefault();
                      alert("붙여넣기는 허용되지 않습니다.");
                    }
                  }
                );
                editor.updateOptions({ contextmenu: false });
              }}
            />
          </div>

          {/* 실행 결과 */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-1">
              실행 결과
            </h3>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-3 h-32 overflow-auto text-sm font-mono">
              실행 결과가 여기에 표시됩니다.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ChallengePage;
