"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import BetterTooltip from "@/components/ui/better-tooltip";
import { Button } from "@/components/ui/button";

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      className="cursor-pointer"
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <BetterTooltip content="Toggle theme">
        <div className="relative w-full h-full flex items-center justify-center">
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all scale-0 dark:scale-100" />
          <Moon className="absolute m-auto h-[1.2rem] w-[1.2rem] transition-all scale-100 dark:scale-0" />
          <span className="sr-only">Cambiar tema</span>
        </div>
      </BetterTooltip>
    </Button>
  );
}
