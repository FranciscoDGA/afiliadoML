import type { InputHTMLAttributes } from "react";
import { cn } from "@/components/ui/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-full border border-slate-300 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-ml-blue",
        className
      )}
      {...props}
    />
  );
}
