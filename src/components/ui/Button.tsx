import type { MouseEventHandler } from "react";
import React from "react";

interface ButtonOption {
  size?: "sm" | "md" | "lg";
  color?: "brandtheme" | "gray" | "danger";
  round?: 0 | 4 | 8 | 12;
}

interface IButtonProps {
  text: string | number;
  change?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  option?: ButtonOption;
}

const Button: React.FC<IButtonProps> = ({
  text,
  change,
  className = "",
  option = {},
}) => {
  // 옵션 분해 + 기본값 설정
  const { size = "md", color = "brandtheme", round = 8 } = option;

  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }[size];

  const colorClasses = {
    brandtheme: "bg-blue-500 text-white hover:bg-blue-600",
    gray: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600",
  }[color];

  const roundClasses = {
    0: "rounded-none",
    4: "rounded-md",
    8: "rounded-lg",
    12: "rounded-xl",
  }[round];

  return (
    <button
      onClick={change}
      className={`font-medium transition-colors duration-200 ${sizeClasses} ${colorClasses} ${roundClasses} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
