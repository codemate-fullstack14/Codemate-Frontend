import React from "react";
import AbsPopup from "./index";
import { usePopupStore } from "../../store/popupStore";

const AbsPopupProvider: React.FC = () => {
  const { visible, popupType, body, header, footer, closePopup } =
    usePopupStore();

  if (!visible) return null;

  return (
    <AbsPopup
      popupType={popupType!}
      body={body}
      header={header}
      footer={footer}
      onClose={closePopup}
    />
  );
};

export default AbsPopupProvider;
