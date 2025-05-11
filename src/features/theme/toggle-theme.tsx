"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  function hanleClick() {
    if (theme === "light") {
      setTheme("dark");
    }
    if (theme === "dark") {
      setTheme("light");
    }
    if (theme === "system") {
      setTheme("dark");
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => hanleClick()}
    >
      <Sun className="text-contrast_color h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="text-contrast_color absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Переключатель темы</span>
    </Button>
  );
}
