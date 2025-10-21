import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import apiFetch from "../utils/apiFetch";

interface User {
  id: number;
  email: string;
  nickname: string;
  role: "USER";
}

interface AuthState {
  user: User | null;
  initialized: boolean;
  init: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      initialized: false,

      init: async () => {
        if (get().initialized) return;

        try {
          const res = await apiFetch<User>("/auth/me");

          if (res.success && res.data) {
            set({ user: res.data, initialized: true });
          } else {
            console.warn("사용자 정보를 불러오지 못했습니다:", res.error);
            set({ initialized: true });
          }
        } catch (err) {
          console.error("사용자 정보 요청 실패:", err);
          set({ initialized: true });
        }
      },

      logout: () => {
        set({ user: null, initialized: false });
        sessionStorage.removeItem("auth-storage"); // 명시적 제거
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
