"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  /**
   * When true, renders a transparent variant suitable for dark hero backgrounds
   */
  variant?: "default" | "hero";
}

export function ThemeToggle({ variant = "default" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  // Use inline styles for hero variant to ensure they override any cached CSS
  const heroStyles = variant === "hero" ? {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
  } : {};

  return (
    <button
      style={heroStyles}
      className={cn(
        "inline-flex items-center justify-center size-9 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        variant === "default" 
          ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          : "border"
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
