import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import Joyride, { type Step } from "react-joyride";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { usePopupStore } from "../../../store/popupStore";

const TutorialPage: React.FC = () => {
  const navigate = useNavigate();
  const [run, setRun] = useState(false);
  const { openPopup } = usePopupStore();

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

  const [steps] = useState<Step[]>([
    {
      target: "h2.text-2xl",
      content: "도전한 문제의 이름이 표시됩니다.",
      placement: "bottom",
    },
    {
      target: "section:first-of-type",
      content: "문제설명과 예시 출력을 확인할 수 있습니다.",
      placement: "right",
    },
    {
      target: ".timer",
      content: "경과 시간을 안내합니다.",
      placement: "bottom",
    },
    {
      target: "#stop-button",
      content: "작성된 내용을 초기화 하고 홈으로 이동합니다.",
      placement: "bottom",
    },
    {
      target: "#test-code-button",
      content: "작성한 코드를 테스트할 수 있습니다.(추후 기능오픈 예정)",
      placement: "bottom",
    },
    {
      target: "section:last-of-type button:last-of-type",
      content: "완성된 코드를 제출하세요.",
      placement: "bottom",
    },
    {
      target: ".monaco-editor",
      content: "여기에 직접 코드를 작성할 수 있습니다.",
      placement: "top",
    },
    {
      target: ".bg-gray-900",
      content: "코드 실행 결과가 이 영역에 표시됩니다.",
      placement: "top",
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setRun(true), 1000); // 0.8초 후 실행
    return () => clearTimeout(timer);
  }, []);

  //
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {run && (
        <Joyride
          key={run ? "active" : "inactive"}
          steps={steps}
          run={run}
          continuous
          showSkipButton
          scrollToFirstStep
          locale={{
            back: "이전",
            close: "닫기",
            last: "완료",
            next: "다음",
            skip: "건너뛰기",
          }}
          callback={({ status }) => {
            if (status === "finished" || status === "skipped") {
              navigate("/");
            }
          }}
          styles={{
            options: {
              primaryColor: "#4f46e5",
              zIndex: 10000,
            },
            buttonNext: { backgroundColor: "#4f46e5" },
            buttonBack: { color: "#6b7280" },
          }}
        />
      )}

      {/* 헤더 */}
      <header className="h-16 flex justify-center items-center border-b border-gray-300">
        <h2 className="text-2xl">반갑게인사하기</h2>
      </header>

      {/* 본문 영역 */}
      <div className="flex flex-1 flex-col lg:flex-row gap-6 p-6">
        {/* 문제 설명 영역 */}
        <section className="flex-1 bg-white shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">문제 설명</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            처음 온 고객분들에게 첫인상이 중요한 만큼 반갑게 인사를 건내보아요.
            {"\n\n"}
            예시:
            <span className="block bg-gray-100 p-2 rounded mt-2 text-sm">
              Output:: hello world!
            </span>
          </p>
        </section>

        {/* 코드 작성 영역 */}
        <section className="flex-[2] bg-white shadow-md border border-gray-200 p-4 flex flex-col">
          {/* 버튼 영역 */}
          <div className="flex justify-end items-center gap-2 mb-3">
            <div className="text-gray-700 font-mono text-sm bg-gray-100 border border-gray-300 px-3 py-1 rounded timer">
              {formatTime(seconds)}
            </div>

            <Button
              id="stop-button"
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

            <Button
              id="test-code-button"
              text={"코드 테스트"}
              option={{ color: "brandtheme" }}
              className="p-0"
              disabled
            />
            <Button
              text={"코드 제출"}
              className="bg-green-500 hover:bg-green-600"
              option={{ isIcon: true }}
            />
          </div>

          {/* 코드 에디터 */}
          <div className="flex-1 border border-gray-300 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="python"
              defaultValue={`# 여기에 코드를 작성하세요\nprint("hello world!")`}
              theme="vs-light"
              onMount={(editor) => {
                editor.updateOptions({ contextmenu: false });
              }}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
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

export default TutorialPage;
