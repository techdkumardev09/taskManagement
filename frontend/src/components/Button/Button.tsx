import { ReactEventHandler } from "react";

interface ButtonProps {
  className?: string;
  onClick?: ReactEventHandler;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
}

const Button = ({
  children,
  type = "button",
  className,
  onClick,
  isDisabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${className} rounded-full ${
        isDisabled && "bg-gray-300 cursor-not-allowed"
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;
