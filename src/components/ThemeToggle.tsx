"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Prevent hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "relative w-[52px] h-[28px] rounded-full p-[2px] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
                isDark ? "bg-slate-700" : "bg-slate-200"
            )}
            aria-label="Toggle theme"
        >
            <div
                className={cn(
                    "absolute top-[2px] w-6 h-6 rounded-full shadow-sm transition-transform duration-300 flex items-center justify-center",
                    isDark ? "translate-x-[24px] bg-slate-900 text-emerald-400" : "translate-x-0 bg-white text-amber-500"
                )}
            >
                {isDark ? <Moon size={14} /> : <Sun size={14} />}
            </div>
        </button>
    );
}
