import { useEffect, useState, useRef, useCallback } from 'react';
import { Client, type IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';

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
    const token = Cookies.get('accessToken');
    if (!token) return;

    // 🔇 console.error를 임시로 비활성화
    const originalError = console.error;
    console.error = (...args) => {
      const msg = args?.[0]?.toString?.() ?? '';
      if (msg.includes('Failed to load resource') || msg.includes('WebSocket connection to')) {
        return;
      }
      originalError(...args);
    };

    const socket = new SockJS('http://3.107.155.57/ws');

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    client.onConnect = () => {
      console.log('WebSocket connected');

      client.subscribe('/topic/chat', (msg: IMessage) => {
        try {
          const body: ChatMessage = JSON.parse(msg.body);
          setMessages(prev => [...prev, body]);
        } catch {
          // 무시
        }
      });
    };

    client.onStompError = () => {
      // 필요 시 로그 추가
    };

    client.activate();
    clientRef.current = client;

    return () => {
      console.error = originalError;
      client.deactivate();
    };
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (clientRef.current?.connected) {
      clientRef.current.publish({
        destination: '/app/chat.send',
        body: JSON.stringify({ message }),
      });
    }
  }, []);

  return { messages, sendMessage };
};
