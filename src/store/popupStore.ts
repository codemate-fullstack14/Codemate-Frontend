import { create } from "zustand";

interface PopupState {
  visible: boolean;
  popupType?: "alert" | "confirm" | "delete";
  body?: React.ReactNode;
  header?: { title?: string; isClose?: boolean };
  footer?: { onConfirm?: () => void; onCancel?: () => void };
  openPopup: (props: Omit<PopupState, "openPopup" | "closePopup">) => void;
  closePopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  visible: false,
  popupType: "alert",
  body: undefined,
  header: undefined,
  footer: undefined,
  openPopup: (props) => set({ ...props }),
  closePopup: () =>
    set({
      visible: false,
      popupType: "alert",
      body: undefined,
      header: undefined,
      footer: undefined,
    }),
}));
