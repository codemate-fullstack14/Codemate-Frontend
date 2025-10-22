import type { MouseEventHandler } from "react";
import React from "react";

const rightIcon = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 1024 1024' fill='%23ffffff'%3E%3Cpath d='M338.752 104.704a64 64 0 000 90.496l316.8 316.8-316.8 316.8a64 64 0 0090.496 90.496l362.048-362.048a64 64 0 000-90.496L429.248 104.704a64 64 0 00-90.496 0z'/%3E%3C/svg%3E")`;

interface ButtonOption {
  size?: "sm" | "md" | "lg";
  color?: "brandtheme" | "gray" | "danger" | "transparent";
  round?: 0 | 4 | 8 | 12;
  isIcon?: boolean;
}

interface IButtonProps {
  id?: string;
  text: string | number;
  change?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  option?: ButtonOption;
  type?: "button" | "submit";
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  id,
  text,
  change,
  className = "",
  type = "button",
  option = {},
  disabled = false,
}) => {
  const { size = "md", color = "gray", round = 8, isIcon = false } = option;

  const sizeClasses = {
    sm: "px-2 py-1 text-sm gap-1",
    md: "px-4 py-2.5 text-base ",
    lg: "px-6 py-3 text-lg ",
  }[size];

  const colorClasses = {
    brandtheme: "bg-blue-500 text-white hover:bg-blue-600",
    gray: "bg-gray-600 text-white hover:bg-gray-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
    transparent: "bg-translate text-black hover:opacity-60",
  }[color];

  const roundClasses = {
    0: "rounded-none",
    4: "rounded-md",
    8: "rounded-lg",
    12: "rounded-xl",
  }[round];

  return (
    <button
      id={id}
      onClick={change}
      className={`flex items-center justify-center font-bold transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${colorClasses} ${roundClasses} ${className}`}
      type={type}
      disabled={disabled}
    >
      <span>{text}</span>
      {isIcon && (
        <span
          style={{
            backgroundImage: rightIcon,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: '1em',
            height: '1em',
          }}
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default Button;
