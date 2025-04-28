import { ButtonHeight } from "@ui/button";

export function generateBg(theme: string) {
  if (theme === "secondary") return "bg-secondary";
  if (theme === "accent") return "bg-accent";
  if (theme === "dark") return "bg-dark";
  if (theme === "light") return "bg-primary-alt";
  if (theme === "danger") return "bg-danger";
  if (theme === "success") return "bg-success";
  return "bg-primary";
}

export function generateColor(theme: string) {
  if (theme === "light" || theme === "success") return "text-primary";
  return "text-light";
}

export function generateBorderColor(theme: string) {
  if (theme === "secondary") return "border-secondary";
  if (theme === "accent") return "border-accent";
  if (theme === "dark") return "border-dark";
  if (theme === "light") return "border-primary-alt";
  if (theme === "danger") return "border-danger";
  if (theme === "success") return "border-success";
  return "border-primary";
}

export function generateReverseColor(theme: string) {
  if (theme === "secondary") return "text-secondary";
  if (theme === "accent") return "text-accent";
  if (theme === "dark" || theme === "light") return "text-dark";
  if (theme === "danger") return "text-danger";
  if (theme === "success") return "text-success";
  return "text-primary";
}

export const getButtonHeight = (height: ButtonHeight) => {
  switch (height) {
    case "large":
      return 3;
    case "normal":
      return 2;
    case "small":
      return 1;
    case "extrasmall":
      return 0;
    default:
      return 2;
  }
};
