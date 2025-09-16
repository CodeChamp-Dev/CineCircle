"use client";
import React from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark =
    typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  function toggle() {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded border border-gray-300 dark:border-gray-700 px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
