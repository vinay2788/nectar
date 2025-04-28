/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateBg, generateColor, getButtonHeight } from "@ui/utils/theme";
import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { Loader } from "react-feather";

export type ButtonHeight = "large" | "normal" | "small" | "extrasmall";

const Button = ({
  children,
  width = "w-auto",
  theme = "primary",
  className = "",
  type = "button",
  onClick,
  disabled,
  height = "normal",
  loading = false,
  style,
  loadingText,
}: {
  children?: string | ReactNode;
  width?: string;
  theme?: any;
  className?: string;
  type?: "button" | "reset" | "submit";
  onClick?: MouseEventHandler;
  disabled?: boolean;
  height?: ButtonHeight;
  loading?: boolean;
  accessCodes?: string[];
  style?: CSSProperties;
  loadingText?: string | null;
}) => {
  return (
    <button
      className={`${width} px-4 py-${getButtonHeight(height)} rounded-md ${
        !disabled ? generateBg(theme) : "bg-gray-300"
      } ${!disabled ? generateColor(theme) : "text-light"} focus:active:hover:${
        !disabled
          ? theme === "secondary"
            ? `bg-primary`
            : `bg-secondary`
          : "bg-gray-200"
      } hover:${!disabled ? "text-primary-alt" : "text-light"} ${
        className || ""
      } focus:ring-2 ring-accent ${loading ? "opacity-50" : ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
    >
      {loading ? (
        <div className="flex justify-center item-center space-x-2">
          <div>
            <Loader className="animate-spin mx-auto" />
          </div>
          <div>
            <span>{loadingText || ""}</span>
          </div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
