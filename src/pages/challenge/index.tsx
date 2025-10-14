import Editor from "@monaco-editor/react";
import React from "react";

interface CodeEditorProps {
  language?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
}

const ChallengePage: React.FC<CodeEditorProps> = ({
  language = "python",
  value = `# 여기에 코드를 작성하세요\n print("hello world!")`,
  onChange,
}) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="h-16 flex justify-center items-center border-b border-gray-300">
        <h2 className="text-2xl">계산기만들기</h2>
      </header>

      {/* 본문 영역 */}
      <div className="flex flex-1 flex-col lg:flex-row gap-6 p-6">
        {/* 문제 설명 영역 */}
        <section className="flex-1 bg-white shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">문제 설명</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            두 정수를 매개변수로 받아 합산한 결과를 반환하는 함수를 구현하시오.
            {"\n\n"}
            예시:
            <code className="block bg-gray-100 p-2 rounded mt-2 text-sm">
              ➤ sum(3, 5) → 8
            </code>
          </p>
        </section>

        {/* 코드 작성 영역 */}
        <section className="flex-[2] bg-white shadow-md border border-gray-200 p-4 flex flex-col">
          {/* 버튼 영역 */}
          <div className="flex justify-end gap-2 mb-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-sm text-sm font-medium transition">
              코드 테스트
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-sm text-sm font-medium transition">
              코드 제출
            </button>
          </div>

          {/* 코드 에디터 */}
          <div className="flex-1 border border-gray-300 overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage={language}
              defaultValue={value}
              theme="vs-light"
              onChange={onChange}
              onMount={(editor) => {
                // 붙여넣기 방지
                editor.onKeyDown((e) => {
                  if ((e.metaKey || e.ctrlKey) && e.code === "KeyV") {
                    e.preventDefault();
                    alert("붙여넣기는 허용되지 않습니다.");
                  }
                });

                // 우클릭 메뉴 비활성화
                editor.updateOptions({ contextmenu: false });

                // 드래그 앤 드롭 방지
                const domNode = editor.getDomNode();
                if (domNode) {
                  domNode.addEventListener("paste", (e) => {
                    e.preventDefault();
                    alert("붙여넣기는 허용되지 않습니다.");
                  });
                  domNode.addEventListener("drop", (e) => e.preventDefault());
                }
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

export default ChallengePage;
