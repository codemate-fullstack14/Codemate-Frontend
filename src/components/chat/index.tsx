import { useState, useMemo, useEffect, useRef } from "react";
import { useAuthStore } from "../../store/authStore";
import { useChat, type ChatMessage } from "../../hooks/useChat";
import Button from "../ui/Button";
import apiFetch from "../../utils/apiFetch";

const useChatHistory = () => {
  const fetchHistory = async () => {
    try {
      const res = await apiFetch<ChatMessage[]>("/api/chat/messages");
      return res;
    } catch (err) {
      console.error("채팅 히스토리 불러오기 실패", err);
      return [];
    }
  };
  return fetchHistory;
};

const ChatBox = () => {
  const fetchHistory = useChatHistory();
  const { user } = useAuthStore();
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const [history, setHistory] = useState<ChatMessage[]>([]);

  if (!user) return null;

  useEffect(() => {
    const init = async () => {
      const data = await fetchHistory();
      setHistory(data as unknown as ChatMessage[]);
    };
    init();
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const allMessages = useMemo(() => {
    const merged = [...history, ...messages];
    return merged.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [history, messages]);

  const groupedMessages = useMemo(() => {
    const groups: { nickname: string; items: ChatMessage[] }[] = [];
    allMessages.forEach((msg) => {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup.nickname === msg.nickname) {
        lastGroup.items.push(msg);
      } else {
        groups.push({ nickname: msg.nickname, items: [msg] });
      }
    });
    return groups;
  }, [allMessages]);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [allMessages]);

  return (
    <>
      {isShow && (
        <div className="fixed bottom-28 right-4 w-[90vw] max-w-[400px] border border-gray-300 p-4 bg-white z-100 rounded-3xl shadow-lg">
          <div
            className="flex flex-col max-h-80 overflow-y-auto mb-4 gap-3 chat-scroll"
            ref={scrollRef}
          >
            {groupedMessages.map((group, i) => {
              const isMine = user.nickname === group.nickname;
              return (
                <div
                  key={i}
                  className={`flex ${isMine ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex flex-col ${
                      isMine ? "items-end text-right" : "items-start text-left"
                    } max-w-[75%]`}
                  >
                    {!isMine && (
                      <strong className="text-xs text-gray-500 mb-1">
                        {group.nickname}
                      </strong>
                    )}
                    <div className="flex flex-col space-y-1">
                      {group.items.map((msg, j) => (
                        <div key={msg.id}>
                          <p
                            className={`inline-block px-3 py-2 rounded-md text-sm break-words ${
                              isMine
                                ? "bg-gray-600 text-white rounded-br-none"
                                : "bg-gray-200 text-gray-800 rounded-bl-none"
                            }`}
                          >
                            {msg.message}
                          </p>
                          {j === group.items.length - 1 && (
                            <span className="text-[10px] text-gray-400 mt-1 block">
                              {new Date(msg.createdAt).toLocaleTimeString(
                                "ko-KR",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2 items-center">
            <input
              className="flex-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return;
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="메시지를 입력하세요..."
            />
            <Button change={handleSend} className="w-[84px]" text={"전송"} />
          </div>
        </div>
      )}
      <button
        className="fixed right-4 bottom-6 bg-white z-100 p-4 rounded-full shadow-md flex items-center justify-center sm:w-14 sm:h-14 w-12 h-12"
        onClick={() => setIsShow(!isShow)}
        style={{
          width: "60px",
          height: "60px",
          backgroundImage: isShow
            ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40px' height='40px' viewBox='0 0 24 24' fill='none'%3E%3Cscript xmlns=''/%3E%3Cpath d='M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z' fill='%230F0F0F'/%3E%3Cscript xmlns=''/%3E%3C/svg%3E")`
            : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50px' height='60px' viewBox='0 0 24 24' fill='none'%3E%3Cscript xmlns=''/%3E%3Cpath d='M17 12.5C17.2761 12.5 17.5 12.2761 17.5 12C17.5 11.7239 17.2761 11.5 17 11.5C16.7239 11.5 16.5 11.7239 16.5 12C16.5 12.2761 16.7239 12.5 17 12.5Z' fill='%23000000' stroke='%23000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12 12.5C12.2761 12.5 12.5 12.2761 12.5 12C12.5 11.7239 12.2761 11.5 12 11.5C11.7239 11.5 11.5 11.7239 11.5 12C11.5 12.2761 11.7239 12.5 12 12.5Z' fill='%23000000' stroke='%23000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7 12.5C7.27614 12.5 7.5 12.2761 7.5 12C7.5 11.7239 7.27614 11.5 7 11.5C6.72386 11.5 6.5 11.7239 6.5 12C6.5 12.2761 6.72386 12.5 7 12.5Z' fill='%23000000' stroke='%23000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z' stroke='%23000000' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cscript xmlns=''/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: isShow ? "40%" : "60%",
        }}
        aria-label={isShow ? "대화 닫기" : "대화 열기"}
      ></button>
    </>
  );
};

export default ChatBox;
