"use client";

import { Input } from "@/components/ui/input";

type SearchBarProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChange, placeholder = "Buscar produtos..." }: SearchBarProps) {
  return (
    <Input
      value={value}
      onChange={(event) => onChange?.(event.target.value)}
      placeholder={placeholder}
      aria-label="Buscar produtos"
    />
  );
}
