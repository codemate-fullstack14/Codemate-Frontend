import Editor from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { usePopupStore } from "../../../store/popupStore";
import { driver, type Driver } from "driver.js";
import "driver.js/dist/driver.css";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setSeconds(p => p + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (total: number) => {
    const h = String(Math.floor(total / 3600)).padStart(2, '0');
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
    const s = String(total % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="font-mono text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-200 timer">
      <span className="tossface mr-2">⏱️</span>
      {formatTime(seconds)}
    </div>
  );
}

const TutorialPage: React.FC = () => {
  const navigate = useNavigate();
  const { openPopup } = usePopupStore();
  const driverRef = useRef<Driver | null>(null);
  const [sourceCode, setSourceCode] = useState(`print("Hello World!")`);

  // 튜토리얼 단계 정의
  const startTutorial = () => {
    const driverObj = driver({
      showProgress: true,
      nextBtnText: '다음',
      prevBtnText: '이전',
      doneBtnText: '완료',
      steps: [
        {
          element: 'h1.font-bold',
          popover: {
            title: '문제 제목',
            description: '도전한 문제의 이름이 표시됩니다.',
            side: 'bottom',
          },
        },
        {
          element: 'section:first-of-type',
          popover: {
            title: '문제 설명',
            description: '문제 설명과 예시 출력을 확인할 수 있습니다.',
            side: 'right',
          },
        },
        {
          element: '.timer',
          popover: {
            title: '경과 시간',
            description: '문제 풀이 시간이 표시됩니다.',
            side: 'bottom',
          },
        },
        {
          element: '#stop-button',
          popover: {
            title: '중단하기',
            description: '작성된 내용을 초기화하고 홈으로 이동합니다.',
            side: 'bottom',
          },
        },
        // {
        //   element: '#test-code-button',
        //   popover: {
        //     title: '코드 테스트',
        //     description: '작성한 코드를 테스트할 수 있습니다. (추후 기능 오픈 예정)',
        //     side: 'bottom',
        //   },
        // },
        {
          element: 'section:last-of-type button:last-of-type',
          popover: {
            title: '코드 제출',
            description: '완성된 코드를 제출하세요.',
            side: 'bottom',
          },
        },
        {
          element: '.monaco-editor',
          popover: {
            title: '코드 에디터',
            description: '여기에 직접 코드를 작성할 수 있습니다.',
            side: 'top',
          },
        },
        {
          element: '.bg-gray-900',
          popover: {
            title: '출력 결과',
            description: '코드 실행 결과가 표시됩니다.',
            side: 'top',
          },
        },
      ],
      onDestroyed: () => {
        navigate('/');
      },
    });

    driverRef.current = driverObj;
    driverObj.drive();
  };

  useEffect(() => {
    const timer = setTimeout(startTutorial, 300);
    return () => {
      clearTimeout(timer);
      driverRef.current?.destroy();
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-6">
        <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">Hello World</h1>
        <Timer />
      </header>

      {/* 본문 영역 */}
      <div className="flex flex-1 flex-col lg:flex-row gap-6 p-6">
        {/* 문제 설명 영역 */}
        <section className="flex-1 bg-white shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">문제 설명</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            처음 온 고객분들에게 첫인상이 중요한 만큼 반갑게 인사를 건내보아요.
            {'\n\n'}
            예시:
            <span className="block bg-gray-100 p-2 rounded mt-2 text-sm">Output:: hello world!</span>
          </p>
        </section>

        {/* 코드 영역 */}
        <section className="flex-[2] flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          {/* 상단 버튼 */}
          <div className="flex justify-end gap-3 mb-3">
            <Button
              id="stop-button"
              text="중단하기"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              change={() =>
                openPopup({
                  visible: true,
                  popupType: 'confirm',
                  header: { title: '대결 종료' },
                  body: (
                    <p className="text-center">
                      작업을 중단합니다.
                      <br /> 지금까지 작성한 내용은 초기화됩니다.
                    </p>
                  ),
                  footer: {
                    onConfirm() {
                      navigate('/');
                    },
                  },
                })
              }
            />
            {/* <Button
              id="test-code-button"
              text="코드 테스트"
              className="bg-[#0064FF]/10 text-[#0064FF] hover:bg-[#0064FF]/20 transition-colors"
            /> */}
            <Button text="제출하기" className="bg-[#0064FF] text-white hover:bg-[#0050E0] transition-colors" />
          </div>

          {/* 코드 에디터 */}
          <div className="flex-1 border border-gray-200 rounded-md overflow-hidden">
            <Editor
              height="100%"
              defaultLanguage="python"
              value={sourceCode}
              theme="vs-light"
              onChange={v => setSourceCode(v || '')}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
              onMount={editor => {
                editor.onKeyDown(e => {
                  if ((e.metaKey || e.ctrlKey) && e.code === 'KeyV') {
                    e.preventDefault();
                    alert('붙여넣기는 허용되지 않습니다.');
                  }
                });
              }}
            />
          </div>

          {/* 실행 결과 */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">실행 결과</h3>
            <div className="bg-gray-900 text-gray-100 rounded-md p-3 h-32 overflow-auto text-sm font-mono">
              실행 결과가 여기에 표시됩니다.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TutorialPage;
