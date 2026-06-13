import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/components/ui/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";
  const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "bg-ml-blue text-white hover:brightness-110",
    secondary: "bg-ml-yellow text-slate-900 hover:brightness-95",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100"
  };

  return <button className={cn(base, variants[variant], className)} {...props} />;
}
