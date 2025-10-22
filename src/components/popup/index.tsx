// AbsPopup.tsx
import React from "react";
import Button from "../ui/Button";

export interface AbsPopupProps {
  popupType: 'alert' | 'confirm' | 'delete' | 'review';
  body?: React.ReactNode;
  header?: { title?: string; isClose?: boolean };
  footer?: { onConfirm?: () => void; onCancel?: () => void };
  onClose: () => void;
}

const AbsPopup: React.FC<AbsPopupProps> = ({
  popupType,
  body,
  header,
  footer,
  onClose,
}) => {
  // 타입에 맞게 기존 내용 작성
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div
        className={`relative z-10 w-full max-w-md mx-auto rounded-lg shadow-lg border overflow-hidden bg-white border-gray-300
        text-black
        `}
      >
        {header && (
          <header className="flex justify-between items-center p-4 border-b border-b-gray-200">
            <h3 className="text-lg font-semibold">{header.title || '알림'}</h3>
            {header.isClose && (
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            )}
          </header>
        )}

        <div className="p-4">{body}</div>

        {footer && (
          <footer className="flex justify-end gap-4 p-4 border-t border-t-gray-200">
            {popupType === 'confirm' && (
              <button onClick={footer.onCancel || onClose} className="mr-2 hover:opacity-60">
                취소
              </button>
            )}

            <Button
              change={() => {
                footer?.onConfirm?.();
                onClose();
              }}
              text={popupType === 'delete' ? '삭제' : '확인'}
              option={{ color: 'brandtheme' }}
            />
          </footer>
        )}
      </div>
    </div>
  );
};

export default AbsPopup;
