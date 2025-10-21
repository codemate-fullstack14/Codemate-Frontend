import { useEffect, useState, useRef, useCallback } from "react";
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";

export interface ChatMessage {
  id: number;
  userId: number;
  nickname: string;
  message: string;
  createdAt: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) return;

    // SockJS 사용
    const socket = new SockJS("http://localhost:8080/ws");

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      // debug: (str) => console.log(str), // 디버그용
      connectHeaders: {
        Authorization: `Bearer ${token}`, // JWT 헤더
      },
    });

    client.onConnect = () => {
      console.log("WebSocket connected");

      client.subscribe("/topic/chat", (msg: IMessage) => {
        try {
          const body: ChatMessage = JSON.parse(msg.body);
          setMessages((prev) => [...prev, body]);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          console.error("Invalid chat message:", msg.body);
        }
      });
    };

    client.onStompError = (frame) => {
      console.error("STOMP error:", frame);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify({ message }),
      });
    }
  }, []);

  return { messages, sendMessage };
};
