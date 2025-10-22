import Editor from '@monaco-editor/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiFetch from '../../utils/apiFetch';
import Button from '../../components/ui/Button';
import { usePopupStore } from '../../store/popupStore';
import ReviewBody from '../../components/popup/reviewBody';

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
    <div className="font-mono text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded-md border border-gray-200">
      <span className="tossface mr-2">⏱️</span>
      {formatTime(seconds)}
    </div>
  );
}

const useGetChallengeDetail = (state: number) => {
  const [challenge, setChallenge] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const res = await apiFetch(`/problems/${state}`);
      if (res) setChallenge(res);
    })();
  }, []);
  return { challenge };
};

const ChallengePage: React.FC = () => {
  const { state } = useLocation();
  const { challenge } = useGetChallengeDetail(state);
  const navigate = useNavigate();
  const { openPopup } = usePopupStore();

  const [sourceCode, setSourceCode] = useState(`print("Hello World!")`);

  const submit = async () => {
    try {
      const res = await apiFetch('/api/submissions', {
        method: 'POST',
        body: JSON.stringify({ problemId: state, language: 'python', sourceCode }),
      });
      openPopup({
        visible: true,
        popupType: 'alert',
        header: { title: '제출 완료' },
        body: <ReviewBody submissionId={res.id} />,
      });
    } catch {
      openPopup({
        visible: true,
        popupType: 'alert',
        header: { title: '제출 실패' },
        body: <p className="text-center">제출 중 오류가 발생했습니다.</p>,
        footer: { onConfirm() {} },
      });
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f9fafb]">
      {/* 헤더 */}
      <header className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-6">
        <h1 className="text-[20px] font-bold text-gray-900 tracking-tight">
          {challenge?.title || '문제 불러오는 중...'}
        </h1>
        <Timer />
      </header>

      {/* 메인 */}
      <main className="flex flex-1 flex-col lg:flex-row gap-6 p-6 overflow-hidden">
        {/* 문제 설명 */}
        <section className="flex-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-auto">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">문제 설명</h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-4">{challenge?.description}</p>
          <div className="bg-gray-50 border border-gray-200 rounded-md p-3 text-sm font-mono text-gray-800">
            <h3 className="font-semibold text-gray-600 mb-1">예제 입력 / 출력</h3>
            <pre className="text-xs whitespace-pre-wrap">
              {challenge?.examplesJson && JSON.stringify(challenge.examplesJson, null, 2)}
            </pre>
          </div>
        </section>

        {/* 코드 영역 */}
        <section className="flex-[2] flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          {/* 상단 버튼 */}
          <div className="flex justify-end gap-3 mb-3">
            <Button
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
            <Button
              text="코드 테스트"
              className="bg-[#0064FF]/10 text-[#0064FF] hover:bg-[#0064FF]/20 transition-colors"
            />
            <Button
              text="제출하기"
              className="bg-[#0064FF] text-white hover:bg-[#0050E0] transition-colors"
              change={submit}
            />
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
      </main>
    </div>
  );
};

export default ChallengePage;
